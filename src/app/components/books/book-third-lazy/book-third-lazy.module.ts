import { NgModule } from '@angular/core';
import { BookThirdLazyComponent } from './book-third-lazy.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BookThirdLazyComponent
  }
];

@NgModule({
  declarations: [BookThirdLazyComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class BookThirdLazyModule { }
