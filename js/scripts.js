gsap.registerPlugin(ScrollTrigger);

let content = document.querySelector(".scroll-content");

gsap.to(content, {
  x: () => -(content.scrollWidth - window.innerWidth), // Move left by the width of content
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 1, // Connects scroll position to animation progress
    pin: true, // Optional: GSAP can handle the pinning for you
    invalidateOnRefresh: true, // Fixes issues on window resize
  }
});