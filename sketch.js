let balls = [];
let circle;
let box;

function setup() {
    createCanvas(900, 600);

    circle = new Circle(width/2 + 200, height/2, 100);
    box = new Box(width/2 - 250, height/2 - 50, 100, 100);
}

function draw() {
    background(0)

    circle.run();
    box.run();
    
    for (let i = 0; i < balls.length; i++) {
        let gravity = createVector(0, 0.1);
        balls[i].applyForce(gravity);
        let friction = balls[i].velocity.copy();
        friction.mult(-1);
        friction.normalize();
        friction.mult(0.01);
        balls[i].applyForce(friction);
        balls[i].run();    
    }
    

}

function mouseDragged(){
    balls.push(new Ball(mouseX, mouseY));
}

class Box {
    constructor(x, y, w, h){
        this.location = new createVector(x, y);
        this.width = w;
        this.height = h;
    }

    run(){
        this.draw();
    }

    draw(){
        fill(100, 255, 100, 100);
        rect(this.location.x, this.location.y, this.width, this.height);
    }
}

class Circle {
    constructor(x, y, size){
        this.location = new createVector(x, y);
        this.size = size;
        this.radius = this.size / 2;
    }

    run(){
        this.draw();
    }

    draw(){
        fill(255, 100, 100, 100);
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }
}

class Ball {
    constructor(x, y){
        this.acceleration = new createVector(0, 0);
        this.velocity = new createVector(random(-3, 3), random(-3, 3));
        this.location = new createVector(x, y);
        this.size = random(10, 40);
        this.age = 255;
        this.Red = false;
        this.Green = false;
    }

    run(){
        this.draw();
        this.move();
        this.bounce();
        this.circleCollision(circle);
        this.boxCollision(box);
    }

    draw(){
        if (this.Red) {
            fill(255, 100, 100, 100);
        }
        else if (this.Green) {
            fill(100, 255, 100, 100);
        }
        else {
            fill(255, 255, 255, 100);
        }
        
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    move(){
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.limit(10);
    }

    bounce(){
        if ((this.location.x < 0) || (this.location.x > width)) {
            this.velocity.x *= -1
        }
        if ((this.location.y < 0) || (this.location.y > height)) {
            this.velocity.y *= -1
        }
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    circleCollision(collider){
        if (dist(this.location.x, this.location.y, 
            collider.location.x, collider.location.y) < collider.radius) {
            this.Red = true;
            this.Green = false;
        }
    }

    boxCollision(collider){
        if (dist(this.location.x, collider.location.x) < 0 &
            dist(this.location.x, collider.location.x + collider.width) < 0 &
            dist(this.location.y, collider.location.y) < 0 &
            dist(this.location.y, collider.location.y + collider.height) < 0)
        {
        }
        if (this.location.x > collider.location.x &
            this.location.x < collider.location.x + collider.width &
            this.location.y > collider.location.y &
            this.location.y < collider.location.y + collider.height)
        {
            this.Red = false;
            this.Green = true;
        }
    }
}