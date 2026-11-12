export interface Environment {
  /** Indica si la aplicación está compilada con el modo de producción. */
  readonly production: boolean;
  /** Indica si la aplicación debe usar datos de ejemplo en memoria. */
  readonly demoMode: boolean;
  /** URL base del microservicio de préstamos (Spring Boot). */
  readonly apiUrl: string;
}

export const environment: Environment = {
  production: false,
  demoMode: false,
  apiUrl: 'http://localhost:3003/api/loans',
};
