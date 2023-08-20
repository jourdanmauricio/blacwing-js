const $themeBtn = document.getElementById('theme-btn');
const $themeSelectors = document.querySelectorAll('[data-dark]');

const moon = '🌚';
const sun = '🌞';

const ligthMode = () => {
  $themeSelectors.forEach((el) => el.classList.add('dark-mode'));
  $themeBtn.textContent = moon;
  localStorage.setItem('theme', 'ligth');
};

const darkMode = () => {
  $themeSelectors.forEach((el) => el.classList.remove('dark-mode'));
  $themeBtn.textContent = sun;
  localStorage.setItem('theme', 'dark');
};

$themeBtn.addEventListener('click', () => {
  if ($themeBtn.textContent === sun) {
    ligthMode();
  } else {
    darkMode();
  }
});

document.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'dark');
  }
  if (localStorage.getItem('theme') === 'ligth') {
    ligthMode();
  } else {
    darkMode();
  }
});
