let debounceTimer;

// Popular Books Functions
function displayPopularBooks() {
    const url = 'https://openlibrary.org/subjects/popular.json';
    fetch(url)
        .then(response => response.json())
        .then(data => showPopularBooks(data.works))
        .catch(error => console.error('Error fetching popular books:', error));
}

function showPopularBooks(books) {
    const popularBooksContainer = document.getElementById('popular-books-list');
    popularBooksContainer.innerHTML = '';

    books.slice(0, 5).forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        
        const coverImage = book.cover_id ? 
            `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : 
            'https://via.placeholder.com/150';
        const title = book.title || 'No title available';
        const author = book.authors ? 
            book.authors.map(author => author.name).join(', ') : 
            'No author available';
        const bookKey = book.key || '';
        const detailsLink = `https://openlibrary.org${bookKey}`;

        bookItem.innerHTML = `
            <img src="${coverImage}" alt="${title}">
            <h3>${title}</h3>
            <p>by ${author}</p>
        `;

        bookItem.addEventListener('click', () => {
            window.open(detailsLink, '_blank');
        });

        popularBooksContainer.appendChild(bookItem);
    });
}

// Search Functions
function searchBooks(query) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '<div class="loading">Searching books...</div>';
    
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        if (!data.docs || data.docs.length === 0) {
            throw new Error('No books found matching your search');
        }
        displayBooks(data.docs);
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

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const coverImage = book.cover_i ? 
            `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 
            'https://via.placeholder.com/150';
        const title = book.title || 'No title available';
        const author = book.author_name?.join(', ') || 'No author available';
        const bookKey = book.key || '';
        const detailsLink = `https://openlibrary.org${bookKey}`;
        const readLink = `${detailsLink}/read`;

        bookItem.innerHTML = `
            <img src="${coverImage}" alt="${title}">
            <h3>${title}</h3>
            <p>by ${author}</p>
            <a href="${readLink}" target="_blank">Read Online</a>
        `;

        bookItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.open(detailsLink, '_blank');
            }
        });

        bookList.appendChild(bookItem);
    });
}

// Event Listeners
window.onload = function() {
    displayPopularBooks();
    
    document.querySelector('button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (query) searchBooks(query);
    });

    document.getElementById('search-input').addEventListener('input', function(e) {
        const query = e.target.value.trim();
        clearTimeout(debounceTimer);
        
        if (query.length > 0) {
            debounceTimer = setTimeout(() => {
                searchBooks(query);
                document.getElementById('popular-books-list').style.display = 'none';
            }, 300);
        } else {
            document.getElementById('popular-books-list').style.display = 'block';
            displayPopularBooks();
        }
    });
};
