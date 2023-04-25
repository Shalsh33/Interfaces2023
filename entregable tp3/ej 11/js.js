const card = document.querySelector('.card');

function desfocus() {
  card.style.transform = 'rotateY(0) rotateX(0)';
}

card.addEventListener('mousemove', e =>{
    let transformX = 30 - (30 * e.offsetY/100);
    let transformY = - 30 + (30 * e.offsetX/150);
    card.style.transform = `rotateY(${transformY}deg) rotateX(${transformX}deg)`
});

card.addEventListener('mouseleave', desfocus);