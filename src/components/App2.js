import React,{useState, useRef, useCallback} from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';

const App = () =>{
 // const [todos, setTodos] = useState(createBulkTodos);
  const [todos, setTodos] = useState([
    {
      id:1,
      text:'aaa',
      checked: false
    },
    {
      id:2,
      text : 'bbb',
      checked: false
    },
    {
      id:3,
      text:'ccccc',
      checked: true
    }
  ]);
  // 고유값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    text =>{
      const todo = {
        id: nextId.current,
        text,
        checked:false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );

  const onRemove = useCallback(
    id=>{
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    id=>{
      setTodos(
        todos.map(todo=>
          todo.id === id ? { ...todo, checked: !todo.checked} : todo 
        ),
      );
    },
    [todos]
  );

  return (
  <TodoTemplate>
    <TodoInsert onInsert={onInsert} />
    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
  </TodoTemplate>
  );
};

export default App;