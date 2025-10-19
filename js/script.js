const apiKey="6daf7611ab34427ab61f33255aef6378";


//featured
const newsContainer = document.getElementById("newsContainer");

async function fetchTopHeadlines() {
  const url = `https://newsapi.org/v2/everything?q=latest&sortBy=publishedAt&apiKey=${apiKey}`;


  try {
    const response = await fetch(url);
    const data = await response.json();

    //slides
    const slidesContainer = document.querySelector(".slides");
    if (slidesContainer) slidesContainer.innerHTML = ""; 

    data.articles.slice(0, 3).forEach(article => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.innerHTML = `
        <img src="${article.urlToImage || 'images/default.jpg'}" alt="${article.title}">
        <div class="caption">${article.title}</div>
      `;
      slidesContainer.appendChild(slide);
    });

    //latest news featured
    if (newsContainer) {
      newsContainer.innerHTML = "";
      data.articles.slice(0, 6).forEach(article => {
        const card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
          <img src="${article.urlToImage || 'images/default.jpg'}" alt="${article.title}">
          <div class="content">
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read More</a>
          </div>
        `;
        newsContainer.appendChild(card);
      });
    }

  } catch (error) {
    if (newsContainer) newsContainer.innerHTML = `<p style="color:red;">Failed to load news.</p>`;
    console.error("Error fetching top headlines:", error);
  }
}


if (newsContainer) fetchTopHeadlines();

// Search 

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchNewsByQuery(query);
  });
}

async function fetchNewsByQuery(query) {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
  if (searchResults) searchResults.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    searchResults.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      searchResults.innerHTML = "<p>No results found.</p>";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `
        <img src="${article.urlToImage || 'images/default.jpg'}" alt="${article.title}">
        <div class="content">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        </div>
      `;
      searchResults.appendChild(card);
    });

  } catch (error) {
    searchResults.innerHTML = `<p style="color:red;">Failed to fetch search results.</p>`;
    console.error("Error fetching search results:", error);
  }
}

//categories
async function fetchCategory(category) {
  const url = `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&apiKey=${apiKey}`;

  const categoryResults = document.getElementById("categoryResults");

  if (categoryResults) categoryResults.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    categoryResults.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      categoryResults.innerHTML = "<p>No news found in this category.</p>";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `
        <img src="${article.urlToImage || 'images/default.jpg'}" alt="${article.title}">
        <div class="content">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        </div>
      `;
      categoryResults.appendChild(card);
    });

  } catch (error) {
    categoryResults.innerHTML = "<p style='color:red;'>Failed to load news.</p>";
    console.error(`Error fetching ${category} news:`, error);
  }
}
