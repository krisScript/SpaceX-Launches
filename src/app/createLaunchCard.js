import countdown from './countdown';
import createLauchModal from './createLauchModal';
const createLauchCard = launch => {
  const upcomingSection = document.querySelector('#upcoming-section');
  const pastSection = document.querySelector('#past-section');
  const launchCard = document.createElement('div');
  launchCard.className = `column ${
    launch.upcoming ? 'is-one-fifth' : 'is-one-quarter'
  } is-flex`;
  const dateData = launch.launch_date_utc;
  const dateObject = new Date(Date.parse(dateData));
  const dateReadable = dateObject.toDateString();
  launchCard.innerHTML = `
  <div class="container">
 <div class="card">
  ${
    launch.upcoming
      ? ''
      : `<div class="card-image">
  <figure class="image is-4by3">
    <img src="${
      launch.links.flickr_images[0]
        ? launch.links.flickr_images[0]
        : launch.links.mission_patch
    }" alt="Placeholder image">
  </figure>
</div>`
  }
  <div class="card-content">
    <div class="media">
     ${
       launch.upcoming
         ? ''
         : `<div class="media-left">
     <figure class="image is-48x48">
       <img src="${launch.links.mission_patch_small}" alt="Placeholder image">
     </figure>
   </div>`
     } 
      <div class="media-content">
        <p class="title is-size-5">${launch.mission_name}</p>
        <p class="subtitle is-size-6">Lauch Number: ${launch.flight_number}</p>
      </div>
    </div>
    <div class="content">
      <p>Rocket: ${launch.rocket.rocket_name}</p>
      ${
        launch.upcoming ? '' : `<p>Launch Success: ${launch.launch_success}</p>`
      }
      <p>Launch Site: ${launch.launch_site.site_name_long}</p>
      <time id="time-countdown-${
        launch.flight_number
      }" datetime="${dateData}">${dateReadable}</time>
    </div>
  </div>
</div>
 </div> 
 `;
  if (launch.upcoming) {
    upcomingSection.children[1].appendChild(launchCard);
    const countdownElement = document.querySelector(
      `#time-countdown-${launch.flight_number}`
    );
    const date = new Date(launch.launch_date_utc);
    countdown(countdownElement, date);
  } else {
    pastSection.children[1].appendChild(launchCard);
  }
  launchCard.addEventListener('click', e => {
    createLauchModal(launch);
  });
};
export default createLauchCard;
