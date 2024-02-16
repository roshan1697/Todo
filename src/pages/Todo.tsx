import Navbar from "../components/navbar"
import { useState,useEffect } from "react"
import axios from "axios"
import Card from "../components/card"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { authState, todoState } from "../store/authState"
const Todo = () => {
    
    const authStateValue = useRecoilValue(authState);
    const setTodosState = useSetRecoilState(todoState)
    const todoStateValue = useRecoilValue(todoState)
  
  // const socket = io('http://localhost:3000',{ autoConnect: false})

    
  useEffect(()=>{
    // socket.connect()
    axios.get('http://localhost:3000/todo/todos',{
      headers:{
        Authorization:'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((res)=>{
     
      setTodosState({isLoading:false,isTodo:res?.data.data})
    
    })
    .catch((err)=>{
      console.log(err)
      setTodosState({isLoading:true,isTodo:[]})
    })
    
  },[])
  return (
    <>
      <div className='m-6 '>

      <Navbar/>
      <div className="flex items-center justify-between p-3">
                <h2 className="text-3xl font-semibold">Welcome {authStateValue.username}</h2>
                <div >
                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 border-2 rounded-xl hover:bg-blue-300" onClick={() => {
                        localStorage.removeItem("token");
                        window.location = "/login";
                    }}>Logout</button>
                </div>
            </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {todoStateValue.isLoading ?
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" >
          <span className="sr-only">Loading...</span>
        </div>
        
        :
          
          todoStateValue.isTodo.map((todo, i)=>{
           return <Card key={i} todo={todo}/>
            
          })
         
        }
      
      
      </div>


      </div>
    </>
  )
}

export default Todo