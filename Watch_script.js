//FIRST TABLE
const titleIds = [345534, 311767, 315551, 338086, 374270];

// Function to fetch details for a title
async function fetchTitleDetails(titleId) {
  const apiKey = 'fjP0QU24bxEKqoQkvtiEzk7ZcRMSzsxCweYHUdng';
  const apiUrl = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${apiKey}&append_to_response=sources`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching title details:', error);
    return null;
  }
}

// Function to handle fetched data
function handleFetchedData(titleId, data) {
    if (data) {
      // Access the title and user rating dynamically
      const title = data.title || 'Unknown Title';
      const userRating = data.user_rating || 'N/A';
  
      // Add a row to the table
      addRow(title, userRating);
    } else {
      console.log(`Failed to fetch details for title ID ${titleId}`);
    }
  }
  
  // Loop through titleIds and fetch details for each title
  titleIds.forEach(async (titleId) => {
    const titleDetails = await fetchTitleDetails(titleId);
    handleFetchedData(titleId, titleDetails);
  });
  
  // Function to add a row to the table
  function addRow(title, userRating) {
    const tableBody = document.getElementById('insightsTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
  
    // Insert cells into the row
    const titleCell = newRow.insertCell(0);
    const ratingCell = newRow.insertCell(1);
  
    // Add data to the cells
    titleCell.textContent = title;
    ratingCell.textContent = userRating;
  }

//SECOND TABLE
// Loop through titleIds and fetch details for each title for the second table
titleIds.forEach(async (titleId) => {
    const titleDetails = await fetchTitleDetails(titleId);
    handleGenreRelevanceData(titleId, titleDetails);
  });
  
  // Function to handle fetched data and add rows to the second table
  function handleGenreRelevanceData(titleId, data) {
    if (data) {
      // Access the title, genres, and relevance percentile dynamically
      const title = data.title || 'Unknown Title';
      const genres = data.genre_names ? data.genre_names.join(', ') : 'N/A';
      const relevancePercentile = data.relevance_percentile || 'N/A';
  
      // Add a row to the second table
      addGenreRelevanceRow(title, genres, relevancePercentile);
    } else {
      console.log(`Failed to fetch details for title ID ${titleId}`);
    }
  }
  
  // Function to add a row to the second table
  function addGenreRelevanceRow(title, genres, relevancePercentile) {
    const tableBody = document.getElementById('insightsTableTwo').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
  
    // Insert cells into the row
    const titleCell = newRow.insertCell(0);
    const genresCell = newRow.insertCell(1);
    const relevanceCell = newRow.insertCell(2);
  
    // Add data to the cells
    titleCell.textContent = title;
    genresCell.textContent = genres;
    relevanceCell.textContent = relevancePercentile;
  }
  
// THIRD TABLE
// Loop through titleIds and fetch details for each title for the third table
titleIds.forEach(async (titleId) => {
    const titleDetails = await fetchTitleDetails(titleId);
    handleRegionData(titleId, titleDetails);
  });
  
  // Function to handle fetched data and add rows to the third table
  function handleRegionData(titleId, data) {
    if (data) {
      // Access the title and regions dynamically
      const title = data.title || 'Unknown Title';
      const regions = data.sources ? [...new Set(data.sources.map(source => source.region))].join(', ') : 'N/A';
  
      // Add a row to the third table
      addRegionRow(title, regions);
    } else {
      console.log(`Failed to fetch details for title ID ${titleId}`);
    }
  }
  
  // Function to add a row to the third table
  function addRegionRow(title, regions) {
    const tableBody = document.getElementById('insightsTableThree').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
  
    // Insert cells into the row
    const titleCell = newRow.insertCell(0);
    const regionsCell = newRow.insertCell(1);
  
    // Add data to the cells
    titleCell.textContent = title;
    regionsCell.textContent = regions;
  }
//Note: If you run the code, and you get a bunch of NA's or Unknowns, it just means that I run out of API requests.