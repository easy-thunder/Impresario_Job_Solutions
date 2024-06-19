## Title
Impresario Job Solutions

## Description

The LinkedIn Cover Letter Generator Chrome Extension streamlines the job application process by empowering users to create personalized cover letters effortlessly. Users log in to the extension, where they seamlessly apply to jobs on LinkedIn. The extension facilitates a smooth application experience by allowing users to input their introduction, outro, and a brief paragraph detailing their professional experience.

To enhance the cover letter's depth and relevance, the extension integrates with the ChatGPT API. Upon user request, it dynamically generates a second body paragraph, providing compelling reasons for why the user is an ideal fit for the job. Users have the opportunity to review and edit the generated content to ensure a personalized touch.

As a final step, the extension converts the meticulously crafted cover letter into a polished PDF format. This PDF is ready to be attached and sent along with job applications, streamlining the entire process and increasing the user's chances of making a strong impression on potential employers. Elevate your job application game with the LinkedIn Cover Letter Generator Chrome Extension.

## Installation


To install the Chrome extension and set up the application, follow these steps:

Chrome Extension:
Download the extension files and ensure they include the following files: manifest.json, background.js, content.js, styles.css, and the web_accessible_resources folder with its contents.

Open Chrome and go to chrome://extensions/.

Enable "Developer mode" in the top right corner.

Click on "Load unpacked" and select the folder "local_job_helper(the folder not the files).

The extension should now appear in your list of installed extensions.

Frontend (package.json):
Navigate to the frontend directory.

Run npm install to install the required dependencies.

Backend (package.json):
Navigate to the backend directory.

Run npm install to install the required dependencies.
Troubleshooting: The dependencies are:
├── bcrypt@5.1.1
├── cors@2.8.5
├── dotenv@16.4.5
├── express-session@1.18.0
├── express@4.19.2
├── jspdf@2.5.1
├── openai@4.52.0
├── pg@8.12.0
├── stripe@14.25.0
└── uuid@9.0.1

Note that you don't need stripe to run this, that was for production.


Environment Variables:
Create a .env file in the backend directory.

Fill in the following variables with your own values:

DB_PASSWORD: Password for the PostgreSQL database.
SESSION_SECRET: Secret for sessions and cookies.
OPENAI_API_KEY: API key for OpenAI.
Usage:
Start your backend server by running node server.js in the backend directory.

Start your frontend application by running npm start in the frontend directory.



Access your Chrome extension by clicking on its icon.

Follow the extension's interface to log in, apply to jobs on LinkedIn, generate cover letters, and convert them to PDF.

Ensure that your backend server and frontend application are running concurrently for the full functionality of the extension. Adjust the configurations based on your specific needs and preferences.


You will have to build your own psql database here is the schema for psql database:
users:

 user_id            | integer                |           | not null | nextval('users_user_id_seq'::regclass) | plain    |             |              | 
 user_key           | uuid                   |           | not null | gen_random_uuid()                      | plain    |             |              | 
 email              | character varying(255) |           | not null |                                        | extended |             |              | 
 password           | character varying(255) |           | not null |                                        | extended |             |              | 
 username           | character varying(255) |           | not null |                                        | extended |             |              | 
 address            | character varying(255) |           | not null |                                        | extended |             |              | 
 full_name          | character varying(255) |           | not null |                                        | extended |             |              | 
 phone_number       | character varying(20)  |           |          |                                        | extended |             |              | 
 subscription_level | character varying(50)  |           |          |                                        | extended |             |              | 
 remaining_credits  | integer                |           |          |                                        | plain    |             |              | 
 is_admin           | boolean                |           |          | false                                  | plain    |             |              | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (user_id)
    "users_user_key_key" UNIQUE CONSTRAINT, btree (user_key)
Referenced by:
    TABLE "snippets" CONSTRAINT "snippets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    TABLE "user_snippets" CONSTRAINT "user_snippets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE


snippets:
snippet_id | integer                  |           | not null | nextval('snippets_snippet_id_seq'::regclass) | plain    |             |              | 
 paragraph  | text                     |           | not null |                                              | extended |             |              | 
 position   | character varying(255)   |           | not null |                                              | extended |             |              | 
 skill_tags | character varying(255)[] |           |          |                                              | extended |             |              | 
 user_id    | integer                  |           |          |                                              | plain    |             |              | 
Indexes:
    "snippets_pkey" PRIMARY KEY, btree (snippet_id)
Foreign-key constraints:
    "snippets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
Referenced by:
    TABLE "user_snippets" CONSTRAINT "user_snippets_snippet_id_fkey" FOREIGN KEY (snippet_id) REFERENCES snippets(snippet_id) ON DELETE CASCADE
Access method: heap


user_snippets: 
user_id    | integer |           | not null |         | plain   |             |              | 
 snippet_id | integer |           | not null |         | plain   |             |              | 
Indexes:
    "user_snippets_pkey" PRIMARY KEY, btree (user_id, snippet_id)
Foreign-key constraints:
    "user_snippets_snippet_id_fkey" FOREIGN KEY (snippet_id) REFERENCES snippets(snippet_id) ON DELETE CASCADE
    "user_snippets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
Access method: heap



## Usage

Account Setup:

Sign up to create a personalized account and seamlessly sign in.
Create Snippets:

Once signed in, easily add snippets to your profile. Clearly distinguish whether a snippet is a body paragraph, an introduction, or an outro. For added flexibility, use placeholders like [company name] to dynamically acknowledge the company in your cover letters.
Craft Cover Letters:

Design cover letters effortlessly by utilizing the snippets you've created. Provide information about your experience in the body paragraph, keeping it general and avoiding AI-generated responses to stay below AI detection systems' radar.
Job Search on LinkedIn:

Head to LinkedIn and search for jobs that align with your career goals.
Generate Cover Letter:

When you find a job of interest, navigate to the "About the Job" section. Click on the "Generate Cover Letter" button, and the extension will utilize the information from your snippets, skills matching the job posting on LinkedIn, and details about the job. It will then interact with the GPT API to generate a paragraph highlighting why you are an excellent fit for the company.
Edit Cover Letter:

Review and edit the dynamically generated cover letter to ensure it aligns perfectly with your preferences and the specific job requirements.
Convert to PDF:

Once satisfied with the cover letter, proceed to convert it into a polished PDF format, ready for submission with your job application.

Note: Working on webscraping and saving form data from job applications so you can save time on repetive questions that are asked by every job application.
## Features

User-Friendly Snippet Management:

Easily add, edit, and manage snippets for introductions, body paragraphs, and outros to streamline the cover letter creation process.
Dynamic Placeholder Integration:

Employ dynamic placeholders like [company name] within your snippets to seamlessly tailor cover letters for different companies without manual adjustments.
LinkedIn Integration:

Leverage LinkedIn skills matching to automatically incorporate relevant skills from your profile into generated cover letters, enhancing their specificity.
Job-specific GPT Interaction:

Interact with the GPT API to dynamically generate a personalized paragraph about why you are a great fit for the company, utilizing information from your snippets and LinkedIn skills in conjunction with job details.
Real-time Cover Letter Preview:

Preview dynamically generated cover letters in real-time, allowing users to assess and edit content before finalizing.
PDF Conversion:

Effortlessly convert your meticulously crafted cover letter into a professional PDF format, ready for submission with job applications.
User-friendly Interface:

Navigate through the extension with an intuitive and user-friendly interface, ensuring a seamless and efficient user experience.
Account Management:

Create and manage user accounts to personalize the cover letter generation process for each individual user.
Secure Authentication:

Implement secure user authentication mechanisms to protect user data and ensure a safe and trustworthy environment.
Customization and Editing:

Provide users with the flexibility to edit and customize generated cover letters, allowing them to tailor the content according to their preferences and specific job requirements.
## Contributing

Jacob Diehl
## Credits

├── bcrypt@5.1.1
├── cors@2.8.5
├── dotenv@16.3.1
├── express-session@1.17.3
├── express@4.18.2
├── jspdf@2.5.1
├── openai@4.21.0
├── pg@8.11.3
├── stripe@14.11.0
└── uuid@9.0.1

## Contact

name: Jacob Diehl
email: jakediehl17@gmail.com
