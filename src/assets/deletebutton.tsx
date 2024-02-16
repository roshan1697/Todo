import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { todoState } from "../store/authState"

const DeleteButton = ({value}) => {
  const setTodoState = useSetRecoilState(todoState)
  const todoValue = useRecoilValue(todoState)  
    const handleDelete = async() => {
    try {

     const res = await axios.delete('http://localhost:3000/todo/todos/'+ value,{
        headers:{
          Authorization:'Bearer ' + localStorage.getItem('token')
        }
      } )
      
      if(res?.statusText === 'OK'){
       
        setTodoState({isLoading:false,isTodo:todoValue.isTodo.filter((todo)=>{return todo._id !== value})})
      }
    }
        
        catch(err){
          console.log(err)
        }
      }
    
  return (
    <button type="button" onClick={handleDelete} className="inline-flex items-center justify-center float-right gap-2 px-5 py-2 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 m-2.5">
    DELETE
  </button>
  )
}

export default DeleteButton