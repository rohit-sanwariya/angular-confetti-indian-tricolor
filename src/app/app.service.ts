import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
   frameRate = 30;
   dt = 1.0 / this.frameRate;
   DEG_TO_RAD = Math.PI / 180;
   RAD_TO_DEG = 180 / Math.PI;
   colors = [
      ["#df0049", "#660671"],
      ["#00e857", "#005291"],
      ["#2bebbc", "#05798a"],
      ["#ffd200", "#b06c00"]
  ];
  constructor() { }
}
