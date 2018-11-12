class Scene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.resize();
        this.resize = this.resize.bind(this);
        window.onresize = this.resize;
    }

    drawRect(rect) {
        this.context.fillStyle = rect.color;
        this.context.fillRect(rect.x1, rect.y1, rect.width, rect.height);
    }

    drawRects(rects) {
        for (let rect of rects) {
            this.drawRect(rect);
        }
    }

    resize() {
        this.canvas.height = window.screen.height;
        this.canvas.width = window.screen.width;
    }

    clearScene() {
        this.context.clearRect(0, 0, 1000, 600)
    }
}
