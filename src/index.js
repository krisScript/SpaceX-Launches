'use strict';
import './style/index.scss';
import getData from './app/getData/getData';
import classToggle from './app/classToggle/classToggle';
import createLaunchCard from './app/createLaunchCard';
import displayAlert from './app/displayAlert/displayAlert';
const url = 'https://api.spacexdata.com/v3/launches'
getData(url).then(data => {
  const loadingSection = document.querySelector('#loading-section');
  const upcomingSection = document.querySelector('#upcoming-section');
  const pastSection = document.querySelector('#past-section');
  classToggle(loadingSection, 'is-hidden');
  classToggle(upcomingSection, 'is-hidden');
  classToggle(pastSection, 'is-hidden');
 
  data.forEach(launch => {
    createLaunchCard(launch)
  });
}).catch(error => displayAlert('Sorry there was an Error!'))
