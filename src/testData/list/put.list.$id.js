const db = require('./db').db
const updateTableDataById = require('../../utils').updateTableDataById
module.exports = function(query){
  return {
    "errcode":0,
    "errmsg":"",
    "data":updateTableDataById(query, db)
  }
}