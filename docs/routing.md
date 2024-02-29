## Standalone routes 

```
{ path: 'books', loadChildren: () => import('./components/books/books.routes').then(m => m.BOOK_ROUTES) },

....

export const BOOK_ROUTES: Routes = [{
  path: '',
  component: BooksComponent,
  providers: [],
  children: [
    {
      path: 'book-one',
      loadComponent: () => import('./book-one/book-one.component').then(m => m.BookOneComponent)
    },
  ]
}];
```

## Resolve relative route

```
private resolveRelativeRoute(path: string): ActivatedRoute {
    return path.startsWith('/') ? this.route.root : this.route;
}
```

## Log where user is being routed

```
this.router.events.subscribe(e => {
  if(e instanceof NavigationStart) {
    console.log(e.url);
  }
})
```
