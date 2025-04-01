Book Search App

Overview

Book Search App is a web application designed to make it easier for users to search for books online, providing access to a vast library of books through the Open Library API. Users can search for books by title, author, or ISBN and get details such as availability for online reading, author information, and more.
---------------------------------------------------------------------------------
Features

Search for books by title, author, or ISBN.

View book details including cover, author, and availability.

Some books have access to read online, while others do not.

Simple and user-friendly interface.

Technologies Used

Frontend: HTML, CSS, JavaScript

Backend: JavaScript (No Node.js, purely frontend-based API integration)

API: Open Library API
----------------------------------------------------------------------------------------
How to Use the Book Search App 📚
Visit the Website

Open a web browser and go to [my app’s domain] (https://getcryptoappcoder.tech).

Search for a Book

On the homepage, you’ll find a search bar.

Type the name of a book, author, or keyword and press Enter or click the Search button.

View Search Results

A list of books related to your search will appear.

Each book will display its title, author, cover image, and availability.

Check Book Details

Click on a book to view more details like its description, published year, and availability.

If the book has an online reading option, a "Read Online" button will be available.

Read Online (if available)

If a book supports online reading, click the "Read Online" button.

The app will redirect you to Open Library’s reader to access the book.

Explore More Books

Use the search bar again to find more books.

Enjoy Your Reading! 📖✨

---------------------------------------------------------------------------------------------

Deployment: Nginx on Ubuntu servers (web01, web02, lb01)

How to Run the Application Locally

Clone the repository:

git clone https://github.com/Esther447/book-search-app.git

Navigate to the project folder:

cd book-search-app

Open index.html in your browser to start using the app.

Deployment Instructions

The application is deployed on multiple Ubuntu servers using Nginx as a reverse proxy.

Copy the application files to /var/www/html/ on each server:

sudo cp -r book-search-app /var/www/html/

Set proper ownership and permissions:

sudo chown -R ubuntu:ubuntu /var/www/html/

Configure Nginx: Edit /etc/nginx/sites-available/default and add the following:

server {
    listen 80;
    server_name getcryptoappcoder.tech www.getcryptoappcoder.tech;

    root /var/www/html/book-search-app;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

Restart Nginx to apply changes:

sudo systemctl restart nginx

Set up SSL using Let's Encrypt:

sudo certbot --nginx -d getcryptoappcoder.tech -d www.getcryptoappcoder.tech

Enable auto-renewal for SSL:

sudo certbot renew --dry-run
--------------------------------------------------------------------------
Challenges Faced

API Limitations: Some books do not have an option to read online due to availability restrictions.

Deployment Issues: Ensuring Nginx was correctly set up to serve static files and proxy requests.

Security: Implementing SSL to make the site secure.

Credits

Open Library API for providing book data.

Let's Encrypt for free SSL certificates.

Nginx for handling web traffic efficiently.

Future Improvements

Implement user authentication to save favorite books.

Enhance the UI with better search filters and categories.

Improve mobile responsiveness for a better experience on small screens.

Developed by Esther447
--------------------------------------------------------------------------------------
Youtube Video:  https://youtu.be/-zYTmzcRNI4
App link:  https://www.getcryptoappcoder.tech/

