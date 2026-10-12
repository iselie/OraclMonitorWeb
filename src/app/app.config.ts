import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() // ◄ חיוני עבור ביצוע קריאות fetch/http ל-.NET 10 API
  ]
};
