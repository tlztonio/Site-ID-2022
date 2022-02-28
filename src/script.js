
import './style.scss'
import Experience from './Experience/Experience' //general thing 

const experience = new Experience(document.querySelector('canvas.webgl'))

var content = document.getElementsById('scrollDiv');
content.addEventListener('touchstart', function (event) {
    this.allowUp = (this.scrollTop > 0);
    this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
    this.slideBeginY = event.pageY;
});

content.addEventListener('touchmove', function (event) {
    var up = (event.pageY > this.slideBeginY);
    var down = (event.pageY < this.slideBeginY);
    this.slideBeginY = event.pageY;
    if ((up && this.allowUp) || (down && this.allowDown)) {
        event.stopPropagation();
    }
    else {
        event.preventDefault();
    }
});