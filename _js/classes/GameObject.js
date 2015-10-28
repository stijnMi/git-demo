import Vector from './Vector';

export default class GameObject {
  constructor(x, y, image) {
    this.location = new Vector(x, y);
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.image = image;
    this.size = this.image.height;
    this.frameRate = 60;
    this.frameNr = 0;
    this.localFrameNr = 0;
    this.numFrames = 1;
  }
  calculateDistance(otherObject){
    let distance = Vector.sub(otherObject.location, this.location).mag();
    //houdt nog geen rekening met grootte element , dus de helft ervan nog aftrekken?? midden
    distance -= this.size / 2;
    distance -= otherObject.size / 2;
    return distance;
  }
  collidesWith(otherObject){
    // let distance = this.calculateDistance(otherObject);
    // if (distance <= 0) {
    //   return true;
    // } else {
    //   return false;
    // }

    return (this.calculateDistance(otherObject) <= 0);
  }
  applyForce(force) {
    this.acceleration.add(force);
  }
  update() {
    this.frameNr++;
    this.localFrameNr = Math.floor(this.frameNr / (60 / this.frameRate));
    this.localFrameNr = this.localFrameNr % this.numFrames;

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    this.acceleration.mult(0);
    this.velocity.mult(0.95);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.drawImage(
      this.image,
      this.localFrameNr * this.size, 0, this.size, this.size,
      -this.size / 2, -this.size / 2, this.size, this.size
    );
    ctx.restore();
  }
}