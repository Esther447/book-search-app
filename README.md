Before I dive into the demo of my application, I want to highlight an unexpected issue I encountered while preparing for this presentation.
📌 Problem Statement
My application's domain name, getcryptoappcoder.tech, was supposed to be valid for one year for free. However, without a full year passing, the domain unexpectedly expired. Now, when I try to access it, instead of my application, I see a domain expiration notice.
📌 Evidence
(Show the screenshot of the expired domain page)
"As you can see, the domain is no longer accessible, and instead, I am seeing a message stating that the domain has expired
![Screenshot of the Book Search App](./images/Screenshot%202025-03-29%20094715.png)


Explanations of the deployment process, load balancer setup, and the domain name issue.

markdown
Copy
Edit
# Book Search App

## Introduction  
The **Book Search App** is a web application that allows users to search for books, view details, and explore various book-related information. It utilizes an external API to fetch book data and presents it in an intuitive and user-friendly interface.  

## Features  
- **Search Functionality** – Users can search for books by title, author, or keyword.  
- **Book Details Page** – Clicking on a book displays detailed information, including author, description, and publication date.  
- **API Integration** – Fetches book data from an external API.  
- **Deployment on Vercel** – Hosted on [Vercel](https://vercel.com) for seamless access.  
- **Load Balancing** – Configured for optimized performance and traffic management.  

## Deployment Process  
This application was deployed using three key components:  
1. **Web Servers (web01 and web02)** – Two separate instances for hosting the application.  
2. **Load Balancer (lb01)** – Configured to distribute traffic evenly between `web01` and `web02`, ensuring reliability and better performance.  
3. **Domain Name** – A custom domain was used for accessibility.  

### Steps Taken for Deployment:  
1. **Cloned the Repository**  
   ```bash
   git clone https://github.com/Esther447/book-search-app.git
Set Up the Web Servers

Installed necessary dependencies.

Deployed the application on web01 and web02.

Configured the Load Balancer

Set up lb01 to distribute incoming traffic between web01 and web02.

Ensured failover protection to handle high traffic loads.

Domain Name Setup

Configured a custom domain to point to the load balancer.

Issues Faced
Domain Name Expiration Issue
Despite purchasing the domain name for one year, it unexpectedly expired before the period elapsed. This caused downtime and access issues, requiring further troubleshooting with the domain provider. The team is actively working to resolve this issue and restore full functionality.
![Book Search App Screenshot](./images/Screenshot%202025-03-29%20094715.png)

Youtube video link: https://youtu.be/CYBOTrAtiNM
