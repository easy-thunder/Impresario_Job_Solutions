
///// BUG FIX NEEDED THE ASSOCIATED SKILLS SECTION SAYS ONE, BUT NONE ARE THERE TO ADD AT START.
const generateCoverLetter = document.createElement("button")
generateCoverLetter.textContent="Generate Cover Letter"
generateCoverLetter.classList.add('generateCoverLetter')

const viewSnippets= document.createElement('button')
viewSnippets.textContent='View Snippets'


const stickyDiv = document.createElement('div');
// stickyDiv.classList.add('sticky-div');
const stickyDivParent = document.createElement('div')
stickyDivParent.id="stickyDivParent"
stickyDivParent.classList.add('sticky-div');
const userProfile = document.createElement('div')
userProfile.classList="userProfile"
userProfile.style.display='none'
let pageUser;
let snippets;
const aboutTheLinkedinJobPosting={};
let pre_pdf_text;
let cover_letter_name;
const currentDate = new Date();
const day = currentDate.getUTCDate();
const month = currentDate.getUTCMonth() + 1; 
const year = currentDate.getUTCFullYear();
const displayCreateNewSkill= document.createElement('button');
displayCreateNewSkill.textContent='Add Snippet'

const minimizeButtonToTurnOn= document.createElement('h1');
minimizeButtonToTurnOn.textContent="-"
minimizeButtonToTurnOn.classList.add('minimize')
document.body.appendChild(minimizeButtonToTurnOn)
minimizeButtonToTurnOn.style.position='fixed'
minimizeButtonToTurnOn.style.display='none'
minimizeButtonToTurnOn.style.right='.75em'


const minimizeButtonToTurnOff= document.createElement('h1');
minimizeButtonToTurnOff.textContent="-"
minimizeButtonToTurnOff.classList.add('minimize')
stickyDivParent.appendChild(minimizeButtonToTurnOff)
minimizeButtonToTurnOff.style.position='absolute'
minimizeButtonToTurnOff.style.right='.2em'
minimizeButtonToTurnOff.style.display='block'

minimizeButtonToTurnOff.addEventListener('click', toggleWholeApplication)
minimizeButtonToTurnOn.addEventListener('click', toggleWholeApplication)

function toggleWholeApplication(){
  if(minimizeButtonToTurnOn.style.display==='none'){
    minimizeButtonToTurnOn.style.display='block'
    minimizeButtonToTurnOff.style.display='none'
    stickyDivParent.style.display='none'
  }
  else{
    minimizeButtonToTurnOn.style.display='none'
    minimizeButtonToTurnOff.style.display='block'
    stickyDivParent.style.display='block'
}
}







displayCreateNewSkill.addEventListener('click', toggleDisplayAddSkill)



function toggleDisplayAddSkill(){
  if(addParagraphForCoverLetterForm.style.display==="none"){addParagraphForCoverLetterForm.style.display="block"}
  else if(addParagraphForCoverLetterForm.style.display==="block"){addParagraphForCoverLetterForm.style.display="none"}
}



const todaysDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
const stickyDivEnlargement = document.createElement('div')
stickyDivEnlargement.classList.add('stickyDivEnlargement')


const editPDFModalBackground= document.createElement('div');
editPDFModalBackground.classList.add("editPDFModalBackground");
const editPDFForm = document.createElement('div');
editPDFForm.classList.add("editPDFForm");
const editPDFText = document.createElement('textArea');
editPDFText.style.height="80%";
const editPDFLabel = document.createElement('label');
editPDFLabel.textContent = 'Edit your cover letter';
const editPDFSubmit = document.createElement('button');
editPDFSubmit.textContent="GeneratePDF"
document.body.appendChild(editPDFModalBackground);
editPDFModalBackground.appendChild(editPDFForm);
editPDFForm.appendChild(editPDFLabel);
editPDFForm.appendChild(editPDFText);
editPDFForm.appendChild(editPDFSubmit);
editPDFModalBackground.style.display='none'

editPDFSubmit.addEventListener('click',function(){
  generatePDF(editPDFText.value)
})


/////////////////////Drag around the stickyDivParent///////////////////
function dragStickyDiv(e){
  const newX= e.clientX - offsetX;
  const newY = e.clientY - offsetY

  stickyDivParent.style.left = newX+'px';
  stickyDivParent.style.top = newY + 'px';
  
}

function startDrag(e){
  offsetX = e.clientX - stickyDivParent.getBoundingClientRect().left;
  offsetY = e.clientY - stickyDivParent.getBoundingClientRect().top;

  document.addEventListener('mousemove', dragStickyDiv); // Changed handleDrag to DragStickyDiv
  document.addEventListener('mouseup', stopDrag);

  stickyDivParent.style.cursor = 'grabbing';
}

function stopDrag(){
  document.removeEventListener('mousemove', dragStickyDiv);
  document.removeEventListener('mouseup', stopDrag)

  stickyDivParent.style.cursor ='default';
}

let offsetX, offsetY;

stickyDivParent.addEventListener('mousedown',startDrag)
////////////////////////////make sticky div bigger or smaller////////////////////

// <div>
// <div onClick={turnOffModal} className={chat? "modalBackground":null}></div>

// <div className={classes.vertical} style={{color: `#243972`}}></div>
// <div className={classes.horizontalBottom}  style={{color: `#243972`}}></div>
// <div className={classes.horizontalTop}  style={{color: `#243972`}}></div>
// <div className={classes.horizontalMiddle}  style={{color: `#243972`}}></div>
// <div className={classes.topCurve}  style={{color: `#243972`}}></div>
// <div className={classes.bottomCurve}  style={{color: `#243972`}}></div>
// </div>


const logo = document.createElement('img');
logo.src = chrome.runtime.getURL('photos/ImpresarioLogoUpdated.png');
logo.classList.add('logo')
stickyDivParent.appendChild(logo);
stickyDivParent.appendChild(document.createElement('br'));



/////////////////userProfileContents//////////////////////////////////
let userName;
const letUserKnow =document.createElement('p');
letUserKnow.textContent="user is here";
userProfile.appendChild(generateCoverLetter);
userProfile.appendChild(document.createElement('br'))
userProfile.appendChild(viewSnippets);
userProfile.appendChild(document.createElement('br'))
userProfile.appendChild(displayCreateNewSkill);


const userSkillCards = document.createElement('div')

const skillsContainer = document.createElement('div')
skillsContainer.classList.add('skillsContainer')

const addParagraphForCoverLetterForm = document.createElement('form')
addParagraphForCoverLetterForm.style.display='none'
const coverLetterParagraphLabel = document.createElement('label')
coverLetterParagraphLabel.textContent="paragraph"
const coverLetterParagraphInput = document.createElement('textarea')
coverLetterParagraphInput.required = true;
addParagraphForCoverLetterForm.classList.add('extensionForm')


const coverLetterHowManySkillsAreAssociatedLabel = document.createElement('label')
coverLetterHowManySkillsAreAssociatedLabel.textContent= 'How many skills are associated with this paragraph?'
const coverLetterHowManySkillsAreAssociatedInput = document.createElement('select')
addEachSkill(coverLetterHowManySkillsAreAssociatedInput.index)

const whereDoesParagraphGoLabel = document.createElement('label')
whereDoesParagraphGoLabel.textContent = 'Is this snippet an intro, middle, or ending?'
const whereDoesParagraphGoInput = document.createElement('Select')
const whereDoesParagraphGoOptionIntro = document.createElement('option')
whereDoesParagraphGoOptionIntro.textContent = 'Intro'
whereDoesParagraphGoOptionIntro.value = 'intro'
const whereDoesParagraphGoOptionMiddle = document.createElement('option')
whereDoesParagraphGoOptionMiddle.textContent = 'Middle'
whereDoesParagraphGoOptionMiddle.value = 'middle'
const whereDoesParagraphGoOptionEnding = document.createElement('option')
whereDoesParagraphGoOptionEnding.textContent = 'End'
whereDoesParagraphGoOptionEnding.value = 'end'

whereDoesParagraphGoInput.add(whereDoesParagraphGoOptionIntro)
whereDoesParagraphGoInput.add(whereDoesParagraphGoOptionMiddle)
whereDoesParagraphGoInput.add(whereDoesParagraphGoOptionEnding)




const submitForAddingSkillParagraph = document.createElement('button')
submitForAddingSkillParagraph.type='submit'
submitForAddingSkillParagraph.textContent = 'Add A new Paragraph'



////////////////////////////////////////////////////////////////////


const loadingBackground = document.createElement('div')
loadingBackground.classList.add('loadingBackground');
document.body.appendChild(loadingBackground)
loadingBackground.style.display='none'

const loadingMessage = document.createElement('span');
loadingMessage.classList.add('loadingMessage');
loadingMessage.textContent="LOADING"
loadingBackground.appendChild(loadingMessage)


for (let i = 1; i <= 3; i++) {
  const loadingDot = document.createElement('span');
  loadingDot.classList.add('loadingDot');
  loadingDot.textContent="."
  loadingMessage.appendChild(loadingDot);
}
/////////////////////////////////////////







  function addSkillsToCoverLetterHowMany(){
    for(i=1; i<=10; i++){
      const option = document.createElement('option')
      option.value = i;
      option.text = i;
      coverLetterHowManySkillsAreAssociatedInput.add(option)
    }

  }

addSkillsToCoverLetterHowMany();


function addEachSkill(numberOfSkills){
  skillsContainer.textContent = '';

  
  for(let i=1; i<=numberOfSkills; i++){
    const newSkillLabel = document.createElement('label')
    newSkillLabel.textContent=`Skill Name ${i}`
    const newSkillInput = document.createElement('input')
    newSkillInput.type = 'text'
    newSkillInput.required = true;
    newSkillInput.classList.add(`skill${i}`)
    newSkillInput.name=`skill${i}`
    skillsContainer.appendChild(newSkillLabel)
    skillsContainer.appendChild(newSkillInput)
    
    skillsContainer.appendChild(document.createElement('br'))
  }

}
coverLetterHowManySkillsAreAssociatedInput.addEventListener('change', function () {
  addEachSkill(this.value); // `this.value` gives you the selected value
});


// Everything for posting to GPT//

function writeCoverLetter (e){
  console.log("writingCoverLetterStart")
  
  e.preventDefault();



  const introductoryParagraph = snippets.find((snippet)=>{
    if(snippet.position==='intro'){return snippet.paragraph};
  })
  const endParagraph = snippets.find((snippet)=>{
    if(snippet.position==='end'){return snippet.paragraph};
  })



  const filteredBodySnippets= snippets.filter((snippet)=>{if(snippet.position==="middle"){
    return snippet;
  }})


  
  function calculateScore(itemSkills, referenceSkills) {
    return itemSkills.filter((skill) => referenceSkills.includes(skill)).length;
  }
  
  const sortedBodySnippets = filteredBodySnippets
    .slice()
    .sort((a,b)=>{
      const scoreA = calculateScore(a.skill_tags, aboutTheLinkedinJobPosting.skills.textContent);
      const scoreB = calculateScore(b.skill_tags, aboutTheLinkedinJobPosting.skills.textContent);
      return scoreB - scoreA;

    });







  let concatenatedText = `[exclude header]My name is ${pageUser.full_name}. I've written: body1 - ${sortedBodySnippets[0].paragraph}, outro - ${endParagraph.paragraph}, intro - ${introductoryParagraph.paragraph}. Job info: ${aboutTheLinkedinJobPosting.aboutTheJob.slice(0, 1000)}. Can you create a second body paragraph that highlights how my experience aligns with the company? After generating that, please rewrite the entire cover letter. myInfo: [phone]: ${pageUser.phone_number}, [email]: ${pageUser.email}, [address]: ${pageUser.address}, [date]: ${new Date()}. companyInfo: [company]: ${aboutTheLinkedinJobPosting.companyName}, [position]: ${aboutTheLinkedinJobPosting.jobTitle}, [location]: ${aboutTheLinkedinJobPosting.jobAddress} Don't include a footer`;
  fetch(`http://localhost:3000/gpt_cover_letter`,{method:"POST",headers:{"Content-Type":"application/json"},
  body: JSON.stringify({gptPrompt:concatenatedText})})
  
  .then(r=>{
    if(r.ok){return(r.json())}
    else{
      
      const errorMessage=document.createElement('h2');
      errorMessage.textContent = `Error Generating PDF`
      errorMessage.classList.add('errorMessage')
      loadingBackground.appendChild(errorMessage)
      hideLoadingBackground()
      throw new Error({message:"GPT REQUEST FAILED"})}
})
.then(data=>{
  const pdf_text_to_generate=data.message
  console.log('writingCoverLetterEnd')
  addEditModal(pdf_text_to_generate)

  
  // generatePDF(pdf_text_to_generate)

  

})

}
function addEditModal(pdf_text){


  editPDFModalBackground.style.display
  editPDFText.value= pdf_text;
  editPDFModalBackground.style.display='block'
  loadingBackground.style.display="none"
  editPDFText.focus();
  




}

function generatePDF(pdf_text_to_generate) {



  const objectPDF = {
    myName: pageUser.full_name,
    myAddress: pageUser.address,
    phoneNumber: pageUser.phone_number,
    email: pageUser.email,
    companyName: aboutTheLinkedinJobPosting.companyName,
    jobTitle: aboutTheLinkedinJobPosting.jobTitle,
    jobAddress: aboutTheLinkedinJobPosting.jobAddress,
    coverLetterText: pdf_text_to_generate
  }
  fetch(`http://localhost:3000/generate_pdf`
  , {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify( objectPDF )
  }
  )
    .then(r => {
      if (r.ok) {
        return r.blob(); // Use .blob() to handle binary data
      } else {
        throw new Error({ message: "Generate PDF request Failed" });
      }
    })
    .then(data => {

      const blob = new Blob([data], { type: 'application/pdf' });
      editPDFModalBackground.style.display='none'
      editPDFText.value='';
      ////////////////////////////
      
      const url = window.URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');


// formatting the name of the pdf
  const formattedCompanyName=aboutTheLinkedinJobPosting.companyName.replace(/\s+/g, '_').toLowerCase();
  const formattedPosition = aboutTheLinkedinJobPosting.jobTitle.replace(/\s+/g, '_').toLowerCase()
  const formattedDate= todaysDate.replace(/\s+/g, '_')
  const pdfName = `${formattedCompanyName}_${formattedPosition}_${formattedDate}_cover_letter.pdf`





  

  downloadLink.href = url;
  downloadLink.download = pdfName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  loadingBackground.style.display="none"
    })
    .catch(error => {
      console.error('Error generating PDF:', error.message);
      const errorMessage=document.createElement('h2');
      errorMessage.textContent = `Error Generating PDF, ${error.message}`
      errorMessage.classList.add('errorMessage')
      loadingBackground.appendChild(errorMessage)
      hideLoadingBackground()
      


    });
}

function hideLoadingBackground() {
  setTimeout(
    loadingBackground.style.display = 'none',3000
  )
}







////////////////////end gpt

addParagraphForCoverLetterForm.appendChild(coverLetterParagraphLabel);
addParagraphForCoverLetterForm.appendChild(coverLetterParagraphInput)
addParagraphForCoverLetterForm.append(document.createElement('br'))

addParagraphForCoverLetterForm.appendChild(coverLetterHowManySkillsAreAssociatedLabel)
addParagraphForCoverLetterForm.appendChild(coverLetterHowManySkillsAreAssociatedInput)
addParagraphForCoverLetterForm.append(document.createElement('br'))

addParagraphForCoverLetterForm.append(skillsContainer)
addParagraphForCoverLetterForm.append(document.createElement('br'))

addParagraphForCoverLetterForm.append(whereDoesParagraphGoLabel)
addParagraphForCoverLetterForm.append(whereDoesParagraphGoInput)
addParagraphForCoverLetterForm.append(document.createElement('br'))

addParagraphForCoverLetterForm.append(submitForAddingSkillParagraph)
addParagraphForCoverLetterForm.append(document.createElement('br'))



const containerForUserCards = document.createElement('div')
containerForUserCards.classList.add('containerForUserCards')
containerForUserCards.style.display='none'





userProfile.appendChild(containerForUserCards)
userProfile.appendChild(addParagraphForCoverLetterForm);


















//////////// add Skill paragraph//////////////////////
addParagraphForCoverLetterForm.addEventListener('submit', function(e){
  e.preventDefault();
  addNewSkillsParagraph();

})
function addNewSkillsParagraph(){

const skill_tags = [];

for (let i = 1; i <= coverLetterHowManySkillsAreAssociatedInput.value; i++) {
  const skillInput = document.querySelector(`.skill${i}`);
  skill_tags.push(skillInput.value)
}

  const newSnippet = {
    paragraph: coverLetterParagraphInput.value,
    position: whereDoesParagraphGoInput.value,
    skill_tags: skill_tags,
    user_id: pageUser.user_id
  }


  

  







  fetch(`http://localhost:3000/snippets`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(newSnippet)
  })
  .then(r=>{if(r.ok){return r.json()}})
  .then(data=>{
    createNewCard(data.message)




  })
}
////////////////////////////////////////////
/////////////////////////////////











///////////////////////////////////////////////////

/////////// This Section is for registration form and its toggle button////////////
const registrationForm = document.createElement('form');
registrationForm.id = 'registrationForm';
registrationForm.classList.add('extensionForm')


const registerEmailLabel = document.createElement('label');
registerEmailLabel.textContent = 'Email:';
const registerEmailInput = document.createElement('input');
registerEmailInput.type = 'email';
registerEmailInput.name = 'email';
registerEmailInput.required = true;


const usernameLabel = document.createElement('label');
usernameLabel.textContent = 'Username:';
const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.name = 'username';
usernameInput.required = true;




const registerPasswordLabel = document.createElement('label');
registerPasswordLabel.textContent = 'Password:';
const registerPasswordInput = document.createElement('input');
registerPasswordInput.type = 'password';
registerPasswordInput.name = 'password';
registerPasswordInput.required = true;


const confirmPasswordLabel = document.createElement('label');
confirmPasswordLabel.textContent = 'Confirm Password:';
const confirmPasswordInput = document.createElement('input');
confirmPasswordInput.type = 'password';
confirmPasswordInput.name = 'confirmPassword';
confirmPasswordInput.required = true;
///////////////////////////////////////////////////
const fullNameLabel = document.createElement('label');
fullNameLabel.textContent = 'First and Last Name';
const fullNameInput = document.createElement('input');
fullNameInput.type = 'text';
fullNameInput.name = 'fullName';
fullNameInput.required = true;
fullNameInput.setCustomValidity('We need this because you include your name in your application ')

fullNameInput.addEventListener('input', function(){
  fullNameInput.setCustomValidity('');
})
/////////////////////////////////////////

const addressLabel = document.createElement('label');
addressLabel.textContent = 'Address';
const addressInput = document.createElement('input');
addressInput.type = 'text';
addressInput.name = 'address';
addressInput.required = true;
addressInput.setCustomValidity('We need this because when you apply to a job you include your address')

addressInput.addEventListener('input', function(){
  addressInput.setCustomValidity('');
})

/////////////////////////////////////////
const phoneNumberLabel = document.createElement('label');
phoneNumberLabel.textContent = 'Phone Number';
const phoneNumberInput = document.createElement('input');
phoneNumberInput.type = 'text';
phoneNumberInput.name = 'phoneNumber';
phoneNumberInput.required = true;
// phoneNumberInput.pattern = '[0-9]*';
// phoneNumberInput.minLength = 10;
// phoneNumberInput.setCustomValidity('Please enter only numbers ie. 1231231234. ensure it is at least 10 characters long');

// phoneNumberInput.addEventListener('input', function () {
  // const inputValue = phoneNumberInput.value;

  // if (inputValue.length < 10) {
  //   phoneNumberInput.setCustomValidity('Please enter at least 10 numbers.');
  // } else if (!/^[0-9]*$/.test(inputValue)) {
  //   phoneNumberInput.setCustomValidity('Please enter only numbers (e.g., 1231231234).');
  // } else {
  //   phoneNumberInput.setCustomValidity('');
  // }
// });

// let prevPhoneValue = phoneNumberInput.value;

// phoneNumberInput.addEventListener('input', function () {
//   const cursorPosition = phoneNumberInput.selectionStart;
//   const inputValue = phoneNumberInput.value.replace(/\D/g, ''); // Remove non-numeric characters

//   if (inputValue.length >= 10) {
//     inputValue = `(${inputValue.slice(0, 3)}) ${inputValue.slice(3, 6)}-${inputValue.slice(6, 10)}`;
//   } else if (inputValue.length >= 6) {
//     inputValue = `(${inputValue.slice(0, 3)}) ${inputValue.slice(3, 6)}`;
//   } else if (inputValue.length >= 3) {
//     inputValue = `(${inputValue.slice(0, 3)})`;
//   }

//   // Calculate the difference in lengths
//   const lengthDifference = inputValue.length - prevPhoneValue.length;

//   // Update the input value with the formatted number
//   phoneNumberInput.value = inputValue;

//   // Adjust the cursor position based on the length difference
//   phoneNumberInput.setSelectionRange(cursorPosition + lengthDifference, cursorPosition + lengthDifference);

//   // Update the previous input value
//   prevPhoneValue = inputValue;
// });



/////////////////////////////////////////







const submitButtonForRegistering = document.createElement('button');
submitButtonForRegistering.type = 'submit';
submitButtonForRegistering.textContent = 'Register';

const submitButtonForSignIn = document.createElement('button');
submitButtonForSignIn.type = 'submit';
submitButtonForSignIn.textContent = 'Sign In'



registrationForm.appendChild(registerEmailLabel);
registrationForm.appendChild(registerEmailInput);
registrationForm.appendChild(document.createElement('br'));

registrationForm.appendChild(usernameLabel);
registrationForm.appendChild(usernameInput);
registrationForm.appendChild(document.createElement('br'));

registrationForm.appendChild(registerPasswordLabel);
registrationForm.appendChild(registerPasswordInput);
registrationForm.appendChild(document.createElement('br'));

registrationForm.appendChild(confirmPasswordLabel);
registrationForm.appendChild(confirmPasswordInput);
registrationForm.appendChild(document.createElement('br'));

registrationForm.appendChild(fullNameLabel);
registrationForm.appendChild(fullNameInput);
registrationForm.appendChild(document.createElement('br'));

registrationForm.appendChild(addressLabel);
registrationForm.appendChild(addressInput);
registrationForm.appendChild(document.createElement('br'));

registrationForm.appendChild(phoneNumberLabel);
registrationForm.appendChild(phoneNumberInput);
registrationForm.appendChild(document.createElement('br'));


registrationForm.appendChild(submitButtonForRegistering);


const toggleSignUpButton = document.createElement('button')
toggleSignUpButton.textContent = 'Sign Up';
toggleSignUpButton.classList.add('toggleSignUpButton')
registrationForm.style.display = 'none';

toggleSignUpButton.addEventListener('click', function () {
  registrationForm.style.display = registrationForm.style.display === 'none' ? 'block' : 'none';
  signInForm.style.display = 'none'
});
////////////////////////////////////////////////////////////////////////




/////////// below is everything for sign in//////////////////////


const signInEmailLabel = document.createElement('label');
signInEmailLabel.textContent = 'Email:';
const signInEmailInput = document.createElement('input');
signInEmailInput.type = 'email';
signInEmailInput.name = 'email';
signInEmailInput.required = true;


const signInPasswordLabel = document.createElement('label');
signInPasswordLabel.textContent = 'Password:';
const signInPasswordInput = document.createElement('input');
signInPasswordInput.type = 'password';
signInPasswordInput.name = 'password';
signInPasswordInput.required = true;




const signInForm = document.createElement("form")
signInForm.id = 'registrationForm';

signInForm.appendChild(signInEmailLabel);
signInForm.appendChild(signInEmailInput);
signInForm.appendChild(document.createElement('br'));

signInForm.appendChild(signInPasswordLabel);
signInForm.appendChild(signInPasswordInput);
signInForm.appendChild(document.createElement('br'));

signInForm.appendChild(submitButtonForSignIn);





const toggleSignInButton = document.createElement('button');
toggleSignInButton.textContent = 'Sign In';
toggleSignInButton.classList.add('toggleSignUpButton');

signInForm.style.display = 'none';

toggleSignInButton.addEventListener('click', function(){
  signInForm.style.display = signInForm.style.display === 'none' ? 'block' : 'none';
  registrationForm.style.display = 'none'
})

//////////////////////////////////////////////////////////////////////////////////////









///////////////////////// The appending to stickyDiv or stickyDivParent//////////////////

stickyDiv.appendChild(document.createElement('br'));
stickyDivParent.appendChild(toggleSignUpButton);
stickyDivParent.appendChild(toggleSignInButton);
stickyDivParent.appendChild(stickyDiv);
stickyDivParent.appendChild(registrationForm);
stickyDivParent.appendChild(signInForm);
document.body.appendChild(stickyDivParent);
stickyDivParent.appendChild(userProfile);
///////////////////////////////////////////////////////////////////////////////////
///////////////Sign Up Functions///////////////////

registrationForm.addEventListener('submit', function (e) {
  e.preventDefault();
  postTheNewUser();

});


function postTheNewUser(){
  const emailValue = registerEmailInput.value;
  const usernameValue = usernameInput.value;
  const passwordValue = registerPasswordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;
  const fullNameValue = fullNameInput.value;
  const addressValue = addressInput.value;
  const phoneNumberValue = phoneNumberInput.value;

  if(passwordValue!==confirmPasswordValue){
    alert("Your check password doesn't match")
    return 0;
  }

  const newUser = {
    email: emailValue,
    username: usernameValue,
    password: passwordValue,
    address: addressValue,
    full_name: fullNameValue,
    phone_number: phoneNumberValue
  }

  fetch('http://localhost:3000/create-user',{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body: JSON.stringify(newUser)
  })
  
  .then(r=>{if(r.ok){return r.json()}else{throw new Error({message:"bad request"})}})
  .then(signIn())
}
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////// sign In functions/////////////////////
signInForm.addEventListener('submit', function(e){
  e.preventDefault();
  signIn()

})




function deleteCard (card,snippetID){
  const isConfirmed = window.confirm('are you sure you want to delete?');

  if(isConfirmed){
    fetch(`http://localhost:3000/deleteCard/${snippetID}`,{method:"DELETE"})
    .then(r=>{if(r.ok){return r.json()}})
    .then(data=>{
      card.remove()
      
    })
  }
  else{return}


}



function createNewCard(snippet){

          
  const editButton = document.createElement('button')
  editButton.classList.add('buttonRight')
  editButton.textContent='edit'
  
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('buttonRight')
  deleteButton.textContent='delete'
  
  const headerForUserCard = document.createElement('header')
  headerForUserCard.classList.add('headerForUserCard')
  
  
  const userCard = document.createElement('div')
  userCard.classList.add('card')
  userCard.accessKey=snippet.snippet_id
  
  
  
  
  
  
  
  const newSnippetPosition = document.createElement('span')
  newSnippetPosition.classList.add('newSnippetPosition')
  newSnippetPosition.textContent = `${snippet.position}`
  
  headerForUserCard.appendChild(newSnippetPosition)
  headerForUserCard.appendChild(deleteButton)
  headerForUserCard.appendChild(editButton)
  

  
  
  
  
  
  const newSnippetParagraph = document.createElement('p')
  newSnippetParagraph.classList.add('newSnippetParagraph')
  newSnippetParagraph.textContent = `${snippet.paragraph}`

    
  if(snippet.position==='end'){
    userCard.classList.add('end')
  }
  if(snippet.position==="intro"){
    userCard.classList.add('intro')
  }


  
  const containerForSkillsInCards = document.createElement('div')
  containerForSkillsInCards.classList.add('containerForSkillsInCards')
  containerForSkillsInCards.textContent = 'skills:'
  
  
  const skillsCount = snippet.skill_tags.length;
  
  
  snippet.skill_tags.map((skill, index)=>{
  const newSnippetSkill= document.createElement('span')
  newSnippetSkill.textContent= skill
  containerForSkillsInCards.appendChild(newSnippetSkill)
  
  if(index < skillsCount-1){
    const comma = document.createElement('span')
    comma.textContent = ', '
    containerForSkillsInCards.appendChild(comma)
    
  }
})




userCard.appendChild(headerForUserCard)
userCard.appendChild(document.createElement('br'))
userCard.appendChild(newSnippetParagraph)
userCard.appendChild(containerForSkillsInCards)
userCard.appendChild(document.createElement('br'))

containerForUserCards.appendChild(userCard)




deleteButton.addEventListener('click', function (){
  
  const header = this.parentElement
  const card = header.parentElement
  
  deleteCard(card, snippet.snippet_id)})
}
//////////////////////// TODO ///////////////////////////
// editButton.addEventListener('click', function(){
//   const header = this.parentElement
//   const card = header.parentElement

//   editCard(card, snippet.snippet_id)
// })
/////////////////TODO/////////////////////////////

function signIn(){
  const emailValue = signInEmailInput.value;
  const passwordValue = signInPasswordInput.value;

  const user = {
    email: emailValue,
    password: passwordValue
  }

  fetch('http://localhost:3000/login',{
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(user)
  })
  .then(r=>{if(r.ok){return r.json();}else{throw new Error({message: "bad request"})}})
  .then(data=>{
    pageUser=data.user
    registrationForm.style.display = 'none';
    signInForm.style.display = 'none';
    toggleSignInButton.style.display = 'none';
    toggleSignUpButton.style.display='none';
    userProfile.style.display='block';

    userName=data.user.username;
    const userWelcome = document.createElement('h2')
    userWelcome.textContent = `welcome ${userName}`
    userProfile.append(userWelcome)
    /////////////////////////////////

    
    if(data.snippets){
      snippets = data.snippets
      snippets.forEach((snippet)=>{
        createNewCard(snippet)

        })
      }
    
    // const newSnippets = data.snippets
    // newSnippets.forEach((snippet)=>{
    //   const newSnippet = document.createElement('li')
    //   newSnippet.textContent = `${snippet}`
    // })
    




  })


}

////////////////////////////////////////////////////////////////////////////////////////////
////////// for getting the session//////TODO//////////////////////////////////
// function getSessionId() {
//   const cookies = document.cookie;
//   const matches = cookies.match(/sessionId=([^;]+)/);

//   if (matches) {
//     return matches[1];
//   } else {
//     // Handle the case when the session ID is not found
//     return 'your_default_session_id';
//   }
// }

// // Make the fetch request with the session information
// fetch('http://your-api-url/protected-route', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     // Include the session ID in the request headers
//     'Authorization': `Bearer ${getSessionId()}`
//   },
// })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Unauthorized');
//     }
//   })
//   .then(data => {
//     // Handle the data for a successful response
//   })
//   .catch(error => {
//     // Handle errors, especially unauthorized access
//     console.error('Fetch error:', error.message);
//   });


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// This is to load data from linkedin/////////////////////////////////////

generateCoverLetter.addEventListener("click",fireUpTheSkills)
viewSnippets.addEventListener("click",toggleSnippets)

function toggleSnippets(){


  if(containerForUserCards.style.display==='none'){containerForUserCards.style.display='block'}
  else{containerForUserCards.style.display='none'}

}




function fireUpTheSkills(){
loadingBackground.style.display="block"


  for (const key in aboutTheLinkedinJobPosting) {
    if (aboutTheLinkedinJobPosting.hasOwnProperty(key)) {
      delete aboutTheLinkedinJobPosting[key];
    }
  }
  let child = stickyDiv.firstChild;
  while (child) {
    if (child.textContent === "load skills") {
      child = child.nextSibling; 
      continue;
    }
    stickyDiv.removeChild(child);
    child = stickyDiv.firstChild;
  }



      const jobDiv = document.body.querySelector('.jobs-search__job-details--wrapper div+div');
      let counter = 0;
      const skillsList = document.createElement('ul');
      
      if (jobDiv) {
        console.log(jobDiv)
        const jobTitle = jobDiv.getAttribute('aria-label');
        const jobTitleParagraph= document.createElement('p')
        jobTitleParagraph.textContent = jobTitle;
        
        
        
        
        const companyName = jobDiv.querySelector('.app-aware-link').innerText.trim();
        const companyNameParagraph = document.createElement('p')
        companyNameParagraph.textContent= companyName
        
        
        
        // inline-show-more-text--is-collapsed
        // inline-show-more-text--is-collapsed-with-line-clamp
        
        
        const jobAddressDiv = jobDiv.querySelector('.job-details-jobs-unified-top-card__bullet');
        const jobAddress = jobAddressDiv ? jobAddressDiv.textContent.trim() : '';
        const jobAddressParagraph= document.createElement('p')
        jobAddressParagraph.textContent = jobAddress
        
        const aboutTheJob = jobDiv.querySelector('#job-details')


        const aboutTheCompanyDiv = jobDiv.querySelector('div.inline-show-more-text--is-collapsed');

        const aboutTheCompanyOriginalText = aboutTheCompanyDiv ? aboutTheCompanyDiv.textContent : null;


        const aboutTheCompanyText = document.createElement('p')

        aboutTheCompanyText.textContent = aboutTheCompanyOriginalText;




        
        
        
        
        const skillsButton = jobDiv.querySelector('button.mv5.t-16.pt1.artdeco-button.artdeco-button--muted')
        skillsButton.click()
        
        
        
        
        
        setTimeout(function(){
          
          const skillsModal=document.body.querySelector('div.artdeco-modal--layer-default ')
          const liSkills = Array.from(skillsModal.querySelectorAll('li'))
          
          
          
          liSkills.forEach((skill) => {
            const skillText = skill.innerText.trim();
            
            
            const cleanedSkillText = skillText.replace(/\bAdd\b/g, '').trim(); // replace Add with nothing
            
            if (skillText.includes('Add')) {
              counter += -1
              
            }
            else{
              counter += 1
              const skillItem = document.createElement('li');
              skillItem.textContent = cleanedSkillText;
              skillsList.appendChild(skillItem);
              
            }
          });
          
          
        
          
          
          // stickyDiv.appendChild(jobTitleParagraph)
          // stickyDiv.appendChild(companyNameParagraph)
          // stickyDiv.appendChild(jobAddressParagraph)
          // stickyDiv.appendChild(skillsList);
          // stickyDiv.appendChild(aboutTheJob)
          // stickyDiv.appendChild(aboutTheCompanyText)

          aboutTheLinkedinJobPosting.jobTitle = ''
          aboutTheLinkedinJobPosting.companyName = ''
          aboutTheLinkedinJobPosting.jobAddress = ''
          aboutTheLinkedinJobPosting.skills = ''
          aboutTheLinkedinJobPosting.aboutTheJob =''
          aboutTheLinkedinJobPosting.aboutTheCompany = ''


          aboutTheLinkedinJobPosting.jobTitle = jobTitleParagraph.textContent
          aboutTheLinkedinJobPosting.companyName = companyNameParagraph.textContent
          aboutTheLinkedinJobPosting.jobAddress = jobAddressParagraph.textContent
          aboutTheLinkedinJobPosting.skills = skillsList
          aboutTheLinkedinJobPosting.aboutTheJob = aboutTheJob.textContent
          aboutTheLinkedinJobPosting.aboutTheCompany = aboutTheCompanyText.textContent
          
          writeCoverLetter(new Event('click'));
          
          
          {/* <button> load Information </button> */}
          
        },1500)
    }
    console.log('last')
}
/////////////////////////////////////////////////////////////////////////////////////////



generateCoverLetter

///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//all apps scraping///////////////////////////////////////////////


const allLabels=[]
const allQuestions=[]
chrome.storage.local.get(['questionsAndAnswers'], function(result) {
  const storedData = result.questionsAndAnswers || {};

  // if(questionAndAnswerInputs){
    //   console.log(questionAndAnswerInputs)
    //   questionAndAnswerInputs.forEach(object=>{
      //     object.input.addEventListener('change',function(){
        //       debugger;
        //       console.log('firing event',object.input.value)
        //       addAnswer(object)
        //     })
        //   })
        // }
        
        
        document.body.addEventListener('change', function(e){
          const target = e.target;
          let label;
          let newTarget;
          if(target.tagName.toLowerCase()==='input'){
    while (!label) {
      if (!newTarget) {
        if (target.previousElementSibling && target.previousElementSibling.tagName && target.previousElementSibling.tagName.toLowerCase() === "input") {
          // console.log(label)
          label = target.previousElementSibling;
        } else {
          newTarget = target.parentElement;
          // console.log(newTarget)
        }
      } else if (newTarget) {
        const inputChild = Array.from(newTarget.children).find(child => child.tagName.toLowerCase() === "label");
        
        if (inputChild) {
          label = inputChild
          // console.log(label, 'label')
        }else {
          newTarget = newTarget.parentElement;
          // console.log(newTarget)
        }
      }
    
      if (!newTarget || newTarget.tagName.toLowerCase() === "body") {
        // console.log('no label found')
        break;
      }
    }
    
    
    
  
    // const label = target.parentElement.querySelector('label')
    const question = preprocessString(label.textContent)
    if(question.includes('password')){
      return
    }
    else{

      const newQuestionAndAnswer={
        question: question,
        answer: target.value
      }
      
      
      // const storedData = JSON.parse(localStorage.getItem('questionsAndAnswers')) || {};
      const existingAnswer = storedData[newQuestionAndAnswer.question];
      if (existingAnswer) {
        // The question has already been answered, handle accordingly
        console.log('This question has already been answered but we will update it!:', storedData[newQuestionAndAnswer.question]=newQuestionAndAnswer);
        
      } else{
        storedData[question] = newQuestionAndAnswer
        
      }
      chrome.storage.local.set({questionsAndAnswers: storedData}, function() {
        console.log('Data saved to local storage');
      });
      
      console.log(storedData)
      console.log('New question and answer stored successfully:', storedData[newQuestionAndAnswer.question]);
      
    }
    
    
    
    
  }
})





function scrapeAllWebApps(){
  
  // const storedData = JSON.parse(localStorage.getItem('questionsAndAnswers')) || {};
  const allForms = Array.from(document.querySelectorAll('form:not(.extensionForm)'));
  
  const questionAndAnswerInputs = [];
  if (allForms) {
    allForms.forEach(form => {
      const thisFormContents = Array.from(form.querySelectorAll('*'));
      
      // Initialize the array for each form
      
      thisFormContents.forEach(label => {
        let input;
        
        if (label.tagName.toLowerCase() === 'label') {
          console.log(label.nextElementSibling); 


          const inputInLabel = label.querySelector('input') || null;
          const inputIsSibling = label.nextElementSibling || null;
          const inputInSibling = label.nextElementSibling && label.nextElementSibling.querySelector('input') || null;
          const inputInParent = label.parentElement.querySelector('input');
          console.log("start")
          console.log(inputInLabel)
          console.log(inputIsSibling)
          console.log(inputInSibling)
          console.log(inputInParent)
        console.log('end')
          if(inputInLabel){
            console.log('inputInLabelHit', inputInLabel)
            
            input = inputInLabel}

          else if(inputIsSibling && inputIsSibling.tagName && inputIsSibling.tagName.toLocaleLowerCase()==='input'){input=inputIsSibling
            console.log('InputIsSiblingHit',inputIsSibling)

          }
          
          else if(inputInSibling){input = inputInSibling
            console.log('InputInSiblingHit', inputInSibling)

          }

          else if (inputInParent){input=inputInParent
            console.log('inputInParentHit', inputInParent)
          }
          else{input = recursiveParentFinder(label.parentElement)}
          function recursiveParentFinder(target){
            console.log("recursiveParentFinder Function hit")
            if(target.querySelector('input')){return target}
            else{
              if(target.parentElement){return recursiveParentFinder(target.parentElement)}
              else{return null}
            }
          }
          console.log(input, 'input before being pushed in')
          console.log(questionAndAnswerInputs, 'questionAndAnswerInputs before adding new one')
          questionAndAnswerInputs.push(
            {
              question: preprocessString(label.textContent),
              input: input
            });
          }
        });
        
        // Log or process the data for each form
      });
  } else {
    null
  }
  
  if(questionAndAnswerInputs){
    questionAndAnswerInputs.forEach(object=>{
      console.log(storedData,'stored Data')
      const existingAnswer = storedData[object.question];
      // debugger;
       console.log('existingAnswer', existingAnswer)
      
      if(existingAnswer){
        console.log("object:", object)
        console.log("objectInput:", object.input)

        object.input.value=existingAnswer.answer
      }
      else{null}
      
    })
  }
  
  
  
  
  
  
  
  
}

function preprocessString(str) {
  return str.replace(/[^\w\s]/gi, '').replace(/\s+/g, '').toLowerCase();
}

window.addEventListener('load',scrapeAllWebApps)
})


////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//buy Credits button
//////////////////////////////////////
/////////////////////////////////////

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "success") {
    // Handle success action
    console.log("Success action received");
    // Add logic to update user credits here
  } else if (request.action === "cancel") {
    // Handle cancel action
    console.log("Cancel action received");
  }
});

const addCredits=document.createElement('button');
addCredits.textContent='Subscribe'
userProfile.prepend(document.createElement('br'));
userProfile.prepend(addCredits);
addCredits.addEventListener('click', generateStripeModal)


async function generateStripeModal() {
  const response = await fetch('http://localhost:3000/stripeCheckout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      line_items: [{ price: "price_1OXVkNAdCijzaWdMOq2G1mDF", quantity: 1 }],
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  // Assuming the server returns a JSON object with a 'url' property
  const result = await response.json();

  // if(response.ok){
  //   fetch('http://localhost:3000/addCredits')
  // }

  // Redirect the user to the Stripe checkout session URL
  window.location.href = result.url;
}


const test = document.createElement('button')
test.textContent="test"
stickyDiv.appendChild(test);
test.addEventListener('click', function(){
  fetch('https://cover-letter-writer-411119.ue.r.appspot.com/test')
  .then(r=>{if(r.ok){return r.json()}else{debugger;console.log('response not okay')}})
  .then(data=>{debugger;console.log(data)})
})