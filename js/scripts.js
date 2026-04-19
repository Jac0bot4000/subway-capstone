document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollSmoother);

    let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        smoothTouch: 0.1,
        effects: true
    });

    gsap.to('#rock1', {
      rotate: 180,
      scrollTrigger: {
        trigger: '#rock1', 
        start: 'top bottom',
        markers: true
      }
    })


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
      const deg = Math.floor((Math.random() * 26) - 13);
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


// Scroll lock
window.addEventListener('load', () => {
    const body = document.body;
    const canal = document.getElementsByClassName('canal')[0];

    body.classList.add('scroll-lock');

    setTimeout(() => {
        body.classList.remove('scroll-lock');
        
        body.classList.add('intro-complete');

        gsap.to(window, {duration: 2, scrollTo: ".canal", ease: "power2.inOut"});

    }, 9000);
});