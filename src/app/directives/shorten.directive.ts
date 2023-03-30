import {
  Directive,
  ElementRef,
  OnInit,
  AfterViewInit,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appShorten]',
})
export class ShortenDirective implements AfterViewInit {
  @Input() maxLength: number = 100;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const paragraph = this.el.nativeElement;
    const text = paragraph.textContent;
    if (text.length > this.maxLength) {
      this.renderer.setProperty(
        paragraph,
        'textContent',
        text.substring(0, this.maxLength) + '.....'
      );
    }
  }
}
