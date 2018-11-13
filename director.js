class Director {
    constructor(scene, rects, updateRate = updateRateDefault) {
        this.updateRate = updateRate;
        this.scene = scene;
        this.rects = rects;
        this.drag = false;
        this.update = this.update.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    update() {
        this.checkIntersections(this.rects);
        this.checkRectsConnections(this.rects);
        this.scene.clearScene();
        this.scene.drawRects(this.rects)
    }

    start() {
        this.scene.canvas.addEventListener('mousemove', this.mouseMoveHandler);
        this.scene.canvas.addEventListener('mousedown', this.mouseDownHandler);
        this.scene.canvas.addEventListener('mouseup', this.mouseUpHandler);
        this.timerId = setInterval(this.update, this.updateRate);
    }

    stop() {
        this.scene.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
        this.scene.canvas.removeEventListener('mousedown', this.mouseDownHandler);
        this.scene.canvas.removeEventListener('mouseup', this.mouseUpHandler);
        clearInterval(this.timerId);
    }

    checkIntersections(rects) {
        rects.map((rectA) => {
            rectA.intersectorHandler(rects);
        })
    }

    checkRectsConnections(rects) {
        rects.map((rectA) => {
            rectA.nearRectsHandler(rects);
        })
    }

    mouseMoveHandler(e) {
        this.rects.map(rect => rect.mouseMoveHandler(e))
    }

    mouseDownHandler(e) {
        if (!this.drag) {
            this.drag = true;
            this.rects.find(rect => rect.mouseDragHandler(e));
        }
    }

    mouseUpHandler(e) {
        if (this.drag) {
            this.rects.map(rect => rect.mouseDropHandler(e));
            this.drag = false;
        }
    }
}
