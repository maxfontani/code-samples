import React from "react";
import { Portal } from "~components";
import { Effect } from "./utils";
import { debounce } from "~assets/helpers";
import { DEBOUNCE, FPS } from "./constants";
import "./matrix-rain.scss";

const SECOND = 1000;

export class MatrixRain extends React.Component {
  constructor(props) {
    super(props);
    this.nextFrame = SECOND / (this.props.fps ?? FPS);
    this.ref = React.createRef();
    this.effect = null;
  }

  resizeCanvas = () => {
    if (this.ref.current && this.effect) {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      this.ref.current.width = newWidth;
      this.ref.current.height = newHeight;
      this.effect.resize(newWidth, newHeight);
    }
  };

  debouncedResizeCanvas = debounce(this.resizeCanvas, DEBOUNCE);

  componentDidMount() {
    const canvas = this.ref.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const fontSize = this.props.fontSize ?? 14;
      const boundAnimate = animate.bind(this);
      let timer = 0;
      let lastTime = 0;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      this.effect = new Effect(canvas.width, canvas.height, fontSize);

      boundAnimate(0);

      function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        if (timer > this.nextFrame) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#0aff0a";
          ctx.font = fontSize + "px monospace";
          ctx.textAlign = "center";
          this.effect.symbols.forEach((symbol) => symbol.draw(ctx));
          timer = 0;
        } else {
          timer += deltaTime;
        }

        requestAnimationFrame(boundAnimate);
      }
    }

    window.addEventListener("resize", this.debouncedResizeCanvas);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedResizeCanvas);
  }

  render() {
    return (
      <Portal>
        <canvas
          id="matrix-canvas"
          ref={this.ref}
          style={{ opacity: this.props.opacity ?? 1 }}
        ></canvas>
      </Portal>
    );
  }
}
