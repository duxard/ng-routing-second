import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EagerComponent } from './eager.component';



@NgModule({
  declarations: [EagerComponent],
  exports: [EagerComponent],
  imports: [
    CommonModule
  ]
})
export class EagerModule { }
