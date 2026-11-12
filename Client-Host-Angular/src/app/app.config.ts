import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, RouterFeatures } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

/**
 * Features del enrutador condicionadas por el entorno.
 *
 * @remarks
 * Solo en `ghpages` (build de GitHub Pages) se activa el `HashLocationStrategy`,
 * necesario porque el sitio se sirve bajo un subpath donde no conviene usar History API.
 */
const routerFeatures: RouterFeatures[] = environment.demoMode ? [withHashLocation()] : [];

/**
 * Configuración global de la aplicación (Host).
 * Proporciona manejo de errores globales, detección de zona con coalescencia de eventos,
 * enrutamiento y cliente HTTP compartido para los microfrontends.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, ...routerFeatures),
    provideHttpClient(),
  ]
};
