// Assuming Vector2 and EulerMass are already defined in your code

import { colors } from "./constants";
import { EulerMass } from "./euler-mass";
import { Vector2 } from "./vector2";

export class ConfettiRibbon {
    static bounds = new Vector2(0, 0);
    particleDist: number;
    particleCount: number;
    particleMass: number;
    particleDrag: number;
    particles: EulerMass[];
    frontColor: string;
    backColor: string;
    xOff: number;
    yOff: number;
    position: Vector2;
    prevPosition: Vector2;
    velocityInherit: number;
    time: number;
    oscillationSpeed: number;
    oscillationDistance: number;
    ySpeed: number;
  
    constructor(_x: number, _y: number, _count: number, _dist: number, _thickness: number, _angle: number, _mass: number, _drag: number) {
      this.particleDist = _dist;
      this.particleCount = _count;
      this.particleMass = _mass;
      this.particleDrag = _drag;
      this.particles = [];
      const ci = Math.round(Math.random() * (colors.length - 1));
      this.frontColor = colors[ci][0];
      this.backColor = colors[ci][1];
      this.xOff = Math.cos((Math.PI / 180) * _angle) * _thickness;
      this.yOff = Math.sin((Math.PI / 180) * _angle) * _thickness;
      this.position = new Vector2(_x, _y);
      this.prevPosition = new Vector2(_x, _y);
      this.velocityInherit = Math.random() * 2 + 4;
      this.time = Math.random() * 100;
      this.oscillationSpeed = Math.random() * 2 + 2;
      this.oscillationDistance = Math.random() * 40 + 40;
      this.ySpeed = Math.random() * 40 + 80;
  
      for (let i = 0; i < this.particleCount; i++) {
        this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
      }
    }
  
    update(_dt: number): void {
      let i = 0;
      this.time += _dt * this.oscillationSpeed;
      this.position.y += this.ySpeed * _dt;
      this.position.x += Math.cos(this.time) * this.oscillationDistance * _dt;
      this.particles[0].position = this.position;
  
      const dX = this.prevPosition.x - this.position.x;
      const dY = this.prevPosition.y - this.position.y;
      const delta = Math.sqrt(dX * dX + dY * dY);
      this.prevPosition = new Vector2(this.position.x, this.position.y);
  
      for (i = 1; i < this.particleCount; i++) {
        const dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
        dirP.Normalize();
        dirP.Mul((delta / _dt) * this.velocityInherit);
        this.particles[i].addForce(dirP);
      }
  
      for (i = 1; i < this.particleCount; i++) {
        this.particles[i].integrate(_dt);
      }
  
      for (i = 1; i < this.particleCount; i++) {
        const rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
        rp2.Sub(this.particles[i - 1].position);
        rp2.Normalize();
        rp2.Mul(this.particleDist);
        rp2.Add(this.particles[i - 1].position);
        this.particles[i].position = rp2;
      }
  
      if (this.position.y > ConfettiRibbon.bounds.y + this.particleDist * this.particleCount) {
        this.reset();
      }
    }
  
    reset(): void {
      this.position.y = -Math.random() * ConfettiRibbon.bounds.y;
      this.position.x = Math.random() * ConfettiRibbon.bounds.x;
      this.prevPosition = new Vector2(this.position.x, this.position.y);
      this.velocityInherit = Math.random() * 2 + 4;
      this.time = Math.random() * 100;
      this.oscillationSpeed = Math.random() * 2.0 + 1.5;
      this.oscillationDistance = Math.random() * 40 + 40;
      this.ySpeed = Math.random() * 40 + 80;
  
      const ci = Math.round(Math.random() * (colors.length - 1));
     
    }

    Draw(_g: CanvasRenderingContext2D) {
        for (let i = 0; i < this.particleCount - 1; i++) {
          const p0 = new Vector2(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
          const p1 = new Vector2(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);
    
          if (this.Side(
            this.particles[i].position.x,
            this.particles[i].position.y,
            this.particles[i + 1].position.x,
            this.particles[i + 1].position.y,
            p1.x,
            p1.y
          ) < 0) {
            _g.fillStyle = this.frontColor;
            _g.strokeStyle = this.frontColor;
          } else {
            _g.fillStyle = this.backColor;
            _g.strokeStyle = this.backColor;
          }
    
          if (i == 0) {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x, this.particles[i].position.y);
            _g.lineTo(this.particles[i + 1].position.x, this.particles[i + 1].position.y);
            _g.lineTo((this.particles[i + 1].position.x + p1.x) * 0.5, (this.particles[i + 1].position.y + p1.y) * 0.5);
            _g.closePath();
            _g.stroke();
            _g.fill();
    
            _g.beginPath();
            _g.moveTo(p1.x, p1.y);
            _g.lineTo(p0.x, p0.y);
            _g.lineTo((this.particles[i + 1].position.x + p1.x) * 0.5, (this.particles[i + 1].position.y + p1.y) * 0.5);
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else if (i == this.particleCount - 2) {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x, this.particles[i].position.y);
            _g.lineTo(this.particles[i + 1].position.x, this.particles[i + 1].position.y);
            _g.lineTo((this.particles[i].position.x + p0.x) * 0.5, (this.particles[i].position.y + p0.y) * 0.5);
            _g.closePath();
            _g.stroke();
            _g.fill();
    
            _g.beginPath();
            _g.moveTo(p1.x, p1.y);
            _g.lineTo(p0.x, p0.y);
            _g.lineTo((this.particles[i].position.x + p0.x) * 0.5, (this.particles[i].position.y + p0.y) * 0.5);
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x, this.particles[i].position.y);
            _g.lineTo(this.particles[i + 1].position.x, this.particles[i + 1].position.y);
            _g.lineTo(p1.x, p1.y);
            _g.lineTo(p0.x, p0.y);
            _g.closePath();
            _g.stroke();
            _g.fill();
          }
        }
      }
    
      Side(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {
        return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
      }

}