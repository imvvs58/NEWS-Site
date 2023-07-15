// navbar start
const menuBtn = document.querySelector(".menuBtn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});
// navbar end
const Url = "https://newsapi.org/v2/everything?q=";
const API_KEY = "faa4507b7fe44bd9bb10cfdcf995b655";
const extraUrl = "&from=2023-07-12&apiKey=";

async function fetchNews(query) {
  const res = await fetch(`${Url}${query}${extraUrl}${API_KEY}`);
  const data = await res.json();
  return data;
}
fetchNews("india").then((data) => {
  renderMain(data.articles);
});
const cardContainer = document.querySelector(".card-container");
function renderMain(arr) {
  mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage && arr[i].description && arr[i].source.id) {
      mainHTML += `
        <div class="card">
        <div class="card-content">
        <div class="card-header">
        <img id="newsImg" src="${arr[i].urlToImage}" alt="image" class="newsImg">
        </div>
          <h3 class="news-title">${arr[i].title}</h3>
          <h6 class="news-source">${arr[i].source.id}  ${arr[i].publishedAt}</h6>
          <p class="news-desc">${arr[i].description}</p>
          <a href="${arr[i].url}" class="readmoreBtn">Read more...</a>
          <div class="btns">
            <button class="bothBtn" id="SaveBtn" onClick="saveCard(event)">Save</button>
          </div>
        </div>
      </div>`;
    }
  }
  cardContainer.innerHTML = mainHTML;
}
// like Btn

// searchBar
const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchInput");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newsData = await fetchNews(searchInput.value);
  renderMain(newsData.articles);
});

// navlist query
async function search(category) {
  const newsData = await fetchNews(category);
  renderMain(newsData.articles);
}

// save card
function saveCard(event) {
  const card = event.target.closest(".card-content");
  const title = card.querySelector(".news-title").textContent;
  const source = card.querySelector(".news-source").textContent;
  const description = card.querySelector(".news-desc").textContent;
  const url = card.querySelector(".readmoreBtn").getAttribute("href");
  const newsImg = card.querySelector("#newsImg").getAttribute("src");
  const savedCard = {
    title: title,
    source: source,
    description: description,
    url: url,
    newsImg: newsImg,
  };
  // Retrieve the existing saved cards from local storage
  const savedCards = localStorage.getItem("savedCards");

  let savedCardsArray = [];
  // Check if the button color is stored in localStorage
  if (savedCards) {
    savedCardsArray = JSON.parse(savedCards);
  }
  // Check if the card already exists in the saved cards
  const cardIndex = savedCardsArray.findIndex(
    (card) => card.url === savedCard.url
  );
  const setSatus = localStorage.setItem("statuslike", "red");
  if (cardIndex === -1) {
    savedCardsArray.push(savedCard);
    alert("Card added to favorites!");
  } else {
    // savedCardsArray.splice(cardIndex, 1);
    // event.target.textContent = "Save";
    // alert("Card removed from favorites!");
    alert("Already in favorites!");
  }
  // Update the saved cards in local storage
  localStorage.setItem("savedCards", JSON.stringify(savedCardsArray));
}