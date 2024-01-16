// Assuming Vector2 is already defined in your code

import { Vector2 } from "./vector2";

export class EulerMass {
    position: Vector2;
    mass: number;
    drag: number;
    force: Vector2;
    velocity: Vector2;
  
    constructor(_x: number, _y: number, _mass: number, _drag: number) {
      this.position = new Vector2(_x, _y);
      this.mass = _mass;
      this.drag = _drag;
      this.force = new Vector2(0, 0);
      this.velocity = new Vector2(0, 0);
    }
  
    addForce(_f: Vector2): void {
      this.force.Add(_f);
    }
  
    integrate(_dt: number): void {
      const acc = this.currentForce(this.position);
      acc.Div(this.mass);
  
      const posDelta = new Vector2(this.velocity.x, this.velocity.y);
      posDelta.Mul(_dt);
      this.position.Add(posDelta);
  
      acc.Mul(_dt);
      this.velocity.Add(acc);
      this.force = new Vector2(0, 0);
    }
  
    currentForce(_pos: Vector2, _vel?: Vector2): Vector2 {
      const totalForce = new Vector2(this.force.x, this.force.y);
      const speed = this.velocity.Length();
      const dragVel = new Vector2(this.velocity.x, this.velocity.y);
      dragVel.Mul(this.drag * this.mass * speed);
      totalForce.Sub(dragVel);
      return totalForce;
    }
  }
  