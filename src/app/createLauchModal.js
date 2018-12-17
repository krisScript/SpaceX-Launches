import addImgsToCarousel from './addImgsToCarousel';
import countdown from './countdown';
const createLaunchModal = launch => {
  console.log(launch);
  const dateData = launch.launch_date_utc;
  const dateObject = new Date(Date.parse(dateData));
  const dateReadable = dateObject.toDateString();
  const modal = document.createElement('div');
  modal.className = 'modal is-active';
  modal.innerHTML = `
    <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">${launch.mission_name}</p>
      <button class="button is-link"  id="remove-modal">X</button>
    </header>
    <section class="modal-card-body">
    <div class="is-divider" data-content="Info"></div>
    <div class="content">
    <p>Rocket: ${launch.rocket.rocket_name}</p>
      ${
        launch.upcoming ? '' : `<p>Launch Success: ${launch.launch_success}</p>`
      }
      <p>Launch Site: ${launch.launch_site.site_name_long}</p>
      <time id="time-countdown-${
        launch.flight_number
      }-modal" datetime="${dateData}">${dateReadable}</time>
    </div>
    <div class="is-divider" data-content="Details"></div>
    <div class="content">
   <p>${launch.details ? launch.details : 'No details available!'}</p>
  </div>
  ${
    launch.ships.length > 0
      ? `<div class="is-divider" data-content="Ships"></div> <div class="content has-text-centered" id="ships-container">
  </div>`
      : ''
  }
 
    ${
      launch.links.flickr_images[0]
        ? `    <div class="is-divider" data-content="Images"></div><div class='carousel carousel-animated carousel-animate-slide'>
    <div class='carousel-container'>
    </div>
<div class="carousel-navigation">
<div class="carousel-nav-left">
  <i class="fa fa-chevron-left" aria-hidden="true"></i>
</div>
<div class="carousel-nav-right">
  <i class="fa fa-chevron-right" aria-hidden="true"></i>
</div>
</div>
  </div>
  `
        : ''
    }
    </section>
  </div>
    `;
  const body = document.body;
  body.appendChild(modal);
  const modalRemoveBtn = document.querySelector('#remove-modal');
  modalRemoveBtn.addEventListener('click', e => {
    modal.remove();
  });
  if (launch.ships.length > 0) {
    const shipsContainer = document.querySelector('#ships-container');
    const shipsList = document.createElement('ul');
    shipsContainer.appendChild(shipsList);
    launch.ships.forEach(ship => {
      const shipItem = document.createElement('li');
      shipItem.textContent = ship;
      shipsList.appendChild(shipItem);
    });
  }
  if (launch.upcoming) {
    const countdownElement = document.querySelector(
      `#time-countdown-${launch.flight_number}-modal`
    );
    const date = new Date(launch.launch_date_utc);
    countdown(countdownElement, date);
  }
  if (launch.links.flickr_images[0]) {
    addImgsToCarousel(launch.links.flickr_images);
  }
};
export default createLaunchModal;
