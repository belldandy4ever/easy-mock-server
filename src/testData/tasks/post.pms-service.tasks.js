const db = require('./db').db
const getData = require('./db').getData

module.exports = function(query){
  let data = getData(true)
  data = {...data, ...query, id:data.id}
  db.unshift(data)
  return {}
}