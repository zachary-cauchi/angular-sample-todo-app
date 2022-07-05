import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from 'src/models/todo';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {

    it('Should return a list of todos', () => {
      const mockTodos = [
        { id: 12, dateCreated: new Date(2022, 3), text: 'Testing testing 123', tags: [], isComplete: false, userId: 1 }
      ];
  
      spyOn(window.sessionStorage, 'getItem').and.callFake(key => {
        expect(key).toBe('user');
  
        return '{ "id": 1 }';
      });
  
      service.getTodos().subscribe(todos => {
        expect(todos).toEqual(mockTodos);
      });
  
      const req = httpTestingController.expectOne('api/todos');
  
      expect(req.request.method).toBe('GET');
  
      req.flush(mockTodos);
  
      httpTestingController.verify();
    });

    it('Should return a filtered list of todos which belong to user 1', () => {
      const mockTodos = [
        { id: 12, dateCreated: new Date(2022, 3), text: 'User 1\'s Testing testing 123', tags: [], isComplete: false, userId: 1 },
        { id: 13, dateCreated: new Date(2022, 3), text: 'User 2\'s Testing testing 123', tags: [], isComplete: false, userId: 2 },
        { id: 14, dateCreated: new Date(2022, 3), text: 'User 3\'s Testing testing 123', tags: [], isComplete: false, userId: 3 },
      ];

      spyOn(window.sessionStorage, 'getItem').and.callFake(key => {
        expect(key).toBe('user');
  
        return '{ "id": 1 }';
      });
  
      service.getTodos().subscribe(todos => {
        expect(todos).not.toEqual(mockTodos);
        expect(todos).toHaveSize(1);
        expect(todos).toContain(mockTodos[0]);
      });
  
      const req = httpTestingController.expectOne('api/todos');
  
      expect(req.request.method).toBe('GET');
  
      req.flush(mockTodos);
  
      httpTestingController.verify();
    });

    it('Should return an empty list if there are no todos for user 1', () => {
      const mockTodos = [
        { id: 13, dateCreated: new Date(2022, 3), text: 'User 2\'s Testing testing 123', tags: [], isComplete: false, userId: 2 },
        { id: 14, dateCreated: new Date(2022, 3), text: 'User 3\'s Testing testing 123', tags: [], isComplete: false, userId: 3 },
        { id: 12, dateCreated: new Date(2022, 3), text: 'User 4\'s Testing testing 123', tags: [], isComplete: false, userId: 4 },
      ];

      spyOn(window.sessionStorage, 'getItem').and.callFake(key => {
        expect(key).toBe('user');
  
        return '{ "id": 1 }';
      });
  
      service.getTodos().subscribe(todos => {
        expect(todos).not.toEqual(mockTodos);
        expect(todos).toHaveSize(0);
      });
  
      const req = httpTestingController.expectOne('api/todos');
  
      expect(req.request.method).toBe('GET');
  
      req.flush(mockTodos);
  
      httpTestingController.verify();
    });

    it('Should return an empty list if there is no user logged in', () => {
      const mockTodos = [
        { id: 12, dateCreated: new Date(2022, 3), text: 'User 1\'s Testing testing 123', tags: [], isComplete: false, userId: 1 },
        { id: 13, dateCreated: new Date(2022, 3), text: 'User 2\'s Testing testing 123', tags: [], isComplete: false, userId: 2 },
        { id: 14, dateCreated: new Date(2022, 3), text: 'User 3\'s Testing testing 123', tags: [], isComplete: false, userId: 3 },
      ];

      spyOn(window.sessionStorage, 'getItem').and.callFake(key => {
        expect(key).toBe('user');
  
        return '';
      });
  
      service.getTodos().subscribe(todos => {
        expect(todos).not.toEqual(mockTodos);
        expect(todos).toHaveSize(0);
      });
  
      const req = httpTestingController.expectOne('api/todos');
  
      expect(req.request.method).toBe('GET');
  
      req.flush(mockTodos);
  
      httpTestingController.verify();
    });

    it('Should return an empty list if the request fails', () => {
      spyOn(window.sessionStorage, 'getItem').and.callFake(key => {
        expect(key).toBe('user');
  
        return '';
      });
  
      service.getTodos().subscribe(todos => {
        expect(todos).toEqual([]);
      });
  
      const req = httpTestingController.expectOne('api/todos');
  
      expect(req.request.method).toBe('GET');
  
      req.flush('Todo: Fix todos endpoint', { status: 500, statusText: 'Internal Server Error' });
  
      httpTestingController.verify();
    });
  });

  describe('addTodo', () => {
    it('Should add a todo', () => {
      const mockTodo = { dateCreated: new Date(2022, 3), text: 'Testing testing 123', tags: [], isComplete: false };
      const mockResult: Todo = { id: 11, ...mockTodo, userId: 1 };

      spyOn(window.sessionStorage, 'getItem').and.callFake(key => {
        expect(key).toBe('user');
  
        return '{ "id": 1 }';
      });
  
      service.addTodo(mockTodo).subscribe(todo => {
        expect(todo).toEqual(mockResult);
      });
  
      const req = httpTestingController.expectOne('api/todos');
  
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ ...mockTodo, userId: 1});

      req.flush(mockResult);
  
      httpTestingController.verify();
    });
  });

  it('Should not add a todo if no user is logged in', () => {
    const mockTodo = { dateCreated: new Date(2022, 3), text: 'Testing testing 123', tags: [], isComplete: false };
    const mockResult: Todo = { id: 11, ...mockTodo, userId: 1 };

    spyOn(window.sessionStorage, 'getItem').and.callFake(key => {
      expect(key).toBe('user');

      return '';
    });

    service.addTodo(mockTodo).subscribe(todo => {
      expect(todo).toEqual(mockResult);
    });

    httpTestingController.expectNone('api/todos');

    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
