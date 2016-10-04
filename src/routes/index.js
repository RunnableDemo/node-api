import express from 'express'
import low from 'lowdb'

import { name, version } from '../../package.json'

const router = express.Router()
const db = low('db.json')

router.get('/', (req, res) => {
  res.send({ name, version })
})

router.get('/todos', (req, res) => {
  res.json(db.get('todos').value())
})

router.get('/todos/:id', (req, res) => {
  if (!req.params.id) return res.sendStatus(400)
  let todo = db.get('todos')
    .find({ id: req.params.id })
    .value()
  if (!todo) {
    res.sendStatus(404)
  }
  res.json(todo)
})

router.post('/todos', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let body = req.body
  body.id = db.get('todos').size().value().toString(36)
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
    .find({ id: req.body.id })
    .push(req.body)
    .value()
  if (!todo) {
    res.sendStatus(500)
  }
  res.json(todo)
})

router.delete('/todos/:id', (req, res) => {
  let todo = db.get('todos')
    .find({ id: req.params.id })
    .remove({ id: todo.id }).value()
  res.sendStatus(204)
})

export default router
