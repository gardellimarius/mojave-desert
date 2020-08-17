import './scss/style.scss';
import { gsap, ScrollTrigger, TimelineMax } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
//ScrollTrigger.saveStyles(".move, .line, .fade-fromMarginRight, .fade-fromMarginLeft");
ScrollTrigger.matchMedia({

  // desktop
  "(min-width: 800px)": function() {
    // setup animations and ScrollTriggers for screens 800px wide or greater (desktop) here...
    // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
  },

  // mobile
  "(max-width: 799px)": function() {
    // The ScrollTriggers created inside these functions are segregated and get
    // reverted/killed when the media query doesn't match anymore.

  },

  // all
  "all": function() {
    // ScrollTriggers created here aren't associated with a particular media query,
    // so they persist.
    let speed = 100;
    let scene1 = gsap.timeline({defaults: {ease: "power1.in"}});
    ScrollTrigger.create({
      id: '.move',
      animation: scene1,
      trigger: ".wrapper",
      start: 'top top',
      markers: false,
      scrub: true
    });

    gsap.utils.toArray(".move").forEach(elem => {
      scene1.to(elem, {y: elem.dataset.speed * speed}, 0)
    });


    gsap.utils.toArray(".fade").forEach(elem => {
      gsap.from(elem, {
        autoAlpha: 0,
        y: elem.dataset.speed * speed,
        scrollTrigger: {
          id: 'fade',
          trigger: elem,
          end: "top top",
          start: 'top 70%',
          markers: false,
          scrub: true
        }
      });
    });


    gsap.utils.toArray(".fade-mobile").forEach(elem => {
      gsap.from(elem, {
        autoAlpha: 0,
        y: elem.dataset.speed * speed,
        scrollTrigger: {
          id: 'fade',
          trigger: elem,
          end: "top top",
          start: 'top 70%',
          markers: false,
          scrub: true
        }
      });
    });


    gsap.utils.toArray(".line").forEach(elem => {
      gsap.from(elem, {
        scaleY: 0,
        transformOrigin: 'top center',
        scrollTrigger: {
          id: 'line',
          trigger: elem,
          start: 'top 90%',
          end: "top top",
          scrub: true,
          markers: false
        }
      });
    });


    let speedfadefromMargin = 10;
    gsap.utils.toArray(".fade-fromMargin").forEach(elem => {
      gsap.from(elem, {
        autoAlpha: 0,
        x: elem.dataset.speed * speedfadefromMargin,
        scrollTrigger: {
          id: 'fade-fromMargin',
          trigger: elem,
          end: 'top 40%',
          start: 'top 90%',
          markers: false,
          scrub: true
        }
      });
    });

    gsap.utils.toArray(".fade-fromMarginLeft").forEach(elem => {
      gsap.from(elem, {
        autoAlpha: 0,
        //y: elem.dataset.speed * speed,
        x: - elem.dataset.speed * speedfadefromMargin,
        scrollTrigger: {
          id: 'fade-fromMargin',
          trigger: elem,
          end: 'top 40%',
          start: 'top 90%',
          markers: false,
          scrub: true
        }
      });
    });

    gsap.utils.toArray(".fade-fromMarginRight").forEach(elem => {
      gsap.from(elem, {
        autoAlpha: 0,
        //y: elem.dataset.speed * speed,
        x: elem.dataset.speed * speedfadefromMargin,
        scrollTrigger: {
          id: 'fade-fromMargin',
          trigger: elem,
          end: 'top 40%',
          start: 'top 90%',
          markers: false,
          scrub: true
        }
      });
    });

    gsap.utils.toArray(".fade-no-scrub").forEach(elem => {
      gsap.from(elem, {
        autoAlpha: 0,
        y: elem.dataset.speed * speed,
        scrollTrigger: {
          id: 'fade',
          trigger: elem,
          end: "top top",
          start: 'top 70%',
          markers: false,
          scrub: false
        }
      });
    });
  }
});
