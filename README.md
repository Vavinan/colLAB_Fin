# colLAB_Fin
![image](https://github.com/Vavinan/collab-test/assets/110589924/11615a4e-55c4-4a83-9c5b-cf0c71bbb888)


**ColLAB**
*ORBITAL 2023*
README DOCUMENT
<\br>
Jeevanandham Vavinan

Isaac Eng

CONTENT                                                PAGE

INTRODUCTION ……………………………………………………………………………………………………………… 3

PLANNING ………………………………………………………………………………………………………………………… 5

CORE FEATURES …………………………………………………………………………………………………………… 6

SOFTWARE ENGINEERING RELATED INFORMATION …………………………………… 11

TESTING …………………………………………………………………………………………………………………………… 12

<\br>

#**INTRODUCTION**#

***Project Name: colLAB***

***Level of Achievement: Gemini***

*Members: Jeevanandham Vavinan [A0253526E] and Isaac Eng Hong Yeow [A0253005W]*
<\br>

**Resources (links):**

README: https://docs.google.com/document/d/1Ob-i8ObSaV8LG8X8q_dhs5m8n1mydT5oBp-V1o_nLLw/edit?usp=sharing 

Log: https://docs.google.com/spreadsheets/d/1JcaQKGxFl1Jkp5MtqesL5XxYCOTklwvaUtm6KRnZ-WU/edit#gid=0 

Poster: https://drive.google.com/file/d/1ElH3_Ah2UszAgLR6nqC42FOuFNQCA3x0/view?usp=drive_link 

Video: https://vimeo.com/847759082?share=copy 

Website: https://collab-alpha.vercel.app/
<\br>

**Project Scope:**
Our project aims to provide a web platform that connects students with similar interests and project ideas, allowing them to form effective teams to achieve it.

Our project will be an open-source website where users can view project listings, listed by other users that want to work on a project idea and are looking for potential collaborators, on the website and join the projects they are interested in.


We are targetting polytechnic/university students as most of them tend to be equipped with technical skills such as programming, engineering and design skills, which are huge contributing factors towards projects. Students of such groups also tend to be more adventurous and may have plenty of project ideas that they would like to work on.

ColLAB’s main mission is to connect potential project collaborators with those who have project ideas. Our platform will allows them to find one another so that they can start working on the project.

<\br>
**Problem Motivation:**

Many students have great project ideas but lack the necessary team members to see it through. Although they may seek assistance from their friends or classmates, finding a dependable and like minded team member can be difficult, especially if the project requires certain skill sets. Even posting on popular platforms, like Reddit, can be troublesome,  time-consuming and inefficient. 

Thus, their idea would go to waste. Why don't institutions have a platform that allows students, with project ideas, to find like-minded individuals that could collaborate on the project, in order to make the idea come true?

That is why we decided to work on this project, “ColLAB”. With ColLAB, students are able to find potential project partners efficiently and find projects to work on to expand their experiences. 

In turn, there would be more projects initiated as students will find it easy to find project partners and hence initiate projects. There would really be many advantages with the usage of this website.

<\br>
**Project Deliverables:**

To better understand what our website would offer, here are some user stories on how the users can utilise our website.

<\br>
**User Stories:**

1. As a student with a project idea, I want to find team members who share my interests and can contribute their skills to the project.

2. As a student seeking a project team, I want to browse a platform that lists out projects based on my interests and skills.

3. As a student with a project idea/seeking a project team, I want to be able to communicate with my potential project partners.

<\br>
**Tech Stack:**

      # HTML
      
      # CSS
    
      # Javascript
      
      # ReactJS
      
      # Firebase (Database)
      
      # PLANNING
      
<\br>
**PROJECT DEVELOPMENT PLAN**

Our project involves building a website and there are many key elements to fulfill in order to get it up and running. We came up with the following development plan and timeline.

![image](https://github.com/Vavinan/colLAB_Fin/assets/110589924/4415317c-2fa9-49be-b395-97991580fdf1)

Project Development Plan Table
<\br><\br>

Since we are both completely new to web development, we decided to learn and do it the most fundamental way. We used very little frameworks (less ReactJS) to aid our project so we can get comfortable with web development using basic HTML/CSS/Javascript.

<\br>
**TIMELINE**


![image](https://github.com/Vavinan/colLAB_Fin/assets/110589924/67edfdd1-a7a5-478d-86cb-2d0f5ff3acba)

Project Timeline Plan Table
<\br><\br>



**CORE FEATURES**

In order to ensure that our user stories come true, we have developed the following core features.

*Account Login/Register*


When the website is opened, the user will be greeted with a log in screen. If they are new users, they can click on the Register button at the bottom of the page to register a new account.

![image](https://github.com/Vavinan/collab-test/assets/110589924/acfd62aa-62f9-46cf-970a-10bec1f34788)

Log In Form and Register Form
<\br><\br>


[For new users] Users will have to input a username, name, email and password, they also have an option to include a profile picture, by selecting the “Add an Avatar” button. Upon filling the form and clicking “Register”, users will receive a confirmation email of their registered email. To allow the new account to be activated, they have to verify their email address by clicking on the link in the email. Once completed, they can log in.

![image](https://github.com/Vavinan/collab-test/assets/110589924/643f7dac-f07c-4973-ada6-285d521fd23f)

Email of Confirmation Link
<\br><\br>



*Navigation Bar*

A navigation bar is fixed at the top of the website to allow for easy access between the different pages in the website. On the left, there is the colLAB logo and a greeting to your specific username. In the middle, users can select between the different pages of the website. This changes dynamically dependent on the page (e.g. on Homepage, buttons: Chats, Create Post, Profile. On 


Create Post, buttons: Chats, Home). On the right, there is a logout button which logs the current user out when clicked.

![image](https://github.com/Vavinan/collab-test/assets/110589924/959b6492-3cd3-4bc4-b52a-bab27c74871b)

Navigation Bar (on Homepage)
<\br><\br>



*Project Listings*

Users can view project listings in the Homepage. Each project listing is displayed in a card form with its Title (bolded at the top), description, skills required for the project and the username of the creator of the post.

![image](https://github.com/Vavinan/collab-test/assets/110589924/639f41bd-8913-43cf-b1d2-a078c981949b)

Example of Project Listings

<\br><\br>


*Searchbox for Project Listings*

Users can use the searchbox in the homepage to search for projects they might be interested in. For example, keywords such as Web Development, Robot, Arts, Events, etc.

![image](https://github.com/Vavinan/collab-test/assets/110589924/f0506f31-4d0b-4f57-9423-e148b604f226)

Searchbox for Project Listings
<\br><\br>



*Creation of Project Listing*

For users who have a project idea and wishes to find potential collaborators, they can select the CREATE POST button in the navigation bar and they will be led to a page that contains a form. The

fields contain the Title, Description and Skills required. After clicking on publish, the project listing will be posted on the homepage in a card format for other users to view.

![image](https://github.com/Vavinan/collab-test/assets/110589924/2f0f3112-e982-4781-a3c6-545143204e74)

Create a Project Post Form
<\br><\br>



*User Profile*

Users can update their profile by clicking on the PROFILE button in the navigation bar. They will be greeted with 2 containers. First, their account information which is unable to be edited. 

Second, their biography which can be edited, contains: Education Level, Course of Study, School and Skills. This information will be useful for other users as they can contact you for help if you 

have the relevant skills they need for their project.


![image](https://github.com/Vavinan/collab-test/assets/110589924/ce7940e0-44b4-4a1d-be62-95072d677a46)

User Profile Page
<\br><\br>



*Chat*

The chat feature allows users to communicate with each other, where they can ask more about the project idea, exchange contact and even talk about anything under the sun. Chat allows users to 

have a chance to communicate before they decide whether to participate in the project. This means that they do not have to provide their contact information (eg. mobile phone number) before 

collaborating on the project.

The top left displays the current user’s username. Below it is the contacts of users that he/she has contacted before. To switch users, they can simply click on the user they want to chat with.

Towards the right of it, it is the chat container. The username will be reflected at the top and the chat messages will be displayed below. Each chat message have its date and time sent. Users 

can input their message in the input box below and even include an attachment by clicking on the picture icon.


![image](https://github.com/Vavinan/collab-test/assets/110589924/de24ba0d-0bae-44ba-a753-e9d60279d66f)

Chat Page
<\br><\br>



Futhermore, users can view the bio of the user they are talking to, by clicking on the “Open Bio” button at the top right of the page.

![image](https://github.com/Vavinan/collab-test/assets/110589924/22047474-757f-4b27-a030-1ef8dad32523)

Chat User Show Bio

<\br><\br><\br>


**SOFTWARE ENGINEERING RELATED INFORMATION**

*SOFTWARE ENGINEERING PRINCIPLES*

Single Responsibility Principle - This principle is evident throughout our project. We created different pages which serves different purposes, and there is no overlap. For example, in our 

homepage, we only show the project listings and search function. We did not include the Create a New Post or Edit Profile function in that page.

Open-Closed Principle - After deciding on the core features of our project, we started to build the basic function of these features and test it. Once the basic functions of the feature is good, 

we ensured that we do not change the feature completely, instead made some minor updates and improvements to it, which does not completely destroy the function.

YAGNI Principle - We did not add any extra code that we presume might be needed in future. Initially, we considered to include a group chat feature so that members interested in the project could 

join and communicate. However, we realised that this is not needed as the purpose of the project could already be fulfilled even without it. Also, we do not have enough information about the 

future on whether such feature is really a need.

<\br>

*SOFTWARE DESIGN PATTERNS*

Observer Pattern - We allow changes to the user’s bio, so any single user can change his/her bio anytime. When the bio is changed, other users should be able to view the change in the “show bio” button in chat page.
<\br>
**TESTING**

*Regression Testing* - Once a new feature is created, we ensured that we test out the feature and other features, to check if there is any function that is being compromised. This was especially important as it allows us to detect issues with the code early.

*Unit Testing*- We incorporated unit testing for the whole project. We had to ensure that every feature we put out was good to go so we tested it multiple times before officially adding it to the website.

*Integration Testing* - Our chat feature depended heavily on integration testing. There were many aspects such as messages from user and to user, user contacts, messages date and time and many more. We needed all these aspects to work together in order to achieve a proper chat function. So, we had to test how the different aspects of the chat feature interacted with one another and 
catch any errors or bugs.

*Acceptance Testing*- We conducted acceptance testing to check that all our intended functions are fulfilled and working well. The website was shared with some users to test if they meet the 
requirements, at the same time, we were able to obtain some feedback.




