import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'countries';


  get dark() {
    return this.themeService.theme === 'dark';
  }

  set dark(enabled: boolean) {
    this.themeService.theme = enabled ? 'dark' : null;
  }

  constructor(public themeService: ThemeService) {
  }
}
