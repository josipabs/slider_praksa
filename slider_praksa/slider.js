var tl = gsap.timeline({ defaults:{opacity:0, ease:"back"}});
function init() {
    tl.from("body", {autoAlpha:0}) 
    .from("h1", {x:80, duration:1})
    .from(".side p", {y:80, duration:1}, "<")
    .from(".slide", {scale:0, transformOrigin:"50% 50%", stagger:0.1}, "-=0.5")
    .from(".lijevo, .desno", {scale:0, transformOrigin:"50% 50%", stagger:0.2, duration:0.8}, "-=0.5")
}

window.addEventListener("load", function(event) { 
  init();
});

/* ######## GSAP slide animation on buttons
########### */

var slideDelay = 1.5;
var slideDuration = 0.3;
var snapX;

var slides = document.querySelectorAll(".slide");
var prevButton = document.querySelector(".lijevo");
var nextButton = document.querySelector(".desno");
var progressWrap = gsap.utils.wrap(0, 1);

var numSlides = slides.length;

gsap.set(slides, {
  xPercent: i => i * 0
});

var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
var timer = gsap.delayedCall(slideDelay);

var animation = gsap.to(slides, {
  xPercent: "+=" + (numSlides * 100),
  duration: 1,
  ease: "none",
  paused: true,
  repeat: -1,
  /*modifiers: {
    xPercent: wrap
  }*/
});

var proxy = document.createElement("div");
var slideAnimation = gsap.to({}, {});
var slideWidth = 0;
var wrapWidth = 0;
resize();

window.addEventListener("resize", resize);

prevButton.addEventListener("click", function() {
  animateSlides(-1);
});

nextButton.addEventListener("click", function() {
  animateSlides(1);
});

function animateSlides(direction) {

  timer.restart(true);
  slideAnimation.kill();

  var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

  slideAnimation = gsap.to(proxy, {
    x: x,
    duration: slideDuration,
    onUpdate: updateProgress
  });  
}

function updateProgress() { 
  animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
}

function resize() {

  var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;

  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;
  snapX = gsap.utils.snap(slideWidth);

  gsap.set(proxy, {
    x: norm * wrapWidth
  });

  animateSlides(0);
  slideAnimation.progress(1);
}
