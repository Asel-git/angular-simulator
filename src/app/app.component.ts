import { Component, OnDestroy, OnInit } from '@angular/core';
import './training';
import { Color } from '../enums/color';
import { Collection } from './collection';
import { IOffer } from '../interfaces/IOffer';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private static readonly LAST_VISIT_KEY = 'lastVisitDate';
  private static readonly VISIT_COUNT_KEY = 'visitCount';

  companyName: string = 'РУМТИБЕТ';
  selectedOfferId: number = 2;
  date: string = '';
  people: string = '';
  location: string = '';
  currentDate: Date = new Date();
  text: string = '';
  isLoading: boolean = true;
  offers: IOffer[] = [
    {
      id: 1,
      image: '/images/guides.svg',
      subtitle: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      image: '/images/safety.svg',
      subtitle: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      image: '/images/price.svg',
      subtitle: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  timerId!: number;
  private readonly primaryColors: Color[] = [Color.Red, Color.Green, Color.Blue];

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();

    // 1-я коллекция: цвета
    const colorsCollection = new Collection<Color>([Color.Red, Color.Green, Color.Blue]);
    console.log('Коллекция цветов:', colorsCollection.getAll());
    console.log('working', this.people, this.date, this.location);

    // 2-я коллекция: числа
    const numbersCollection = new Collection<number>([10, 20, 30, 40]);
    console.log('Коллекция чисел:', numbersCollection.getAll());

    numbersCollection.removeItem(1);
  }

  // Проверяет, является ли переданный цвет основным (Red, Green, Blue).
  isPrimaryColor(color: Color): boolean {
    return this.primaryColors.includes(color);
  }

  // Сохраняет в localStorage дату текущего захода на страницу.
  saveLastVisitDate(): void {
    const now = new Date().toISOString();
    localStorage.setItem(AppComponent.LAST_VISIT_KEY, now);
  }

  // Увеличивает и сохраняет в localStorage количество заходов на страницу.
  saveVisitCount(): void {
    const currentCount = Number(localStorage.getItem(AppComponent.VISIT_COUNT_KEY)) || 0;
    const newCount = currentCount + 1;
    localStorage.setItem(AppComponent.VISIT_COUNT_KEY, newCount.toString());

    console.log('Текущее количество заходов (до):', currentCount);
    console.log('Новое количество заходов (после):', newCount);
  }
  selectOffer(offerId: number): void {
    this.selectedOfferId = offerId;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.timerId = window.setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
  count = 0;
  inCreaseCount(): void {
    this.count++;
  }
  deCreaseCount(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  showTimer = true;
  toggleContent() {
    this.showTimer = !this.showTimer;
  }
}
