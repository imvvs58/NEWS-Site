const savedCards = localStorage.getItem("savedCards");
let savedCardsArray = [];

if (savedCards) {
  savedCardsArray = JSON.parse(savedCards);
}

// Generate HTML for saved cards
const savedCardsContainer = document.querySelector("#savedCardsContainer");

for (let i = 0; i < savedCardsArray.length; i++) {
  const card = savedCardsArray[i];
  // const imageSrc = card.imageUrl ? card.imageUrl : "placeholder_image_url.jpg";
  const cardHTML = `
      <div class="card"id="card_${i}">
        <div class="card-header">
          <img src="${card.newsImg}" alt="image" id="newsImg">
        </div>
        <div class="card-content">
          <h3 class="news-title">${card.title}</h3>
          <h6 class="news-source">${card.source}</h6>
          <p class="news-desc">${card.description}</p>
          <a href="${card.url}" class="readmoreBtn">Read more...</a>
          <div class="btns">
            <button class="bothBtn" id="remove" onclick="remove(${i})">Remove</button>
          </div>
        </div>
      </div>`;
  savedCardsContainer.innerHTML += cardHTML;
}
function remove(index) {
  const cardElement = document.querySelector(`#card_${index}`);
  if (cardElement) {
    cardElement.remove();

    // Remove the card from the savedCardsArray
    savedCardsArray.splice(index, 1);

    // Update the savedCards in localStorage
    localStorage.setItem("savedCards", JSON.stringify(savedCardsArray));
  }
}