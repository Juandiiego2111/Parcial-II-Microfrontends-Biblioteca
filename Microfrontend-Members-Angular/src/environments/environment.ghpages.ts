export interface Environment {
  /** Indica si la aplicación está compilada con el modo de producción. */
  readonly production: boolean;
  /** Indica si la aplicación debe usar datos de ejemplo en memoria. */
  readonly demoMode: boolean;
  /** URL base del microservicio de socios (Spring Boot). */
  readonly apiUrl: string;
}

/**
 * Entorno para la build de GitHub Pages (`ng build --configuration ghpages`).
 *
 * @remarks
 * - `demoMode: true` activa el repositorio en memoria de socios.
 * - No se consume el microservicio porque GitHub Pages solo sirve contenido estático.
 */
export const environment: Environment = {
  production: true,
  demoMode: true,
  apiUrl: 'http://localhost:3002/api/members',
};
