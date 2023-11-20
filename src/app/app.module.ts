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
import { SimpleDirective } from './directives/structural/simple.directive';
import { DividerComponent } from './components/divider/divider.component';
import { ParentalDirective, TaskBuilderComponent } from './components/task-builder/task-builder.component';
import { RegistartionFormComponent } from './components/registartion-form/registartion-form.component';
import { ZonePlayaroundComponent } from './components/zone-playaround/zone-playaround.component';
import { MultipleInputParamsDirective } from './directives/structural/multiple-input-params.directive';
import { IfDefinedDirective } from './directives/structural/if-defined.directive';
import { UsersResolverComponent } from './components/users-resolver/users-resolver.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './components/users-resolver/user-details/user-details.component';
import { UserSpinnerComponent } from './components/users-resolver/user-spinner/user-spinner.component';
import { BookFirstComponent } from './components/books/book-first.component';
import { BookSecondComponent } from './components/books/book-second.component';
import { TreeComponent } from './components/injection-tokens-usage/tree/tree.component';
import { TreeBranchComponent } from './components/injection-tokens-usage/tree-branch/tree-branch.component';
import { PainterDirective } from './components/painter_self_provider/painter.directive';
import { BluePainterDirective } from './components/painter_self_provider/blue-painter.directive';
import { GreenPainterDirective } from './components/painter_self_provider/green-painter.directive';
import { RxjsZoneComponent } from './components/rxjs-zone/rxjs-zone.component';
import { VirtualInfiniteScrollComponent } from './cdk/virtual-infinite-scroll/virtual-infinite-scroll.component';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from './i18n/i18n.service';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';


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
    ZonePlayaroundComponent,
    MultipleInputParamsDirective,
    IfDefinedDirective,
    UsersResolverComponent,
    UserDetailsComponent,
    UserSpinnerComponent,
    BookFirstComponent,
    BookSecondComponent,
    TreeComponent,
    TreeBranchComponent,
    PainterDirective,
    BluePainterDirective,
    GreenPainterDirective,
    RxjsZoneComponent,
    LanguageSwitchComponent
  ],
  imports: [
    BrowserModule,
    StandaloneModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    I18NextModule.forRoot(),

    // standalone components
    VirtualInfiniteScrollComponent,
  ],
  providers: [I18N_PROVIDERS],
  schemas:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
