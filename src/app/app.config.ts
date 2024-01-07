import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {API_URL} from "./users/http/api-url.token";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {usersFeature} from "./users/data-access/+state/users.reducer";
import {provideAnimations} from "@angular/platform-browser/animations";
import {userEffects} from './users/data-access'
import {provideStoreDevtools} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideClientHydration(),
      provideHttpClient(withFetch()),
      provideStore(),
      provideAnimations(),
      provideEffects(userEffects),
      provideStoreDevtools({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        connectInZone: true // If set to true, the connection is established within the Angular zone
      }),
      provideStore({
        [usersFeature.name]: usersFeature.reducer
      }),
      {
        provide: API_URL,
        useValue: 'https://jsonplaceholder.typicode.com/users',
      },
      provideAnimations()
    ]
  }
;
