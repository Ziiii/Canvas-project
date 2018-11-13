class Rect {
    constructor(x, y, width, height, color = defaultRectColor) {
        this.x1 = x;
        this.y1 = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.normalColor = color;
        this.drag = false;
        this.collision = false;
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

    isDotNearRect(x, y, hitRange = mouseClickHitRange) {
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

    getBiggerRect(rate = connectingRectSize) {
        return {
            x1: this.x1 - rate,
            x2: this.x2 + rate,
            y1: this.y1 - rate,
            y2: this.y2 + rate
        }
    }

    intersectorHandler(rects) {
        if (rects.some(rect => this.isIntersected(rect))) {
            this.collision = true;
            this.color = collusionRectColor;
        }
        else {
            this.collision = false;
            this.color = this.normalColor;
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