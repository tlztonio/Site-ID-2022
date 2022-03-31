
import './style.scss'
import Experience from './Experience/Experience' //general thing 

const experience = new Experience(document.querySelector('canvas.webgl'))

// document.addEventListener('touchstart', function (event) {
//     this.allowUp = (this.scrollTop > 0);
//     this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
//     this.slideBeginY = event.pageY;
// });

// document.addEventListener('touchmove', function (event) {
//     var up = (event.pageY > this.slideBeginY);
//     var down = (event.pageY < this.slideBeginY);
//     this.slideBeginY = event.pageY;
//     if ((up && this.allowUp) || (down && this.allowDown)) {
//         event.stopPropagation();
//     }
//     else {
//         event.preventDefault();
//     }
// });

// import { gsap } from 'gsap'
// import { ScrollToPlugin } from "gsap/ScrollToPlugin"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

// /**
//  * Smooth Scroll
//  */
// let container = document.querySelector(".atelier2")
// let viewport = document.querySelector("#viewport")

// let height
// function setHeight() { //retouch
//     height = container.clientHeight
//     viewport.style.height = height + "px"
//     document.body.style.height = height + "px"
// }
// ScrollTrigger.addEventListener("refreshInit", setHeight)

// // smooth scrolling container
// gsap.to(container, {
//     y: () => -(height - document.documentElement.clientHeight),
//     ease: "none",
//     scrollTrigger: {
//         trigger: viewport,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1,
//         invalidateOnRefresh: true
//     }
// })