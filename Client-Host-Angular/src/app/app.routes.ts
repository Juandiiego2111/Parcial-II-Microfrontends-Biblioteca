import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';

/**
 * Resuelve la URL del `remoteEntry.js` de un microfrontend.
 *
 * @remarks
 * - Si la URL es absoluta (desarrollo: `http://localhost:420X/remoteEntry.js`) se usa tal cual.
 * - Si es relativa (GitHub Pages: `remotes/books/remoteEntry.js`) se resuelve contra la base
 *   del documento (`document.baseURI`), de modo que funcione bajo el subpath del sitio.
 *
 * @see {@link https://www.angular-architects.io/module-federation/}
 */
const resolveRemoteUrl = (remoteEntry: string): string => {
  if (/^https?:\/\//i.test(remoteEntry)) {
    return remoteEntry;
  }
  const baseUri = typeof document !== 'undefined' && document.baseURI ? document.baseURI : window.location.href;
  try {
    return new URL(remoteEntry, baseUri).toString();
  } catch {
    return remoteEntry;
  }
};

export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: resolveRemoteUrl(environment.remoteEntryUrls.books),
        exposedModule: './BooksPage',
      }).then((m) => m.BooksPage),
  },
  {
    path: 'members',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: resolveRemoteUrl(environment.remoteEntryUrls.members),
        exposedModule: './MembersPage',
      }).then((m) => m.MembersPage),
  },
  {
    path: 'loans',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: resolveRemoteUrl(environment.remoteEntryUrls.loans),
        exposedModule: './LoansPage',
      }).then((m) => m.LoansPage),
  },
  {
    path: '**',
    redirectTo: 'books',
    pathMatch: 'full',
  },
];
