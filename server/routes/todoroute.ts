import express from 'express'
import authenticateJwt from '../middleware/auth';
import { Todo } from '../db/TodoSchema';
const router = express.Router();

router.get('/todos', authenticateJwt, async (req, res) => {
    try {
        const todos = await Todo.find({})
    
        return res.status(200).json({
          data: todos,
        })
      }
       catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
    })
  
  router.post('/todos', authenticateJwt, async (req,res)=>{
    const userId = req.headers['userId']
    const done = false

    try {
        if (
            !req.body.title ||
            !req.body.description 
          ) {
            return res.status(400).send({
              message: 'Send all required fields: title, description',
            })
          }
          const newTodo = {
            
            title: req.body.title,
            description: req.body.description,
            done,
            userId
          }
          const todo = await Todo.create(newTodo)
          // io.emit('newTodo', todo)
          return res.status(201).send(todo)
        } catch (err) {
          console.log(err);
          res.status(500).send(err)
        }
    
  })
  
router.delete('/todos/:id', authenticateJwt, async (req, res) => {
    const userId = req.headers['userId']
    const { id } = req.params
    
    try {
  
      const result = await Todo.findByIdAndDelete({ _id: id, userId })
      // io.emit('deleteTodo', id)
      if (!result) {
        return res.status(404).send('Todo not found' )
      }
  
      return res.status(200).send('Todo deleted successfully')
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

  router.patch('/todos/:todoId/done', authenticateJwt, async(req, res) => {
    const  {todoId}  = req.params;
    const userId = req.headers['userId']
  try {
    const updatedTodo = await Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  }catch(err)  {
        res.status(500).json({ error: 'Failed to update todo' });
      }
  });

  export default router