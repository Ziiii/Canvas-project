class Rect {
    constructor(x,y,width,height,color="green"){
        this.x1 = x;
        this.y1 = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    get y2(){
        return this.y1 + this.height;
    }

    get x2(){
        return this.x1 + this.width;
    }

    update(){
        this.move(0.3,-0.3)
    }

    move(x,y){
        this.x1+=x;
        this.y1+=y;
    }

}

(function(){
    console.log("Rect tests");

    let x1 = 10;
    let y1 = 20;
    let width = 30;
    let height = 40;
    let x2 = x1 + width;
    let y2 = y1 + height;

    let r1 = new Rect(10,20,30,40);
    if(r1.x1 === x1 && r1.x2 === x2){
        console.log('x good')
    }
    else {
        console.log('x fail')
    }

    if(r1.y1 === y1 && r1.y2 === y2){
        console.log('y good')
    }
    else {
        console.log('y fail')
    }

    if(r1.width === width && r1.height === height){
        console.log('sizes good')
    }
    else {
        console.log('sizes fail')
    }
})();