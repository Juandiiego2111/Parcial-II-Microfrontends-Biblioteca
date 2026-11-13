export interface Environment {
  /** Indica si la aplicación está compilada con el modo de producción. */
  readonly production: boolean;
  /** Indica si la aplicación debe usar datos de ejemplo en memoria. */
  readonly demoMode: boolean;
  /** URL base del microservicio de libros (Node.js, puerto 3001). */
  readonly apiUrl: string;
}

/**
 * Entorno para la build de GitHub Pages (`ng build --configuration ghpages`).
 *
 * @remarks
 * - `demoMode: true` activa el repositorio en memoria del catálogo de libros.
 * - No se consume el microservicio porque GitHub Pages solo sirve contenido estático.
 */
export const environment: Environment = {
  production: true,
  demoMode: true,
  apiUrl: 'http://localhost:3001/api/books',
};
