class Rect {
    constructor(x, y, width, height, color = "green") {
        this.x1 = x;
        this.y1 = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    get y2() {
        return this.y1 + this.height;
    }

    get x2() {
        return this.x1 + this.width;
    }

    update() {
        //this.move(0.3,-0.3)
    }

    move(x, y) {
        this.x1 += x;
        this.y1 += y;
    }

    isIntersected(rect) {
        return !(this.y1 > rect.y2
            || this.y2 < rect.y1
            || this.x2 < rect.x1
            || this.x1 > rect.x2);
    }

    IntersectorHandler(rect) {
        if (rect !== this && this.isIntersected(rect)) {
            this.color = 'red';
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
    a1.IntersectorHandler(b1);

    let a2 = new Rect(10, 10, 20, 20, "blue");
    let b2 = new Rect(15, 15, 10, 10);
    a2.IntersectorHandler(b2);

    let a3 = new Rect(10, 10, 20, 20, "blue");
    let b3 = new Rect(15, 15, 20, 20);
    a3.IntersectorHandler(b3);

    let a4 = new Rect(10, 10, 20, 20, "blue");
    let b4 = new Rect(35, 35, 20, 20);
    a4.IntersectorHandler(b4);

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