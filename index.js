import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form event listener
searchForm.addEventListener('submit', e => {
  //Get search input
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  // Get limit
  const searchLimit = document.getElementById('limit').value;

  // Check input
  if (searchTerm === '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger');
  }

  // Clear input
  searchInput.value = '';

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    console.log(results);
    let output = '<div class="card-columns">';
    // Loop thru posts
    results.forEach(post => {
      // Check for image
      const image = post.preview
        ? post.preview.images[0].source.url
        : 'https://assets.change.org/photos/3/gb/gw/SdgbgWIPpyJFIRp-800x450-noPad.jpg?1513898229';

      output += `
        <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${
              post.url
            }" target="_target" class="btn btn-danger">View More</a>
            <hr/>
            <span class="badge badge-secondary">Subreddit: ${
              post.subreddit
            }</span>
            <span class="badge badge-dark">Score: ${post.score}</span>
          </div>
        </div>
      `;
    });
    output += '</div>';

    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

// Show message func
function showMessage(msg, className) {
  // Create div
  const div = document.createElement('div');
  // Add class
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get search
  const search = document.getElementById('search');
  // Insert message
  searchContainer.insertBefore(div, search);
  // Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

// Truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);

  if (shortened == -1) return text;
  return text.substr(0, shortened);
}
