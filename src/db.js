import low from 'lowdb'

export default callback => {
  const db = low('todos.json')

  // connect to a database if needed, then pass it to `callback`:
  callback(db)
}
