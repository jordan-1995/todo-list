import './App.css';
import Header from './MyComponents/Header';
import {Todos} from "./MyComponents/Todos";
import {Footer} from "./MyComponents/Footer";
import { About } from "./MyComponents/About";
import React, { useState,useEffect } from 'react';
import {AddTodo} from "./MyComponents/AddTodo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [mode, setMode] = useState('light')

  const toggleMode = () =>{
    if(mode==='light'){
      setMode('dark')
      document.body.style.backgroundColor = 'grey'
      document.body.style.color = 'white'
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'white'
      document.body.style.color = 'black'
    }
  }

  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete=(todo)=>{
    console.log('onDelete of todo', todo);
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo=(title, desc)=>{
    console.log("Adding todo", title, desc);
    let sno;
    if (todos.length===0){
      sno=0;
    }
    else{
      sno=todos[todos.length-1].sno+1;
    }
    const myTodo ={
      sno:sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos]= useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
    <Router>
      <Header title="Todos List" mode={mode} toggleMode={toggleMode} searchBar={true}/>
      <Switch>
          <Route exact path="/" render={()=>{
            return(
            <>
              <AddTodo addTodo={addTodo}/>
              <Todos todos={todos} onDelete={onDelete}/>
            </>
            )
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
