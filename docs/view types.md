````
<ng-template #tpl>
  <p>Dynamic Content</p>
</ng-template>




@ViewChild('tpl') tplRef!: TemplateRef<any>;
constructor(private vcr: ViewContainerRef) {}

// TemplateRef (just a blueprint)
console.log(this.tplRef); // Reference to <ng-template>

// ViewContainerRef (manages views)
this.vcr.clear(); // Removes all views inside

// EmbeddedViewRef (instantiated template)
const viewRef = this.vcr.createEmbeddedView(this.tplRef);
console.log(viewRef); // Now the template is rendered!
````
