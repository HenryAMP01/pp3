import { AfterViewInit, Component, OnInit } from '@angular/core';

import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  images: string[] = [
    'assets/statics/welcome1.jpg',
    'assets/statics/welcome3.jpg',
  ];

  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
