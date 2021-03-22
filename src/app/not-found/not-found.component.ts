import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',

  template: `
    <h1>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <p>
            {{ ErrorMessage }}
          </p>
          <a routerLink="/countries">Go To Homepage</a>
        </div>
      </div>
    </h1>
  `,
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  constructor(private route: ActivatedRoute) {}
  @Input() ErrorMessage: any;
  ngOnInit() {}
}
