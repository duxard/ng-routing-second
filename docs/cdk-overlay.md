## A simple example od angular cdk overlay

````
@Component({
  selector: 'app-my-overlay',
  standalone: true,
  styleUrl: './my-overlay.component.scss',
  template: `
    <p>This is the content of the overlay</p>
    <button (click)="onClose()">Close</button>
  `,
})
export class MyOverlayComponent {
  constructor(private readonly overlayRef: OverlayRef) {}

  onClose() {
    this.overlayRef.detach();
  }
}
````

### Attaching (above mentioned) component to overlay:
````
export class AppComponent implements OnInit {
  // count: WritableSignal<number> = signal<number>(1)
  // doubleCount: Signal<number> = computed(() => this.count() * 2);

  constructor(
    private overlay: Overlay,
    private cdr: ChangeDetectorRef
  ) { }

  private overlayRef: OverlayRef | null = null;

  ngOnInit(): void {

  }

  onClick() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'nui-overlay-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      panelClass: 'nui-modal-panel',
    });

    this.overlayRef = this.overlay.create(config);
    const injector = Injector.create({
      providers: [
        { provide: OverlayRef, useValue: this.overlayRef }
      ]
    });

    const portal = new ComponentPortal(MyOverlayComponent, null, injector);

    this.overlayRef.attach(portal);

    this.overlayRef?.backdropClick()
      //.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
      this.overlayRef?.detach();
    });
  }

  hide(): void {
    if (!this.overlayRef?.hasAttached()) {
      return;
    }
    this.overlayRef.detach();
    this.cdr.markForCheck();
  }
}
````
