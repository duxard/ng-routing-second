import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandaloneComponent } from './standalone.component';

@NgModule({
  declarations: [StandaloneComponent],
  exports: [StandaloneComponent],
  imports: [CommonModule]
})
export class StandaloneModule { }
