document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const content = document.querySelector(".scroll-content");
    const section = document.querySelector(".horizontal-section");

    if (content && section) {
        const getScrollAmount = () => -(content.scrollWidth - window.innerWidth);

        gsap.to(content, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${content.scrollWidth - window.innerWidth}`, 
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }
});

const mediaQuery = window.matchMedia('(min-width: 800px)');

function handleRotation(e) {
  document.querySelectorAll('figure').forEach(el => {
    if (e.matches) {
      const deg = Math.floor((Math.random() * 51) - 25);
      const rad = Math.abs(deg) * (Math.PI / 180);
      
      const w = el.offsetWidth;
      const h = el.offsetHeight;

      const newH = (w * Math.sin(rad)) + (h * Math.cos(rad));
      const totalExtra = newH - h;
      
      el.style.transform = `rotate(${deg}deg)`;
      el.style.setProperty('--extra-space', `${totalExtra / 2}px`);
    } else {
      el.style.transform = 'none';
      el.style.setProperty('--extra-space', '0px');
    }
  });
}

handleRotation(mediaQuery);

mediaQuery.addEventListener('change', handleRotation);



window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        document.body.style.overflow = 'visible';
        document.body.classList.add('intro-complete');
    }, 7000); 
});