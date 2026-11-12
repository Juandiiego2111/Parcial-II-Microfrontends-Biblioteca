import { type Environment } from './environment';

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
