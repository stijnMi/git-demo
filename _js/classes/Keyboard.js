export default class Keyboard {
  constructor() {
    this.keys = {};
    window.addEventListener('keydown', event => this.keydownHandler(event));
    window.addEventListener('keyup', event => this.keyupHandler(event));
    //bind key codes
    Keyboard.LEFT = 37;
    Keyboard.RIGHT = 39;
    Keyboard.SPACE = 32;
  }
  keydownHandler(event) {
    // console.log(event.keyCode);
    this.keys[event.keyCode] = true;
  }
  keyupHandler(event) {
    delete this.keys[event.keyCode];
  }
  isDown(keyCode) {
    return this.keys[keyCode];
  }
}