import express from 'express'
import low from 'lowdb'
import moment from 'moment'

import { name, version } from '../../package.json'

const router = express.Router()
const db = low('db.json')

router.get('/', (req, res) => {
  res.send({ name, version })
})

router.get('/todos', (req, res) => {
  let todos
  if (!req.params) {
    todos = db.get('todos').value()
  } else {
    todos = db.get('todos')
      .find(req.params)
      .value()
  }

  res.json(todos)
})

router.get('/todos/:id', (req, res) => {
  if (!req.params.id) return res.sendStatus(400)
  let todo = db.get('todos')
    .find({ id: parseInt(req.params.id) })
    .value()
  if (!todo) {
    res.sendStatus(404)
  }
  res.json(todo)
})

router.post('/todos', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let body = {
    id: parseInt(db.get('todos').size().value()),
    name: body.name ? body.name : 'Do something',
    completed: body.completed ? body.completed : false,
    due: body.due ? body.due : moment().add(7, 'd')
  }
  let todo = db.get('todos')
    .push(body)
    .value()
  if (!todo) {
    res.sendStatus(500)
  }
  res.json(todo)
})

router.put('/todos', (req, res) => {
  let todo = db.get('todos')
    .find({ id: parseInt(req.body.id) })
    .push(req.body)
    .value()
  if (!todo) {
    res.sendStatus(500)
  }
  res.json(todo)
})

router.delete('/todos/:id', (req, res) => {
  let todo = db.get('todos')
    .find({ id: parseInt(req.params.id) })
    .remove({ id: todo.id }).value()
  res.sendStatus(204)
})

export default router
