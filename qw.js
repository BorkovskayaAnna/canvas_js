var cv = document.getElementById('canvas');
// source: http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
var mouse = {
    position : {x:0, y:0},
    down : false,
    downedPos :{x:0, y:0},
    upedPos :{x:0, y:0},
}
mouse.getPosition = function(element, evt) {
    var rect = element.getBoundingClientRect(),
        root = document.documentElement;

    this.position.x = evt.clientX - rect.left - root.scrollLeft;
    this.position.y = evt.clientY - rect.top - root.scrollTop;

    console.log(this.position.x, this.position.y)
    return this.position;
}

cv.addEventListener('mousedown', function(e){
    ms = mouse.getPosition(this, e);
    // copy the object value without the reference
    mouse.downedPos = clone(ms);
    mouse.down = true;

    console.log(mouse.downedPos)
});

cv.addEventListener('mousemove', function(e){
    ms = mouse.getPosition(this, e);
    if(mouse.down){
        mouse.upedPos = clone(ms);

        console.log(mouse.upedPos)
    }
});

cv.addEventListener('mouseup', function(e){
    mouse.down = false;
});