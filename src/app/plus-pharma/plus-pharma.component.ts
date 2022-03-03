import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plus-pharma',
  templateUrl: './plus-pharma.component.html',
  styleUrls: ['./plus-pharma.component.css']
})
export class PlusPharmaComponent implements OnInit {

  @Input() data;
  size: number = 14;
  windowScrolled: boolean;
  date = new Date();
  
  constructor( @Inject(DOCUMENT) private document: Document) { }
    @HostListener("window:scroll", [])
      onWindowScroll() {
          if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
              this.windowScrolled = true;
          } 
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
              this.windowScrolled = false;
          }
      }
      scrollToTop() {
          (function smoothscroll() {
              var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                  window.requestAnimationFrame(smoothscroll);
                  window.scrollTo(0, currentScroll - (currentScroll / 8));
              }
          })();
      }

  ngOnInit() {
  }

}
