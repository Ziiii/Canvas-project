class Director {
    constructor(scene,rects,updateRate=100){
        this.updateRate = updateRate;
        this.scene = scene;
        this.rects = rects;
        this.update = this.update.bind(this);
    }

    update(){
        for(let rect of this.rects){
            rect.update();
        }
        this.scene.clearScene();
        this.scene.drawRects(this.rects)
    }

    start(){
        this.timerId = setInterval(this.update,this.updateRate);
    }

    end(){
        clearInterval(this.timerId);
    }

    test(){
        let rects = [];
        rects.push(new Rect(10,10,10,10));
        rects.push(new Rect(30,10,10,10));
        rects.push(new Rect(10,30,10,10,"red"));
        this.drawRects(rects);
    }

}
