import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { EagerComponent } from './components/eager/eager.component';
import { StandaloneComponent } from './components/standalone/standalone.component';
import { UsersResolverComponent } from './components/users-resolver/users-resolver.component';
import { UserDetailsComponent } from './components/users-resolver/user-details/user-details.component';
import { UserResolver } from './components/users-resolver/resolvers/user.resolver';
import { BookFirstComponent } from './components/books/book-first.component';
import { BookSecondComponent } from './components/books/book-second.component';
import { BookGuard } from './components/books/book-guard.service';
import { AuthorResolver } from './components/books/author-resolver.service';
import { BookCanLoadGuard } from './components/books/book-can-load.guard';
import { AuthPreloadStrategy } from './components/books/auth-preload-strategy';

const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: () => import('./components/lazy/lazy.module').then(m => m.LazyModule) },
  { path: 'standalone', component: StandaloneComponent },
  { path: 'users', component: UsersResolverComponent },
  { path: 'users/:id', component: UserDetailsComponent, resolve: {user: UserResolver} },
  {
    path: '',
    canActivate: [BookGuard],
    resolve: {
      author: AuthorResolver
    },
    children: [
      { path: 'book-first', component: BookFirstComponent },
      { path: 'book-second', component: BookSecondComponent },
      {
        // preload strategies don't work with canLoad guards
        path: 'book-third',
        canLoad: [BookCanLoadGuard],
        loadChildren: () => import('./components/books/book-third-lazy/book-third-lazy.module').then(m => m.BookThirdLazyModule)
      },
      {
        // custom preload strategy works (AuthPreloadStrategy)
        path: 'book-fourth',
        data: {
          preload: true
        },
        loadChildren: () => import('./components/books/book-fourth-lazy/book-fourth-lazy.module').then(m => m.BookFourthLazyModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: AuthPreloadStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
