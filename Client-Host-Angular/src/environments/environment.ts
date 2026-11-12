/**
 * Entorno de desarrollo del Host de la Biblioteca.
 *
 * @remarks
 * Contiene las URLs locales de los microfrontends cargados por Module Federation.
 * Se usa por defecto (`ng build`, `ng serve`) y es el archivo base que se reemplaza
 * en la configuración de build `ghpages`.
 */
export interface Environment {
  /** Indica si la aplicación está compilada con el modo de producción. */
  readonly production: boolean;
  /** Indica si la aplicación debe usar datos de ejemplo en memoria. */
  readonly demoMode: boolean;
  /** URLs de los microfrontends (remoteEntry.js) usadas por Module Federation. */
  readonly remoteEntryUrls: {
    readonly books: string;
    readonly members: string;
    readonly loans: string;
  };
}

export const environment: Environment = {
  production: false,
  demoMode: false,
  remoteEntryUrls: {
    books: 'http://localhost:4201/remoteEntry.js',
    members: 'http://localhost:4202/remoteEntry.js',
    loans: 'http://localhost:4203/remoteEntry.js',
  },
};
