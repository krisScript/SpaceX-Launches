import getDate from './getDate';
const countdown = (countdownElement, date) => {
  const countdownFn = () => {
    const countdownDate = getDate(date);
    countdownElement.textContent = `days ${countdownDate.days}: hours ${
      countdownDate.hours
    }: minutes ${countdownDate.minutes}: seconds ${countdownDate.seconds}`;
    window.requestAnimationFrame(countdownFn);
  };
  window.requestAnimationFrame(countdownFn);
};
export default countdown;
