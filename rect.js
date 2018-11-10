class Rect {
    constructor(x,y,width,height){
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + height;
        this.y2 = y + width;
    }

    get width(){
        return this.y2 - this.y1;
    }

    get height(){
        return this.x2 - this.x1;
    }

}

(function(){
    console.log("Rect tests");

    let x1 = 10;
    let y1 = 20;
    let width = 30;
    let height = 40;
    let x2 = x1 + height;
    let y2 = y1 + width;

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