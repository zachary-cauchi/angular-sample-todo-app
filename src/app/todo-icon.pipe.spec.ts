import { TodoTag } from 'src/models/todo-tag';
import { TodoIconPipe } from './todo-icon.pipe';

describe('TodoIconPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoIconPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return an icon given it\'s id', () => {
    const tags: TodoTag[] = [
      { id: 1, text: 'test', icon: '🔧' }
    ];
    const pipe = new TodoIconPipe();
    
    const result = pipe.transform(tags[0].id, tags);
    
    expect(result).toBeTruthy();
    expect(result).toEqual(tags[0].icon);
  });

  it('Should return multiple icons given their ids', () => {
    const tags: TodoTag[] = [
      { id: 1, text: 'test', icon: '🔧' },
      { id: 2, text: 'shopping', icon: '🛒' },
      { id: 3, text: 'llama', icon: '🦙' },
    ];
    const pipe = new TodoIconPipe();
    
    const result = pipe.transform([tags[0].id, tags[2].id], tags);
    
    expect(result).toBeTruthy();
    expect(result).toEqual(`${tags[0].icon}${tags[2].icon}`);
  });

  it('Should not return an icon given a non-matching id', () => {
    const tags: TodoTag[] = [
      { id: 1, text: 'test', icon: '🔧' }
    ];
    const pipe = new TodoIconPipe();
    
    const result = pipe.transform(15, tags);
    
    expect(result).toBeFalsy();
    expect(result).toEqual('');
  });

  it('Should not return an icon given an empty tag list', () => {
    const tags: TodoTag[] = [
    ];
    const pipe = new TodoIconPipe();
    
    const result = pipe.transform(1, tags);
    
    expect(result).toBeFalsy();
    expect(result).toEqual('');
  });
});
