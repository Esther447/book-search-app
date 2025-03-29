let debounceTimer;
let currentPage = 1;
const BOOKS_PER_PAGE = 8;
let allSearchResults = []; // To store all search results


// Popular Books Functions
function displayPopularBooks() {
    const url = 'https://openlibrary.org/subjects/popular.json?limit=10';
    fetch(url)
        .then(response => response.json())
        .then(data => showPopularBooks(data.works))
        .catch(error => console.error('Error fetching popular books:', error));
}


function showPopularBooks(books) {
    const popularBooksContainer = document.getElementById('popular-books-list');
    popularBooksContainer.innerHTML = '';


    // Show 8 books instead of 5
    books.slice(0, 8).forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
       
        const hasCover = book.cover_id ? true : false;
        const title = book.title || 'No title available';
        const author = book.authors ?
            book.authors.map(author => author.name).join(', ') :
            'No author available';
        const bookKey = book.key || '';
        const detailsLink = `https://openlibrary.org${bookKey}`;


        // Get initials and choose a color variation for the placeholder
        const initials = title
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
       
        // Use consistent color for same initials
        const colorIndex = Math.abs(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % 6 + 1;
       
        let coverHTML = '';
        if (hasCover) {
            coverHTML = `<div class="cover-container">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg" alt="${title}">
            </div>`;
        } else {
            coverHTML = `<div class="cover-container">
                <div class="no-cover color-${colorIndex}">${initials}</div>
            </div>`;
        }


        bookItem.innerHTML = `
            ${coverHTML}
            <div class="book-info">
                <div>
                    <h3>${title}</h3>
                    <p class="author">by ${author}</p>
                </div>
                <a href="${detailsLink}" target="_blank" class="read-btn">Read</a>
            </div>
        `;


        bookItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.open(detailsLink, '_blank');
            }
        });


        popularBooksContainer.appendChild(bookItem);
    });
}


// Search Functions
function searchBooks(query) {
    if (!query) {
        query = document.getElementById('search-input').value.trim();
    }
   
    if (!query) return;
   
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '<div class="loading">Searching books...</div>';
   
    document.getElementById('pagination-controls').innerHTML = '';
   
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        if (!data.docs || data.docs.length === 0) {
            throw new Error('No books found matching your search');
        }
        allSearchResults = data.docs;
        currentPage = 1;
        displayBooks(data.docs);
        setupPagination(data.docs.length);
    })
    .catch(error => {
        bookList.innerHTML = `<div class="error">${error.message}</div>`;
        console.error('Search error:', error);
    })
    .finally(() => {
        document.getElementById('popular-books').style.display = 'none';
    });
}


function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
   
    // Calculate which books to show on current page
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    const booksToDisplay = books.slice(startIndex, endIndex);


    if (booksToDisplay.length === 0) {
        bookList.innerHTML = '<div class="error">No books to display on this page</div>';
        return;
    }


    booksToDisplay.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');


        // Handle books without covers
        const hasCover = book.cover_i ? true : false;
        const title = book.title || 'No title available';
        const author = book.author_name?.join(', ') || 'No author available';
        const bookKey = book.key || '';
        const detailsLink = `https://openlibrary.org${bookKey}`;
        const readLink = book.key ? `https://openlibrary.org${bookKey}/read` : '#';


        // Get initials and choose a color variation for the placeholder
        const initials = title
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
       
        // Use consistent color for same initials
        const colorIndex = Math.abs(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % 6 + 1;
       
        let coverHTML = '';
        if (hasCover) {
            coverHTML = `<div class="cover-container">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" alt="${title}">
            </div>`;
        } else {
            coverHTML = `<div class="cover-container">
                <div class="no-cover color-${colorIndex}">${initials}</div>
            </div>`;
        }


        bookItem.innerHTML = `
            ${coverHTML}
            <div class="book-info">
                <div>
                    <h3>${title}</h3>
                    <p class="author">by ${author}</p>
                </div>
                <a href="${readLink}" target="_blank" class="read-btn">Read</a>
            </div>
        `;


        bookItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.open(detailsLink, '_blank');
            }
        });


        bookList.appendChild(bookItem);
    });
}


function setupPagination(totalBooks) {
    const paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = '';
   
    if (totalBooks <= BOOKS_PER_PAGE) {
        return; // No pagination needed
    }
   
    const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);
   
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayBooks(allSearchResults);
            setupPagination(totalBooks);
            window.scrollTo(0, 0);
        }
    });
    paginationContainer.appendChild(prevBtn);
   
    // Page number buttons - show a maximum of 5 pages
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
   
    // Ensure we always show 5 page buttons if possible
    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(5, totalPages);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - 4);
        }
    }
   
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList.toggle('active', i === currentPage);
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayBooks(allSearchResults);
            setupPagination(totalBooks);
            window.scrollTo(0, 0);
        });
        paginationContainer.appendChild(pageBtn);
    }
   
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayBooks(allSearchResults);
            setupPagination(totalBooks);
            window.scrollTo(0, 0);
        }
    });
    paginationContainer.appendChild(nextBtn);
}


// Event Listeners
window.onload = function() {
    displayPopularBooks();
   
    document.querySelector('button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (query) searchBooks(query);
    });


    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query) searchBooks(query);
        }
    });


    document.getElementById('search-input').addEventListener('input', function(e) {
        const query = e.target.value.trim();
        clearTimeout(debounceTimer);
       
        if (query.length > 0) {
            debounceTimer = setTimeout(() => {
                searchBooks(query);
                document.getElementById('popular-books').style.display = 'none';
            }, 500);
        } else {
            document.getElementById('popular-books').style.display = 'block';
            document.getElementById('pagination-controls').innerHTML = '';
            displayPopularBooks();
        }
    });
};

