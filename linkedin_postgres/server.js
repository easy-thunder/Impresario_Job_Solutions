const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {hash, compare} = require('bcrypt');
const { Pool } = require('pg');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json())
let pool;





if(process.env.NODE_ENV==='production'){

  pool = new Pool({
    user: 'postgres',
    host: '/cloudsql/cover-letter-writer-411119:us-east1 (South Carolina):linkedin-snippets',
    database: 'linkedin-snippets',
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
}
else{
 pool = new Pool({
    user: 'easythunder',
    host: 'localhost',
    database: 'linkedin_snippets',
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
}

const OpenAI = require('openai');
const openai = new OpenAI({OPENAI_API_KEY: process.env.OPENAI_API_KEY});

const{jsPDF} = require('jspdf')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


app.get('/test', async(req,res)=>{
  console.log('testing')
  try{

    res.status(200).json({message:"hi"})
  }
  catch(error){
    console.error('Error in /test:', error);
    res.status(500).json({message: error.message})}
})


  ///////// chatGPT API CONNECTION
app.post('/gpt_cover_letter', async(req,res)=>{
  const gptPrompt = req.body.gptPrompt;
  console.log(gptPrompt)

  try{
    const result = await gptCoverLetterGenerator(gptPrompt)
    res.status(200).json({message: result.message.content})
  }
  catch{
    
    res.status(500).json({message: "internal server error"})
  }
///////////////////////////////////////////////////////////////
  async function gptCoverLetterGenerator(prompt){
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You're a cover letter writer assisting individuals in crafting effective cover letters for their first job. They provide an introductory paragraph, a closing paragraph, a body paragraph, and company information. Your task is to create a personalized second body paragraph that highlights how their experience aligns with the company. Your output should be a rewritten and formatted cover letter." },
      {role: 'user', content: prompt},
    ],
    max_tokens: 700,
    });
    console.log('end')
    console.log(completion)
    console.log(completion.choices[0])
    return completion.choices[0];

  }
  
})
////////////////////////////start
app.post('/generate_pdf', (req, res) => {
  const {myName, myAddress, phoneNumber, email, companyName, jobTitle, jobAddress, coverLetterText}=req.body
  // const cover_letter_text = req.body.coverLetterText

  const doc = new jsPDF('P','in','a4');//ppi 72 pixels per inch
  
  
  

  // doc.setDrawColor('black');
  // doc.setLineWidth(1/72);
  // doc.line(.5 ,.5, 0.5, 11.25);
  // doc.line(7.75, .5, 7.75,11.25)
  
  //break the long text 
  const textLines = doc.setFont('Arial').setFontSize(12).splitTextToSize(coverLetterText, 7.25);
  doc.text(.5,.5+12/72, myName)
  doc.text(.5,.5+24/72, myAddress)
  doc.text(.5,.5+36/72, phoneNumber)
  doc.text(.5,.5+48/72, email)
  doc.text(.5,.5+72/72, companyName)
  doc.text(.5,.5+84/72, jobTitle)
  doc.text(.5,.5+96/72, jobAddress)
  

  let verticalOffset = .5+120/72;
  doc.text(.5,verticalOffset+12/72, textLines)
  verticalOffset+=(textLines.length + 0.5)* 12/72;




  const pdfBuffer = doc.output();

  // Set headers to indicate binary data
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=a4.pdf');

  // Send the binary data
  res.status(200).send(pdfBuffer);

});
///////////////////////////////////



  app.get('/users', async (req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users"); 
      res.json({ message: result.rows});
    } finally {
      client.release();
    }
  });

  app.post('/create-user', async (req, res) => {
    console.log("we are creating a user")

    const { email, username, password, address, full_name, phone_number } = req.body;
      console.log(req.body)
    if(password.length<8){
      console.error('password must be longer than 8 characters');
      res.status(401).json({error: "Password must be longer than 8 characters"})
      return;
    }
    const hashedPassword = await hash(password, 12)

    try {
      const result = await pool.query(
        'INSERT INTO users (email, username, password, address, full_name, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [email, username, hashedPassword, address, full_name, phone_number]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
  
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (result.rows.length === 1) {
        const user = result.rows[0];
        console.log(user)
  
        // Check the password using bcrypt
        const passwordMatch = await compare(password, user.password);

        const snippetsResult = await pool.query(
          'SELECT snippets.snippet_id, snippets.paragraph, snippets.position, snippets.skill_tags ' +
          'FROM users ' +
          'JOIN user_snippets ON users.user_id = user_snippets.user_id ' +
          'JOIN snippets ON user_snippets.snippet_id = snippets.snippet_id ' +
          'WHERE users.user_id = $1',
          [user.user_id]
      );
      const snippets = snippetsResult.rows;

  
        if (passwordMatch) {
          // Set the user ID in the session
          // req.session.userId = user.user_id;
          // console.log(req.session.userId)
  
          res.json({ message: 'Login successful', user, snippets });
          return;
        }
      }
  
      res.status(401).json({ error: 'Invalid username or password' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/deleteCard/:snippetID', async(req, res)=>{
    const snippet_id = req.params.snippetID
    try {
      // Assuming you are using some kind of database
      const result = await pool.query('DELETE FROM snippets WHERE snippet_id = $1 RETURNING *', [snippet_id]);
  
      // Check if a row was affected
      if (result.rowCount > 0) {
        const deletedCard = result.rows[0];
        res.status(202).json({ message: 'Delete successful', deletedCard });
      } else {
        // If no rows were affected, the card with the given ID doesn't exist
        res.status(404).json({ error: 'Card not found' });
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

///////////////////TODO///////////////////////
  // app.get('/protected-route', (req, res) => {
  //   console.log('getting session')
  //   if (!req.session.userId) {
    
  //     res.status(401).json({ error: 'Unauthorized' });
  //     return;
  //   }
  //   console.log(req.session.userId)
  //   // The user is authenticated, continue processing the request
  //   res.json({ message: 'This is a protected route' });
  // });





  // app.post('/logout', (req, res) => {
  //   // Clear the session
  //   req.session.destroy((err) => {
  //     if (err) {
  //       console.error('Error during logout:', err);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //       return;
  //     }
  
  //     res.json({ message: 'Logout successful' });
  //   });
  // });

/////////////////////// end of todo////////////////////

app.post('/snippets', async (req, res) => {
  const { paragraph, position, skill_tags, user_id } = req.body;

  try {
      const snippetResult = await pool.query(
          'INSERT INTO snippets (paragraph, position, skill_tags) VALUES ($1, $2, $3) RETURNING *',
          [paragraph, position, skill_tags]
      );

      const snippet = snippetResult.rows[0]
      const snippetId = snippet.snippet_id

      await pool.query(
          'INSERT INTO user_snippets (user_id, snippet_id) VALUES ($1, $2)',
          [user_id, snippetId]
      );

      res.json({ message: snippet });
  } catch (error) {
      console.error('Error creating snippet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/stripeCheckout', async (req, res) => {
  const { line_items } = req.body;
  console.log(line_items);

  try {
    console.log('hit try starting');
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'subscription',
      success_url: chrome.runtime.getURL("success.html"),
      cancel_url: chrome.runtime.getURL("cancel.html"),
      automatic_tax: { enabled: true },
    });
    console.log(session)
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});


app.get('/order/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
});

app.get('/readiness', (req, res) => {
  // Perform any checks to determine readiness
  // Respond with a 200 OK if the application is ready
  res.status(200).send('OK');
});


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("I am pooping")
  });




