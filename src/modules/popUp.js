const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '0123393eeamsh1bee10a3a220057p1fbee7jsn7ef939fd62ca',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
  },
};
export default class Game {
  // Initialization
  constructor() {
    this.API_URL = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
    this.gameContainer = document.querySelector('.content');
  }

  getGame = async () => {
    const response = await fetch(this.API_URL, options);
    const data = await response.json().catch((error) => new Error(error));
    this.popupGame(data);
  };

  popupGame = (data) => {
    const seeGame = document.querySelectorAll('.comment-btn');
    seeGame.forEach((item, index) => {
      item.addEventListener('click', () => {
        const modalPopup = document.createElement('section');
        modalPopup.classList.add = 'popup-section';
        modalPopup.innerHTML = `
        <div class="popup">
      <button id="close-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="container">
          <div class="display">
            <div class="description">
              <img
                src="${data[index].thumbnail}"
                alt="thumbnail"
              />
              <h3 class="game-title">${data[index].title}</h3>
            </div>
            <div class="display-details">
              <h3>game details:</h3>
              <ul>
                <li>
                  ${data[index].short_description}
                </li>
                <li><strong>date of release:</strong> ${data[index].release_date}</li>
                <li><strong>genre:</strong> ${data[index].genre}</li>
                <li><strong>platform:</strong>${data[index].platform}</li>
              </ul>
            </div>
          </div>
          <div class="comment-section">
            <div class="comment-show comments-${data[index].id}">
              <h3 class="counter">
                Comments(<span class="total-comments">0</span>)
              </h3>
              <ul class="comments ${data[index].id}"  id="${data[index].id}">
               
              </ul>
            </div>
            <div class="comment">
              <div class="add-comment">
                <h3>Add Comment</h3>
              </div>
              <form class="form" data-get-comment="${data[index].id}">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                />
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  placeholder="Your insight"
                ></textarea>
                <button id="${data[index].id}" type="submit" class="submit-btn">
                  Comment
                </button>
              </form>
            </div>
          </div>
          </div>
          </div>
       `;
        this.gameContainer.appendChild(modalPopup);
        this.closeGame(modalPopup);
      });
    });
  };

  closeGame = (modalPopup) => {
    const closeBtn = document.querySelectorAll('#close-btn');
    closeBtn.forEach((item) => {
      item.addEventListener('click', () => {
        modalPopup.remove();
      });
    });
  };
}
