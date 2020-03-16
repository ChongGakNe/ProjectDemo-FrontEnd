import React,{ useEffect, useState, useRef, useCallback} from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import axios from 'axios';

const Home = () =>{
    // const [todos, setTodos] = useState(createBulkTodos);
    const [todos, setTodos] = useState([]);
    let count = 0;
    const fetchUrl = async ()=> {
        // fetch 방식으로 서버에 get 던지기
        // const response = await fetch('api/events',{method : 'GET'});
        // const json = await response.json();
        // setTodos(json);

        // axios 방식으로 서버에 get 던지기     axios.get(url, config)
        const response = await axios.get('api/events');
        setTodos(response.data);
        count = Object.keys(response.data).length + 1;          // 현재는 DB에 있는 갯수+1 을 저장하지만, 실제로는 DB에 저장된 데이터중 가장 큰 id값을 가져와야함
        console.log("count : ",count);
    }

    useEffect(()=>{
        fetchUrl();
    },[]);

     // 고유값으로 사용될 id
     // ref를 사용하여 변수 담기
    const nextId = useRef(0);

    const onInsert = useCallback(
        context =>{
            const todo = {
                id: nextId.current,
                context,
                checked:false
            };
            setTodos(todos => todos.concat(todo));
            console.log("todos : ",todos);
            nextId.current += 1;
            //  fetch 방식으로 서버에 post 던지기
            //  fetch('api/event',{
            //     method : 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(todo)
            // });

            // axios 방식으로 서버에 post 던지기        axios.post(url, body, config)
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            axios.post('api/event',todo,config);
            console.log("insert after nextId : ",nextId);
        },
       [todos]
    );
   
    const onRemove = useCallback(
       id=>{
            setTodos(todos => todos.filter(todo => todo[id] === id));
            // fetch 방식으로 서버에 delete 던지기
            // fetch(`api/event/${id}`,{
            //     method : 'DELETE',
            //     headers : {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     } 
            // });

            // axios 방식으로 서버에 delete 던지기
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            axios.delete(`api/event/${id}`,config);  
            console.log("delete after nextId : ",nextId);
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
            console.log("id : ",id);
            console.log("todo : ",todos);
            //fetch 방식으로 서버에 post 던지기
            fetch('api/event',{
                method : 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todos.filter(todo=>todo.id===id)[0])
            });
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