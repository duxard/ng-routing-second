import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EagerComponent} from './components/eager/eager.component';
import {StandaloneComponent} from './components/standalone/standalone.component';

const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: () => import('./components/lazy/lazy.module').then(m => m.LazyModule) },
  { path: 'standalone', component: StandaloneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
