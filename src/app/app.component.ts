import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vector2 } from './vector2';
import { Confetti } from './confetti';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
 
  ngAfterViewInit(): void {
    const confetti = new Confetti("confetti");
    confetti.start();
  }
}
