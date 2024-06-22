## 2 ways of dynamic creation of components:

### 1 way - an old one
````
<button (click)="onClick()">Show</button>

<div #placeToRender></div>

<ng-template #embeddableTpl>
  <div>Some content</div>
</ng-template>
-------------------------------------------------------------------------------------------------------------------
export class AppComponent {
  @ViewChild('placeToRender', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef | null = null;

  @ViewChild('embeddableTpl', {read: TemplateRef<void>}) templateRef: TemplateRef<void> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  onClick() {
    if(this.viewContainerRef) {

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BannerComponent);
       
      // In case we need to provide a specific service to the component
      const injector = Injector.create({
        providers: [LoggerService]
      });


      const templateRef = this.viewContainerRef.createComponent(componentFactory, 0, injector);

// In case we need to provide a specific @Input to the component
      templateRef.instance.message = 'Hello World';

      //this.viewContainerRef?.createEmbeddedView(this.templateRef!);
    }
  }
}
----------------------------------------------------------------------------------------------------------------------

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  styleUrl: './banner.component.scss',
  template: `
    <p>{{ message }}</p>
  `
})
export class BannerComponent implements OnInit {
  @Input() message = 'Banner works';

  constructor(private readonly logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.log('BannerComponent initialized');
  }
}
```` 
### 2 way - a new one - no need of ComponentFactoryResolver:

````
<button (click)="onClick()">Show</button>

<div #placeToRender></div>

<ng-template #embeddableTpl>
  <div>Some content</div>
</ng-template>
----------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild('placeToRender', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef | null = null;

  @ViewChild('embeddableTpl', {read: TemplateRef<void>}) templateRef: TemplateRef<void> | null = null;


  onClick() {
    if(this.viewContainerRef) {
// In case we need to provide a specific service to the component
      const injector = Injector.create({
        providers: [LoggerService]
      });


      const templateRef = this.viewContainerRef.createComponent(BannerComponent, {
        injector
      });
      
// In case we need to provide a specific @Input to the component
      templateRef.instance.message = 'Hello World';

      //this.viewContainerRef?.createEmbeddedView(this.templateRef!);
    }
  }
}
````
