import { Component, OnInit, Input, ViewChildren, ElementRef, AfterViewInit, QueryList, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div #mainDiv class="lds-ring">
      <div #spinner></div>
      <div #spinner></div>
      <div #spinner></div>
      <div #spinner></div>
    </div>`,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit, AfterViewInit {
  @Input() color: string;
  @Input() loaderSize: number;
  @ViewChildren('spinner') el: QueryList<ElementRef>;
  @ViewChild('mainDiv') mainDiv: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.el.forEach((element: ElementRef) => {
      if (this.color) {
        this.renderer.setStyle(element.nativeElement, 'border-color', `${this.color} transparent transparent transparent`);
      }
      if (this.loaderSize) {
        this.renderer.setStyle(element.nativeElement, 'width', (this.loaderSize / 1.25 + 'px'));
        this.renderer.setStyle(element.nativeElement, 'height', (this.loaderSize / 1.25 + 'px'));
        this.renderer.setStyle(element.nativeElement, 'margin', (this.loaderSize / 10 + 'px'));
        this.renderer.setStyle(element.nativeElement, 'border-width', (this.loaderSize / 10 + 'px'));
      }
    });
    if (this.loaderSize) {
      this.renderer.setStyle(this.mainDiv.nativeElement, 'width', `${this.loaderSize}px`);
      this.renderer.setStyle(this.mainDiv.nativeElement, 'height', `${this.loaderSize}px`);
    }
  }

}
