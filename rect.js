class Rect {
    constructor(x, y, width, height, color = "green") {
        this.x1 = x;
        this.y1 = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.drag = false;
        this.collision = false;
        this.connected = []
    }

    get y2() {
        return this.y1 + this.height;
    }

    set y2(value) {
        this.y1 = value - this.height;
    }

    get x2() {
        return this.x1 + this.width;
    }

    set x2(value) {
        this.x1 = value - this.width;
    }

    isIntersected(rect) {
        if (rect === this) {
            return false;
        }

        return Rect.isIntersected(this, rect)
    }

    static isIntersected(rectA, rectB) {
        return !(rectA.y1 >= rectB.y2
            || rectA.y2 <= rectB.y1
            || rectA.x2 <= rectB.x1
            || rectA.x1 >= rectB.x2);
    }

    isDotInRect(x, y) {
        return (this.x1 < x && this.x2 > x && this.y1 < y && this.y2 > y)
    }

    isDotNearRect(x, y, hitRange = 10) {
        let hitRect = {x1: x - hitRange, y1: y - hitRange, x2: x + hitRange, y2: y + hitRange};
        return Rect.isIntersected(hitRect,this);
    }

    setPositionToRectEdge(rect) {
        if (this.y2 < rect.y1) {
            this.y2 = rect.y1;
            return;
        }

        if (this.y1 > rect.y2) {
            this.y1 = rect.y2;
            return;
        }

        if (this.x2 < rect.x1) {
            this.x2 = rect.x1;
        }

        if (this.x1 > rect.x2) {
            this.x1 = rect.x2;
        }
    }

    nearRectsHandler(rects) {
        if (this.drag) {
            let nearRect = rects.find(rect => this.isNear(rect));
            if (nearRect) {
                this.setPositionToRectEdge(nearRect);
            }
        }
    }

    isNear(rect) {
        if (rect === this) {
            return false;
        }

        let biggerRect = this.getBiggerRect();
        return Rect.isIntersected(biggerRect, rect);
    }

    getBiggerRect(rate = 10) {
        return {
            x1: this.x1 - rate,
            x2: this.x2 + rate,
            y1: this.y1 - rate,
            y2: this.y2 + rate
        }
    }

    IntersectorHandler(rects) {
        if (rects.some(rect => this.isIntersected(rect))) {
            this.collision = true;
            this.color = 'red';
        }
        else {
            this.collision = false;
            this.color = 'green';
        }
    }

    mouseMoveHandler(e) {
        if (this.drag) {
            let clientX = e.clientX - mouse_correction_x;
            let clientY = e.clientY - mouse_correction_y;
            this.centeringToDot(clientX, clientY);
        }
    }

    centeringToDot(x, y) {
        this.x1 = x - this.width / 2;
        this.y1 = y - this.height / 2;
    }

    mouseDragHandler(e) {
        let clientX = e.clientX - mouse_correction_x;
        let clientY = e.clientY - mouse_correction_y;
        if (this.isDotNearRect(clientX, clientY)) {
            this.startX = this.x1;
            this.startY = this.y1;
            this.drag = true;
            this.centeringToDot(clientX, clientY);
            return true;
        }
        return false;
    }

    mouseDropHandler(e) {
        if (this.drag) {
            if (this.collision) {
                this.x1 = this.startX;
                this.y1 = this.startY;
            }
            this.drag = false;
        }
    }

}

(function () {
    console.log("Rect tests");

    let x1 = 10;
    let y1 = 20;
    let width = 30;
    let height = 40;
    let x2 = x1 + width;
    let y2 = y1 + height;

    let r1 = new Rect(10, 20, 30, 40);
    if (r1.x1 === x1 && r1.x2 === x2) {
        console.log('x good')
    }
    else {
        console.log('x fail')
    }

    if (r1.y1 === y1 && r1.y2 === y2) {
        console.log('y good')
    }
    else {
        console.log('y fail')
    }

    if (r1.width === width && r1.height === height) {
        console.log('sizes good')
    }
    else {
        console.log('sizes fail')
    }

    console.log("Intersected tests");

    let a1 = new Rect(10, 10, 10, 30, "blue");
    let b1 = new Rect(5, 20, 25, 10);
    a1.IntersectorHandler([b1]);

    let a2 = new Rect(10, 10, 20, 20, "blue");
    let b2 = new Rect(15, 15, 10, 10);
    a2.IntersectorHandler([b2]);

    let a3 = new Rect(10, 10, 20, 20, "blue");
    let b3 = new Rect(15, 15, 20, 20);
    a3.IntersectorHandler([b3]);

    let a4 = new Rect(10, 10, 20, 20, "blue");
    let b4 = new Rect(35, 35, 20, 20);
    a4.IntersectorHandler([b4]);

    if (a1.color === "red"
        && a2.color === "red"
        && a3.color === "red"
        && a4.color !== "red") {
        console.log("Intersected tests success!");
    }
    else {
        console.log("Intersected tests fail");
    }


})();