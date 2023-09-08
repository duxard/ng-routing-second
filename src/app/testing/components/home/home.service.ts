import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  getName(): string {
    return 'HomeService';
  }
}
