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

  let parallaxObjects = gsap.utils.toArray('.parallax-object');

  parallaxObjects.forEach((object) => {
    const randomRotate = Math.random() > 0.5
      ? gsap.utils.random(-270, -90)
      : gsap.utils.random(90, 270);

    gsap.to(object, {
          rotate: randomRotate,
          scrollTrigger: {
            trigger: object, 
            start: 'top bottom',
            end: 'bottom top',
            markers: false,
            scrub: true
          }
      });
  });

  gsap.from(".canalboat-wrap-text", {
    x: "100vw",
    scrollTrigger: {
      trigger: ".canalboat-wrap-text",
      start: 'top bottom',
      end: 'center center',
      scrub: true
    }
  });

  gsap.from(".subway-wrap-text", {
    x: "-50vw",
    scrollTrigger: {
      trigger: ".subway-wrap-text",
      start: 'top bottom',
      end: 'center center',
      scrub: true
    }
  });

  let contentImgs = gsap.utils.toArray("figure");

  contentImgs.forEach((image) => {
    gsap.from(image, {
      rotate: 0,
      scale: 1.5,
      scrollTrigger: {
        trigger: image,
        start: 'top bottom',
        end: 'bottom center',
        scrub: true,
        once: true
      }
    });
  });

  const lighterFrames = gsap.utils.toArray("#lighterFrames .frame");

  gsap.set(lighterFrames, { opacity: 0});
  gsap.set(lighterFrames[0], { opacity: 1});

  const lighterAnimation = gsap.timeline({ repeat: -1 });

  lighterFrames.forEach((frame, i) => {
    lighterAnimation.set(frame, {opacity: 1}, i * 0.2).set(frame, {opacity: 0}, (i + 1) * 0.2);
  });

    gsap.from("#lighterFrames", {
    rotate: 0,
      scrollTrigger: {
        trigger: "#lighterFrames",
        start: 'top bottom',
        end: 'bottom center',
        scrub: true,
      }
  });

  gsap.fromTo('#subway-car-side', {
    xPercent: -125,
    left: 0
    }, {
    xPercent: 125,
    left: "100vw",
    scrollTrigger: {
      trigger: "#subway-car-side",
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
    
  });

  gsap.to('#stop-light', {
    rotate: -5,
    scrollTrigger: {
      trigger: "#stop-light",
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });

  const smokeFrames = gsap.utils.toArray("#smokeFrames .frame");

  gsap.set(smokeFrames, { opacity: 0});
  gsap.set(smokeFrames[0], { opacity: 1});

  const smokeAnimation = gsap.timeline({ repeat: -1 });

  smokeFrames.forEach((frame, i) => {
    smokeAnimation.set(frame, {opacity: 1}, i * 0.3).set(frame, {opacity: 0}, (i + 1) * 0.3);
  });


  const rrxFrames = gsap.utils.toArray("#rrxFrames .frame");

  gsap.set(rrxFrames, { opacity: 0});
  gsap.set(rrxFrames[0], { opacity: 1});

  const rrxAnimation = gsap.timeline({ repeat: -1 });

  rrxFrames.forEach((frame, i) => {
    rrxAnimation.set(frame, {opacity: 1}, i * 0.75).set(frame, {opacity: 0}, (i + 1) * 0.75);
  });


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
// window.addEventListener('load', () => {
//     const body = document.body;
//     const canal = document.getElementsByClassName('canal')[0];

//     body.classList.add('scroll-lock');

//     setTimeout(() => {
//         body.classList.remove('scroll-lock');
        
//         body.classList.add('intro-complete');

//         gsap.to(window, {duration: 2, scrollTo: ".canal", ease: "power2.inOut"});

//     }, 8200);
// });