import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandaloneComponent } from './standalone.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [StandaloneComponent],
  exports: [StandaloneComponent],
  imports: [CommonModule]
})
export class StandaloneModule { }
