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

/**
 * Entorno para la build de GitHub Pages (`ng build --configuration ghpages`).
 *
 * @remarks
 * - `demoMode: true` activa el aviso "Modo demostración: datos de ejemplo".
 * - `remoteEntryUrls` apuntan a rutas relativas (`remotes/<mf>/remoteEntry.js`)
 *   que se resuelven contra la `base href` del sitio publicado.
 */
export const environment: Environment = {
  production: true,
  demoMode: true,
  remoteEntryUrls: {
    books: 'remotes/books/remoteEntry.js',
    members: 'remotes/members/remoteEntry.js',
    loans: 'remotes/loans/remoteEntry.js',
  },
};
