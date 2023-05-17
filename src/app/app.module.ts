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

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavigationComponent,
    ViewModelComponent,
    PlaygroundComponent,
    RxZipComponent
  ],
  imports: [
    BrowserModule,
    StandaloneModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
