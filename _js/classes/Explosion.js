import GameObject from './GameObject';

export default class Explosion extends GameObject {
  constructor(x, y, image) {
    super(x, y, image);
    this.frameRate = 10;  //lager voor explosie
    this.numFrames = 6;
  }
	update() {
		super.update();
		this.localFrameNr = Math.floor(this.frameNr / (60 /
		this.frameRate));
		if(this.localFrameNr >= this.numFrames) {
			this.killed = true; 
		}
	}
}