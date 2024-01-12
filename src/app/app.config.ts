import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {API_URL} from "./users/services/http/api-url.token";
import {provideHttpClient} from "@angular/common/http";
import {usersFeature} from "./users/data-access/+state/users.reducer";
import {provideAnimations} from "@angular/platform-browser/animations";
import {userEffects} from './users/data-access'
import {provideStoreDevtools} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideEffects(userEffects),
    provideStore(
      {
        [usersFeature.name]: usersFeature.reducer
      }
    ),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mod
    }),
    {
      provide: API_URL,
      useValue: 'https://jsonplaceholder.typicode.com/users',
    },
  ]
}
