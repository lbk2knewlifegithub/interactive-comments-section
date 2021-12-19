import { Component } from '@angular/core';

@Component({
  selector: 'lbk-footer',
  template: `
    <footer class="relative">
      <p class="text-center text-xs lg:fixed lg:bottom-0 lg:w-full">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by
        <a
          class="text-sky-600 decoration-wavy"
          href="https://github.com/lbk2knewlifegithub"
          >lbk2</a
        >.
      </p>
    </footer>
  `,
})
export class FooterComponent {}
