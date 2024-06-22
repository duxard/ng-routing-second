
```
import {Injectable, Provider, Type} from "@angular/core";

export abstract class BaseService {
  abstract foo(): void;
}

@Injectable({ providedIn: 'root' })
export class Service1 extends BaseService { foo() {} }

@Injectable({ providedIn: 'root' })
export class Service2 extends BaseService { foo() {} }

@Injectable({ providedIn: 'root' })
export class Service3 extends BaseService { foo() {} }

export function provideSpecificService(service: Type<BaseService>): Provider {
  return {
    provide: BaseService,
    useExisting: service
  }
}

```

````
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [provideSpecificService(Service1) ]
})
export class AppComponent implements OnInit {

  constructor(private readonly service: BaseService) {}

  ngOnInit(): void {
    console.assert(this.service instanceof Service1, 'Service1 is not provided')
  }
}
````
