document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const content = document.querySelector(".scroll-content");
    const section = document.querySelector(".horizontal-section");

    if (content && section) {
        gsap.to(content, {
            // Move the content to the left by its full width minus the screen width
            x: () => -(content.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,   // Smooth scrubbing
                pin: true,  // GSAP handles the sticky behavior
                anticipatePin: 1,
                invalidateOnRefresh: true, // Recalculates on window resize
            }
        });
    }
});