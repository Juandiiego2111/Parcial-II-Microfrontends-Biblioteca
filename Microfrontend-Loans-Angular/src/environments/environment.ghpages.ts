import type { Environment } from './environment';

/**
 * Entorno para la build de GitHub Pages (`ng build --configuration ghpages`).
 *
 * @remarks
 * - `demoMode: true` activa el repositorio en memoria de préstamos.
 * - No se consume el microservicio porque GitHub Pages solo sirve contenido estático.
 */
export const environment: Environment = {
  production: true,
  demoMode: true,
  apiUrl: 'http://localhost:3003/api/loans',
};
