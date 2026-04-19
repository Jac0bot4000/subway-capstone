document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const content = document.querySelector(".scroll-content");
    const section = document.querySelector(".horizontal-section");

    if (content && section) {
        // 1. Calculate the horizontal distance to move
        const getScrollAmount = () => -(content.scrollWidth - window.innerWidth);

        // 2. Create the animation
        gsap.to(content, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                // This 'end' value tells GSAP exactly when to stop pinning
                // by making the vertical scroll distance match the image width
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
      // Screen is 800px or wider: Apply the math
      const deg = Math.floor((Math.random() * 51) - 25);
      const rad = Math.abs(deg) * (Math.PI / 180);
      
      const w = el.offsetWidth;
      const h = el.offsetHeight;

      const newH = (w * Math.sin(rad)) + (h * Math.cos(rad));
      const totalExtra = newH - h;
      
      el.style.transform = `rotate(${deg}deg)`;
      el.style.setProperty('--extra-space', `${totalExtra / 2}px`);
    } else {
      // Screen is narrower than 800px: Reset everything
      el.style.transform = 'none';
      el.style.setProperty('--extra-space', '0px');
    }
  });
}

// 1. Run on page load
handleRotation(mediaQuery);

// 2. Listen for the specific "cross-over" point (swapping from mobile to desktop)
mediaQuery.addEventListener('change', handleRotation);