async function loadSharedHeader() {
  const mount = document.querySelector('#site-header');
  if (!mount) return;
  try {
    const response = await fetch('header.html');
    if (!response.ok) throw new Error('Не удалось загрузить шапку');
    mount.innerHTML = await response.text();
    initHeaderMenu();
  } catch (error) {
    console.error(error);
  }
}

function initHeaderMenu() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
    });
  });
}

loadSharedHeader();

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const status = document.querySelector('.form-status');
if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Форма работает в демонстрационном режиме. Подключите отправку на сервер или в CRM.';
  });
}
