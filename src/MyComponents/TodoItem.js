import React from 'react'

export const TodoItem = ({onDelete, todo}) => {
    return (
        <div>
            <h3>{todo.title}</h3>
            <p>{todo.desc}</p>
            <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
        </div>
    )
}
