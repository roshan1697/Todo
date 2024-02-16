
import axios from "axios"
import DeleteButton from "../assets/deletebutton"
import {  useRecoilValue, useSetRecoilState } from "recoil"
import { todoState } from "../store/authState"

const Card = (todo) => {
  const setTodoState = useSetRecoilState(todoState)
  const useTodoValue  = useRecoilValue(todoState)

  const markDone = async(id )=>{
    const res = await axios.patch('http://localhost:3000/todo/todos/'+id+'/done', " ",{
      headers:{
        Authorization:'Bearer ' + localStorage.getItem('token')
      }
    } )
    const Todo =  res?.data
    if(Todo) {
      setTodoState({isLoading:false,isTodo:useTodoValue.isTodo.map((todo)=>{
        return todo._id === Todo._id ? Todo : todo
       })})
      
       
    }
   
  }

  
  return (
  <div className="flex flex-col gap-2 p-4 m-2.5 overflow-hidden bg-white rounded-lg has-shadow w-80 ">
  <div className="flex items-baseline justify-between">
      <h3 className="text-lg font-semibold">{todo.todo.title}</h3>
      <div className="text-xs">Added {new Date().getDate() - new Date(todo.todo.updatedAt).getDate()} days ago.</div>
  </div>
  <div className="text-sm">
      <p>
          {todo.todo.description}
      </p>
   
        
      <DeleteButton value={todo.todo._id}/>
      <button  className=' mt-3 font-semibold bg-blue-500 rounded-lg text-[white] p-2 'onClick={()=>markDone(todo.todo._id)} >{todo.todo.done ? 'Done' : 'Mark as Done'}</button>
     
  </div>
</div>
  )
}

export default Card