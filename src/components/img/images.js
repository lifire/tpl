import imgSrc from './images/logo.png';
const img = document.createElement('img');
img.src = imgSrc;

const center = document.getElementById('center');
center.appendChild(img)