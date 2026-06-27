import { Component } from '@angular/core';
import { Color } from '../enums/color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly primaryColors: Color[] = [Color.Red, Color.Green, Color.Blue];
  private static readonly LAST_VISIT_KEY = 'lastVisitDate';
  private static readonly VISIT_COUNT_KEY = 'visitCount';

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  isPrimaryColor(color: Color): boolean {
    return this.primaryColors.includes(color);
  }

  saveLastVisitDate(): void {
    const now = new Date().toString();
    localStorage.setItem(AppComponent.LAST_VISIT_KEY, now);
  }
  saveVisitCount(): void {
    const currentCount = Number(localStorage.getItem(AppComponent.LAST_VISIT_KEY)) || 0;
    const newCount = currentCount + 1;
    localStorage.setItem(AppComponent.VISIT_COUNT_KEY, newCount.toString());
  }
}
