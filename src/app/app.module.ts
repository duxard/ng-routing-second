import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandaloneModule } from './components/standalone/standalone.module';
import { TemplateUsagesComponent } from './components/template-usages/template-usages.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ViewModelComponent } from './components/view-model/view-model.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { RxZipComponent } from './components/rx-zip/rx-zip.component';
import { CustomInputComponent } from './components/control-value-accessor/custom-input/custom-input.component';
import { CustomInputTestingComponent } from './components/control-value-accessor/custom-input-testing/custom-input-testing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleDirective } from './directives/simple.directive';
import { DividerComponent } from './components/divider/divider.component';
import { ParentalDirective, TaskBuilderComponent } from './components/task-builder/task-builder.component';
import { RegistartionFormComponent } from './components/registartion-form/registartion-form.component';
import { ZonePlayaroundComponent } from './components/zone-playaround/zone-playaround.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateUsagesComponent,
    NavigationComponent,
    ViewModelComponent,
    PlaygroundComponent,
    RxZipComponent,
    CustomInputComponent,
    CustomInputTestingComponent,
    SimpleDirective,
    DividerComponent,
    ParentalDirective,
    TaskBuilderComponent,
    RegistartionFormComponent,
    ZonePlayaroundComponent
  ],
  imports: [
    BrowserModule,
    StandaloneModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  schemas:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
