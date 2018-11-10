class Scene {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
    }

    test1(){
        let rects = [];
        rects.push(new Rect(10,10,10,10));
        rects.push(new Rect(30,10,10,10));
        rects.push(new Rect(10,30,10,10));
        this.drawRects(rects);
    }

    drawRect(rect){
        this.context.fillRect(rect.x1,rect.y1,rect.width,rect.height);
    }

    drawRects(rects){
        for(let rect of rects){
            this.drawRect(rect);
        }
    }
}
