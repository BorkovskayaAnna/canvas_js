const canvas = document.querySelector('#canvas')
if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    canvas.width = document.querySelector('.container').clientWidth - 40;
    canvas.height = document.querySelector('.container').clientHeight - 40;

    const canvasArea = canvas.getBoundingClientRect();
    const offsetX = canvasArea.left;  //offset canvas from top window
    const offsetY = canvasArea.top;   // it's always 40 from top and left
    const cWidth = canvas.width;      // it's also static value
    const cHeight = canvas.height;    // of width and height of the canvas

    let isDrag = false;
    let startX;   // position of current element
    let startY;   //  when you move element variable take the current value
    let mouseX = 0;
    let mouseY = 0;
    let rectsArr = [];

// listen for mouse events
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;




    function Rect(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.downedPos = {x:0, y:0};
        this.upedPos = {x:0, y:0};

        this.isOverlapping = false
    }

    rectsArr.push(new Rect(1, 1, 100, 50));
    rectsArr.push(new Rect(1, 90, 150, 60));
    rectsArr.push(new Rect(1, 190, 200, 80));
    rectsArr.push(new Rect(1, 300, 100, 50));

    function drawRect() {
        ctx.clearRect(0, 0, cWidth, cHeight);
        Rect(0, 0, cWidth, cHeight)
        for (let i in rectsArr) {
            let current = rectsArr[i];
            ctx.strokeRect(current.x, current.y, current.w, current.h);
            ctx.fillStyle = current.isOverlapping ? "red" : 'rgb(255 151 151 / 65%)';
            ctx.fillRect(current.x, current.y, current.w, current.h);
        }
    }

    drawRect();

    /*let mouse = {
        position : {x:0, y:0},
        down : false,
        downedPos :{x:0, y:0},
        upedPos :{x:0, y:0},
    }*/


   /* mouse.getPosition = function(element, e) {

        this.position.x = e.clientX - offsetX
        this.position.y = e.clientY - offsetY
        //console.log('get pos ' + this.position.x,this.position.y )
        return this.position;
    }*/
 /*   Rect.getPosition = function(element, e) {

        this.x = e.clientX - offsetX
        this.y = e.clientY - offsetY
        // console.log('initial pos ' + this.x,this.y ) //should be 0 0
        return this;
    }*/

   /* function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        const copy = obj.constructor();
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }*/

// handle mousedown events
    function mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();


        // let rectPos = Rect.getPosition(this, e);

        //Rect.downedPos = clone(rectPos);

        // current mouse pos
        mouseX = e.clientX - offsetX
        mouseY = e.clientY - offsetY

        isDrag = false;

        for (let i = 0; i < rectsArr.length; i++) {
            let current = rectsArr[i];
            let rectW = current.x + current.w;
            let rectH = current.y + current.h;

            if (mouseX > current.x && mouseX < rectW &&
                mouseY > current.y && mouseY < rectH) {
                isDrag = true;
                // console.log('moose down ' + Rect.downedPos.x, Rect.downedPos.y)
            }
        }
        drawRect()


        startX = mouseX;
        startY = mouseY;
    }


// handle mouse moves
    function mouseMove(e) {
        if (isDrag) {

            e.preventDefault();
            e.stopPropagation();

            //let rectPos = Rect.getPosition(this, e);

            //Rect.downedPos = clone(rectPos);
            /*if(mouse.down){
                mouse.upedPos = clone(ms);
*/
                //console.log('mouse move ' + Rect.downedPos.x,Rect.downedPos.y)
            //}

            mouseX = e.clientX - offsetX;
            mouseY = e.clientY - offsetY;

            // check the distance value the element moved
            let distX = mouseX - startX;
            let distY = mouseY - startY;

            for (let i in rectsArr) {
                let current = rectsArr[i];

                let rectW = current.x + current.w;
                let rectH = current.y + current.h;

                if (mouseX > current.x && mouseX < rectW &&
                    mouseY > current.y && mouseY < rectH) {
                    current.x += distX;
                    current.y += distY;
                }
            }

            detectOverlap();
            drawRect();

            startX = mouseX;
            startY = mouseY;
        }
    }

    // handle mouseup events
    function mouseUp(e) {
        isDrag = false;
        //mouse.down = false;



        /*let rectPos = Rect.getPosition(this, e);

        Rect.upedPos = clone(rectPos);*/

        //console.log('mouseUp ' + Rect.downedPos.x,Rect.downedPos.y)

        /*if(Rect.downedPos){
            Rect.downedPos = clone(rectPos);
            console.log('mouse up ' + Rect.downedPos.x, Rect.downedPos.y);
        }*/


        /*detectOverlap();
        drawRect();*/


        /*drawRect();*/
    }

    function detectOverlap(e) {
        let obj1;
        let obj2;

        //let ms = mouse.getPosition(this);

        for (let i = 0; i < rectsArr.length; i++) {
            rectsArr[i].isOverlapping = false;
        }

        for (let i = 0; i < rectsArr.length; i++) {
            obj1 = rectsArr[i];
            for (let j = i + 1; j < rectsArr.length; j++) {
                obj2 = rectsArr[j];

                if (rectOverlapping(obj1.x, obj1.y, obj1.w, obj1.h, obj2.x, obj2.y, obj2.w, obj2.h)) {
                    obj1.isOverlapping = true;
                    obj2.isOverlapping = true;
                    // console.log(Rect.upedPos);
                    // console.log(Rect.upedPos.x)
                    // console.log('mouse up ' + Rect.downedPos.x, Rect.downedPos.y);
                    // console.log('mouse up ' + Rect.upedPos.x, Rect.upedPos.y);
                    /*obj1.x = Rect.downedPos.x;
                    obj1.y = Rect.downedPos.y;*/
                }

                if(rectGravity(obj1.x, obj1.y, obj1.w, obj1.h, obj2.x, obj2.y, obj2.w, obj2.h) ) {
                     //console.log('object is closer then 9 pixels');
                    //return obj1.x = obj2.x + obj2.w
                }

                //console.log(Rect.upedPos)
            }
        }
        return true
    }

    function rectOverlapping(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2);
    }
    function rectGravity(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x2 - (w1 + x1) >= 9 || x1 - (w2 + x2) >= 9 || y2 - (h1 + y1) >= 9 || y1 - (h2 + y2) >= 9);
    }
}

