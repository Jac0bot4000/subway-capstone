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