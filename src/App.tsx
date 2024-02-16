
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Todo from './pages/Todo'
import { useSetRecoilState } from 'recoil'
import { authState } from './store/authState'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await axios.get('http://localhost:3000/user/me', {
              headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data.username) {
              
              setAuth({token:response.data.token,  username: response.data.username });
              navigate("/todos");
          } else {
              navigate("/login");
          }
      } catch (e) {
          navigate("/login");
      }
  }
  useEffect(() => {
      init();
  }, [])

  return (
    <>
      <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/' element={<Login />} />
                    
    
                    <Route path='/todos' element={<Todo />} />
                    
                </Routes>
      
    </>
  )
}

export default App
