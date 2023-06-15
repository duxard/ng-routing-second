import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandaloneModule } from './components/standalone/standalone.module';
import { TestComponent } from './components/test/test.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ViewModelComponent } from './components/view-model/view-model.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { RxZipComponent } from './components/rx-zip/rx-zip.component';
import { CustomInputComponent } from './components/control-value-accessor/custom-input/custom-input.component';
import { CustomInputTestingComponent } from './components/control-value-accessor/custom-input-testing/custom-input-testing.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavigationComponent,
    ViewModelComponent,
    PlaygroundComponent,
    RxZipComponent,
    CustomInputComponent,
    CustomInputTestingComponent
  ],
  imports: [
    BrowserModule,
    StandaloneModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
