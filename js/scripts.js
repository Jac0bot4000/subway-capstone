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

document.querySelectorAll('figure').forEach(el => {
  // 1. Randomize rotation
  const deg = Math.floor((Math.random() * 51) - 25);
  const rad = Math.abs(deg) * (Math.PI / 180);
  
  // 2. Get current dimensions
  const w = el.offsetWidth;
  const h = el.offsetHeight;

  // 3. Calculate exactly how much taller the box became
  const newH = (w * Math.sin(rad)) + (h * Math.cos(rad));
  const totalExtra = newH - h;
  
  // 4. Apply styles (half the extra space to top, half to bottom)
  el.style.transform = `rotate(${deg}deg)`;
  el.style.setProperty('--extra-space', `${totalExtra / 2}px`);
});