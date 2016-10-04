import express from 'express'
import mongojs from 'mongojs'

const db = mongojs('mongodb://' + process.env.MONGO_HOST + '/todoapp', ['todos'])

export default (db) => {
  let router = express.Router()

  /* GET home page. */
  router.get('/', (req, res) => {
    res.json({
      message: 'todos api',
      version: '1.0.0'
    })
  })

  router.get('/api/todos', (req, res) => {
    db.todos.find((err, data) => {
      if (err) {
        throw new Error(err)
      }
      res.json(data)
    })
  })

  router.post('/api/todos', (req, res) => {
    db.todos.insert(req.body, (err, data) => {
      if (err) {
        throw new Error(err)
      }
      res.json(data)
    })
  })

  router.put('/api/todos', (req, res) => {
    db.todos.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }, {}, (err, data) => {
      if (err) {
        throw new Error(err)
      }
      res.json(data)
    })
  })

  router.delete('/api/todos/:_id', (req, res) => {
    db.todos.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', (err, data) => {
      if (err) {
        throw new Error(err)
      }
      res.json(data)
    })
  })

  return router
}
