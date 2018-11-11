class Director {
    constructor(scene, rects, updateRate = 100) {
        this.updateRate = updateRate;
        this.scene = scene;
        this.rects = rects;
        this.update = this.update.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }

    update() {
        this.checkIntersections(this.rects);
        this.scene.clearScene();
        this.scene.drawRects(this.rects)
    }

    checkIntersections(rects) {
        rects.map((rectA) => {
            rects.map((rectB) => {
                rectA.IntersectorHandler(rectB);
            })
        })
    }

    start() {
        this.scene.canvas.addEventListener('mousemove',this.mouseMoveHandler);
        this.timerId = setInterval(this.update, this.updateRate);
    }

    end() {
        clearInterval(this.timerId);
    }

    mouseMoveHandler(e){
        this.rects.map(rect=>rect.mouseMoveHandler(e))
    }

    test() {
        let rects = [];
        rects.push(new Rect(10, 10, 10, 10));
        rects.push(new Rect(30, 10, 10, 10));
        rects.push(new Rect(10, 30, 10, 10, "red"));
        this.drawRects(rects);
    }

}
