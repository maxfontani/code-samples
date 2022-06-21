import { SYMBOLS } from "./constants";

export class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.x = x;
    this.y = y;
    this.canvasHeight = canvasHeight;
    this.fontSize = fontSize;
    this.text = "";
  }

  draw(context) {
    const curX = this.x * this.fontSize;
    const curY = this.y * this.fontSize;

    this.text = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    context.fillText(this.text, curX, curY);

    if (curY > this.canvasHeight && Math.random() > 0.99) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}
