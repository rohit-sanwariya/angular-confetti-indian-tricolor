// Assuming ConfettiPaper, ConfettiRibbon, Vector2, and frameRate are already defined in your code

import { ConfettiPaper } from "./confetti-paper";
import { ConfettiRibbon } from "./confetti-ribbon";
import { dt, frameRate } from "./constants";
import { Vector2 } from "./vector2";

export class Confetti {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    interval: any;
    confettiRibbons: ConfettiRibbon[];
    confettiPapers: ConfettiPaper[];
    confettiPaperCount = 25;
    canvasParent;
    confettiRibbonCount = 7;
    rpCount = 30;
    rpDist = 8.0;
    rpThick = 8.0;
    constructor(parent: string) {
      let i = 0;
  
      this.canvasParent = document.getElementById(parent) as HTMLElement;
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.canvasParent.offsetWidth;
      this.canvas.height = this.canvasParent.offsetHeight;
      this.canvasParent.appendChild(this.canvas);
  
      this.context = this.canvas.getContext('2d')!;
      this.interval = null;
  
    
      
      this.confettiRibbons = new Array(this.confettiRibbonCount);
  
      ConfettiRibbon.bounds = new Vector2(this.canvas.width, this.canvas.height);
  
      for (i = 0; i < this.confettiRibbonCount; i++) {
        this.confettiRibbons[i] = new ConfettiRibbon(
          Math.random() * this.canvas.width,
          -Math.random() * this.canvas.height * 2,
          this.rpCount,
          this.rpDist,
          this.rpThick,
          45,
          1,
          0.05
        );
      }
  
      this.confettiPapers = new Array(this.confettiPaperCount);
  
      ConfettiPaper.bounds = new Vector2(this.canvas.width, this.canvas.height);
  
      for (i = 0; i < this.confettiPaperCount; i++) {
        this.confettiPapers[i] = new ConfettiPaper(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
      }
  
    
    }


    resize = () => {
        this.canvas.width = this.canvasParent.offsetWidth;
        this.canvas.height = this.canvasParent.offsetHeight;
        ConfettiPaper.bounds = new Vector2(this.canvas.width, this.canvas.height);
        ConfettiRibbon.bounds = new Vector2(this.canvas.width, this.canvas.height);
      };
  
    start = () => {
        this.stop();
        this.interval = setInterval(() => {
          this.update();
        }, 1000.0 / frameRate);
      };
  
    stop = () => {
        if (this.interval !== null) {
          clearInterval(this.interval);
        }
      };
  
    update = () => {
        let i = 0;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        for (i = 0; i < this.confettiPaperCount; i++) {
          this.confettiPapers[i].update(dt);
          this.confettiPapers[i].draw(this.context);
        }
  
        for (i = 0; i < this.confettiRibbonCount; i++) {
          this.confettiRibbons[i].update(dt);
          this.confettiRibbons[i].Draw(this.context);
        }
      };
      
  }
  