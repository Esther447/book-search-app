// Function to fetch popular books and display them
function displayPopularBooks() {
  const url = 'https://openlibrary.org/subjects/popular.json';

  fetch(url)
    .then(response => response.json())
    .then(data => showPopularBooks(data.works))
    .catch(error => console.error('Error fetching popular books:', error));
}

// Function to show popular books below the search bar
function showPopularBooks(books) {
  const popularBooksContainer = document.getElementById('popular-books-list');
  popularBooksContainer.innerHTML = ''; // Clear previous suggestions

  if (books.length === 0) {
    popularBooksContainer.innerHTML = '<p>No popular books found.</p>';
    return;
  }

  books.slice(0, 5).forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');

    const coverImage = book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : 'https://via.placeholder.com/150';
    const title = book.title || 'No title available';
    const author = book.authors ? book.authors.map(author => author.name).join(', ') : 'No author available';

    bookItem.innerHTML = `
      <img src="${coverImage}" alt="${title}" />
      <h3>${title}</h3>
      <p>by ${author}</p>
    `;

    popularBooksContainer.appendChild(bookItem);
  });
}

// Function to search books based on user input
function searchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayBooks(data.docs))
    .catch(error => console.error('Error fetching books:', error));
}

// Function to display books based on search results
function displayBooks(books) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ''; // Clear previous results

  if (books.length === 0) {
    bookList.innerHTML = '<p>No books found.</p>';
    return;
  }

  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');

    const coverImage = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/150';
    const title = book.title || 'No title available';
    const author = book.author_name ? book.author_name.join(', ') : 'No author available';
    const bookKey = book.key ? book.key : '';

    const readLink = bookKey ? `https://openlibrary.org${book.key}/read` : '#';

    bookItem.innerHTML = `
      <img src="${coverImage}" alt="${title}" />
      <h3>${title}</h3>
      <p>by ${author}</p>
      <a href="${readLink}" target="_blank">Read Online</a>
    `;
    
    bookList.appendChild(bookItem);
  });
}

// Function to handle the input event for live search
function handleSearchInput() {
  const query = document.getElementById('search-input').value.trim();

  if (query.length > 0) {
    searchBooks(query); // Fetch books related to the input query
    document.getElementById('popular-books-list').style.display = 'none'; // Hide popular books
  } else {
    document.getElementById('popular-books-list').style.display = 'block'; // Show popular books when search is cleared
    displayPopularBooks(); // Reload popular books
  }
}

// Load popular books on page load
window.onload = function () {
  displayPopularBooks();

  // Add event listener for the search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', handleSearchInput); // Trigger live search on input
};

