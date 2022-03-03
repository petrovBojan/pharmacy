import {Directive, ElementRef, HostListener, AfterContentChecked, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAutoGrow]'
})
export class AutoGrowDirective implements AfterContentChecked {
  @HostListener('input', ['$event.target'])
  onInput(textArea): void {
      this.adjust();
  }

  constructor(public element: ElementRef, private renderer: Renderer2) {
  }

  ngAfterContentChecked(): void {
    this.adjust();
  }

  adjust(): void {
    const nativeElement = this.element.nativeElement;
    this.renderer.setStyle(nativeElement, 'height', 'auto');
    this.renderer.setStyle(nativeElement, 'height', nativeElement.scrollHeight + 2 + "px");
  }
}
