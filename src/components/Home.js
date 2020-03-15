import React,{ useEffect, useState, useRef, useCallback} from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import axios from 'axios';

const Home = () =>{
    // const [todos, setTodos] = useState(createBulkTodos);
    const [todos, setTodos] = useState([]);

    const fetchUrl = async ()=> {
        const response = await axios.get('api/events');
        //const json = await response.json();
        console.log(response);
        setTodos(response.data);
    }

    useEffect(()=>{
        fetchUrl();
    },[]);

     // 고유값으로 사용될 id
     // ref를 사용하여 변수 담기
    const nextId = useRef(4);

    const onInsert = useCallback(
        context =>{
         const todo = {
           id: nextId.current,
           context,
           checked:false
         };
         setTodos(todos => todos.concat(todo));
         nextId.current += 1;
        },
       [todos]
    );
   
    const onRemove = useCallback(
       id=>{
         setTodos(todos => todos.filter(todo => todo.id !== id));
       },
       [todos]
    );
   
    const onToggle = useCallback(
        id=>{
        setTodos( todos=>
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

export default Home;