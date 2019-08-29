const db = require('./db').db
const getData = require('./db').getData

module.exports = function(query){
  let data = getData()
  data = {...data, ...query, id:data.id}
  db.unshift(data)
  return {
    "errcode":0,
    "errmsg":"",
    "data":{}
  }
}