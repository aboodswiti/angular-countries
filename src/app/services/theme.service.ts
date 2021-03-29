import { Injectable } from '@angular/core';

export const darkTheme = {
  'primary-color': '#2c2c33',
  'background-color': '#2c2c33',
  'text-color': '#fff',
};

export const lightTheme = {
  'primary-color': '#fff',
  'background-color': '#ffff',
  'text-color': '#282524',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleDark() {
    this.setTheme(darkTheme);
  }

  toggleLight() {
    this.setTheme(lightTheme);
  }

  private setTheme(theme: any = []) {
    Object.keys(theme).forEach((k) =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
