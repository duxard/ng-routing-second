import { NgModule } from '@angular/core';
import { BookFourthLazyComponent } from './book-fourth-lazy.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookFourthLazyComponent],
  imports: [RouterModule.forChild([{ path: '', component:  BookFourthLazyComponent}])],
  exports: [RouterModule]
})
export class BookFourthLazyModule { }
