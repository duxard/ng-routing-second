import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

class DummyService {
  constructor(private http: HttpClient) {}
}

describe('Diff examples', () => {
  let service: DummyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
  });

  beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
    service = new DummyService(httpClient);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
