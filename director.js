class Director {
    constructor(scene, rects, updateRate = 50) {
        this.updateRate = updateRate;
        this.scene = scene;
        this.rects = rects;
        this.drag = false;
        this.update = this.update.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseClickHandler = this.mouseClickHandler.bind(this);
    }

    update() {
        this.checkIntersections(this.rects);
        this.checkConnections(this.rects);
        this.scene.clearScene();
        this.scene.drawRects(this.rects)
    }

    checkIntersections(rects) {
        rects.map((rectA) => {
            rectA.IntersectorHandler(rects);
        })
    }

    checkConnections(rects){
        rects.map((rectA)=>{
            rectA.nearRectsHandler(rects);
        })
    }

    start() {
        this.scene.canvas.addEventListener('mousemove', this.mouseMoveHandler);
        this.scene.canvas.addEventListener('click', this.mouseClickHandler);
        this.timerId = setInterval(this.update, this.updateRate);
    }

    end() {
        clearInterval(this.timerId);
    }

    mouseMoveHandler(e) {
        this.rects.map(rect => rect.mouseMoveHandler(e))
    }

    mouseClickHandler(e) {
        if (!this.drag) {
            this.drag = true;
            this.rects.find(rect => rect.mouseDragHandler(e));
        }
        else{
            this.rects.map(rect => rect.mouseDropHandler(e));
            this.drag = false;
        }
    }


    test() {
        let rects = [];
        rects.push(new Rect(10, 10, 10, 10));
        rects.push(new Rect(30, 10, 10, 10));
        rects.push(new Rect(10, 30, 10, 10, "red"));
        this.drawRects(rects);
    }

}
