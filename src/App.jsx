import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue==null) return []
    return JSON.parse(localValue)
  })
  
  
  
  useEffect(()=>{
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if (todo.edit===true) {
            return {...todo, edit: false}
          }
          return todo
      })
    })
  }, [])
  
  
  useEffect(()=>{
    localStorage.setItem("ITEMS", JSON.stringify(todos))
    console.log("ITEMS SAVED ")
  }, [todos])
  
  
  

  const handleChange = (event) => {
    setNewItem(event.target.value);
    console.log(newItem)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTodos(currentTodos => {
      return [...currentTodos, {
        id: crypto.randomUUID(),
        title: newItem,
        completed: false,
        edit: false
    }]
    })
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if (todo.edit===true) {
            return {...todo, edit: false}
          }
          return todo
      })
    })
    setNewItem("")
  }
  
  
 const toggleTodo = function (id) {
   setTodos(currentTodos=>{
     return currentTodos.map(todo=>{
       if(todo.id===id) {
         console.log(todo.completed)
         return {...todo, completed: !todo.completed}
       }
       return todo
     })
   })
 }
 
const deleteTodo = function(id) {
   setTodos(currentTodos=>{
     return currentTodos.filter(todo=>todo.id !== id)
   })
 }
 
   

  // Function to toggle the navigation visibility
  
  const toggleEdit = (id) => {
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if (todo.id!==id && todo.edit===true) {
            return {...todo, edit: false}
          }
        if (todo.id===id){ 
          if (todo.edit===false) {
            console.log(todo.title)
            setNewItem(todo.title)
            document.querySelector("#item").focus();
            return {...todo, edit: !todo.edit}
          }
          if (todo.edit===true) {
            let editedTitle=newItem
            setNewItem("")
            return {...todo, title: editedTitle, edit: !todo.edit}
            setNewItem("")
          }
        }
        return todo
        
        
      })
      })
  }
  
 
 

  return (
    <div>
    <p>{newItem}</p>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input type="text" value={newItem} onChange={handleChange} id="item"/>
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className = "header"> ToDo List </h1>  
      <ul className = "list">
      {todos.length===0 && "No Todos"}
      {todos.map(todo => {
        return <li key={todo.id}>
          <label>
            <input 
            onChange={e=>toggleTodo(todo.id)}
            type="checkbox"
            checked={todo.completed}
            />
            {todo.title}
          </label>
          <button onClick={(e)=>toggleEdit(e.target.id)} className="btn" id={todo.id}>{todo.edit?"Ok":"Edit"}</button>
          <button onClick={()=>deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
        </li>
        
      })
    }

    </ul> 
    </div>
  )
}

export default App