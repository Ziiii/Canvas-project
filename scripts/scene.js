class Scene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.adjustSceneSize();
        this.adjustSceneSize = this.adjustSceneSize.bind(this);
        window.onresize = this.adjustSceneSize;
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

    adjustSceneSize() {
        this.canvas.height = window.innerHeight - correctionX;
        this.canvas.width = window.innerWidth - correctionY;
    }

    clearScene() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
