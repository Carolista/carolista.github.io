window.addEventListener('load', () => {
  
  const sequentials = document.getElementsByClassName('sequential');

  [...sequentials].forEach((el, idx) => {
    setTimeout(() => {
      el.style.animation = "fade-and-translate-in 1.5s forwards";
    }, idx * 800);
  }); 

});