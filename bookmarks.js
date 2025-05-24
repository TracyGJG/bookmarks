document.querySelector('main').addEventListener('click', (evt) => {
  if (evt.target.tagName === 'SUMMARY') {
    window.localStorage.setItem('selectedDet', evt.target.parentNode.id);
    [...document.querySelectorAll('details')].forEach((detail) =>
      detail.removeAttribute('open')
    );
  }
});

window.addEventListener('load', () => {
  const selectedDet = window.localStorage.getItem('selectedDet') ?? 'detHome';
  document.getElementById(selectedDet).setAttribute('open', 'true');
});
