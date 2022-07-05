import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import { TodoTag } from 'src/models/todo-tag';

describe('TagService', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should send a GET to the /tags endpoint', () => {
    const testData: TodoTag[] = [
      { "id": 1, "text": "test", "icon": "🔧" },
      { "id": 2, "text": "shopping", "icon": "🛒" },
    ];

    service.getTags().subscribe(tags => {
      expect(tags).toEqual(testData);
    });

    const req = httpTestingController.expectOne('/api/tags');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
