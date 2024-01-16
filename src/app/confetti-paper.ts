// Assuming Vector2 is already defined in your code

import { colors } from "./constants";
import { Vector2 } from "./vector2";

export class ConfettiPaper {
    pos: Vector2;
    rotationSpeed: number;
    angle: number;
    rotation: number;
    cosA: number;
    size: number;
    oscillationSpeed: number;
    xSpeed: number;
    ySpeed: number;
    corners: Vector2[];
    time: number;
    frontColor: string;
    backColor: string;
    static bounds = new Vector2(0, 0);
    constructor(_x: number, _y: number) {
      this.pos = new Vector2(_x, _y);
      this.rotationSpeed = Math.random() * 600 + 800;
      this.angle = (Math.PI / 180) * Math.random() * 360;
      this.rotation = (Math.PI / 180) * Math.random() * 360;
      this.cosA = 1.0;
      this.size = 5.0;
      this.oscillationSpeed = Math.random() * 1.5 + 0.5;
      this.xSpeed = 40.0;
      this.ySpeed = Math.random() * 60 + 50.0;
      this.corners = [];
  
      this.time = Math.random();
      const ci = Math.round(Math.random() * (colors.length - 1));
      this.frontColor = colors[ci][0];
      this.backColor = colors[ci][1];
  
      for (let i = 0; i < 4; i++) {
        const dx = Math.cos(this.angle + (Math.PI / 180) * (i * 90 + 45));
        const dy = Math.sin(this.angle + (Math.PI / 180) * (i * 90 + 45));
        this.corners[i] = new Vector2(dx, dy);
      }
    }
  
    update(_dt: number): void {
      this.time += _dt;
      this.rotation += this.rotationSpeed * _dt;
      this.cosA = Math.cos(this.rotation);
      this.pos.x += Math.cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt;
      this.pos.y += this.ySpeed * _dt;
  
      if (this.pos.y > ConfettiPaper.bounds.y) {
        this.pos.x = Math.random() * ConfettiPaper.bounds.x;
        this.pos.y = 0;
      }
    }
  
    draw(_g: CanvasRenderingContext2D): void {
      if (this.cosA > 0) {
        _g.fillStyle = this.frontColor;
      } else {
        _g.fillStyle = this.backColor;
      }
  
      _g.beginPath();
      _g.moveTo(this.pos.x + this.corners[0].x * this.size, this.pos.y + this.corners[0].y * this.size * this.cosA);
  
      for (let i = 1; i < 4; i++) {
        _g.lineTo(this.pos.x + this.corners[i].x * this.size, this.pos.y + this.corners[i].y * this.size * this.cosA);
      }
  
      _g.closePath();
      _g.fill();
    }
  }
  