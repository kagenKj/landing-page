const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 120;

function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
}

const canvas = document.getElementById("orb-canvas");

const bubbles = [];


class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
        this.getCanvasSize();
        this.init();
    }

    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }

    init() {
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.size = (Math.random() * 5 + 1).toFixed(2);
        this.alpha = (((Math.random() * 6) + 5) / 10).toFixed(3);
        this.translateX = (Math.random() * this.canvasWidth).toFixed(2);
        this.translateY = (Math.random() * this.canvasHeight).toFixed(2);
        this.velocity = generateDecimalBetween(20, 40);
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }

    move() {
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
}
class CanvasBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dpr = window.devicePixelRatio; 

        this.canvasSize();
        this.generateBubbles();
    }

    canvasSize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }

    generateBubbles() {
        this.bubblesList = [];
        for (let i = 0; i < BUBBLE_DENSITY; i++) {
            const bubble = new Bubble(this.canvas);
            this.bubblesList.push(bubble);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bubblesList.forEach(bubble => {
            bubble.move();
            this.ctx.save();
            this.ctx.translate(bubble.translateX, bubble.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fillStyle = `rgba(${bubble.color}, ${bubble.alpha})`;
            this.ctx.fill();
            this.ctx.restore();
        });
        requestAnimationFrame(this.animate.bind(this));
    }

    start() {
        this.animate();
    }
}

const canvasBackground = new CanvasBackground(canvas);

window.addEventListener('resize', () => {
    canvasBackground.canvasSize();
});

canvasBackground.start();
