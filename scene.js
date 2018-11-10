class Scene {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
    }

    drawRect(rect){
        this.context.fillStyle = rect.color;
        this.context.fillRect(rect.x1,rect.y1,rect.width,rect.height);
    }

    drawRects(rects){
        for(let rect of rects){
            this.drawRect(rect);
        }
    }

    clearScene(){
        this.context.clearRect(0,0,1000,600)
    }
}
