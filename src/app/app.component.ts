import {
  AfterViewInit,
  Component, ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {interval} from 'rxjs';
import {Observable} from 'rxjs';
import {from} from 'rxjs';
import {of} from 'rxjs';
import {concatMap, delay, exhaustMap, map, mergeMap, share, shareReplay, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('tpl', {static: true}) template!: TemplateRef<any>;
}
