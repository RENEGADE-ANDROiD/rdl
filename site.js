'use strict';
const descriptions = {
  Cyberpunk: 'NEON GREEN + PINK + YELLOW',
  'Blood Moon': 'CRIMSON + DARK RED + BLACK',
  Hellfire: 'EMBER RED + ORANGE + YELLOW',
  'Desert Dust': 'LIGHT SAND + SUNBAKED COPPER',
  'Doom 64': 'DEEP VIOLET + ACID GREEN',
  Synthwave: 'ELECTRIC MAGENTA + CYAN',
  Vaporwave: 'PASTEL PINK + TEAL',
  'High Contrast': 'BLACK + WHITE + YELLOW'
};
const image = document.querySelector('#theme-image');
const preview = document.querySelector('#theme-preview');
const label = document.querySelector('#theme-label');
for (const button of document.querySelectorAll('[data-theme]')) {
  button.addEventListener('click', () => {
    for (const option of document.querySelectorAll('[data-theme]')) {
      option.classList.toggle('selected', option === button);
      option.setAttribute('aria-pressed', String(option === button));
    }
    const {theme, file, color} = button.dataset;
    const path = `assets/${file}.png`;
    image.src = path;
    image.alt = `${theme} theme in the RDL launcher, with arsenal selection, map gallery and addon controls.`;
    preview.dataset.enlarge = path;
    preview.dataset.caption = `${theme} — launcher interface preview`;
    preview.setAttribute('aria-label', `Enlarge the ${theme} launcher screenshot`);
    label.textContent = `${theme.toUpperCase()} / ${descriptions[theme]}`;
    document.documentElement.style.setProperty('--preview-accent', color);
  });
}
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
let lastTrigger;
for (const button of document.querySelectorAll('[data-enlarge]')) {
  button.addEventListener('click', () => {
    lastTrigger = button;
    dialogImage.src = button.dataset.enlarge;
    dialogImage.alt = button.dataset.caption;
    document.querySelector('#dialog-caption').textContent = button.dataset.caption;
    dialog.showModal();
  });
}
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
dialog.addEventListener('close', () => {if (lastTrigger) lastTrigger.focus();});
