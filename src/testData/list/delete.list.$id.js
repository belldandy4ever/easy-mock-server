const db = require('./db').db
const deleteTableDataById = require('../../utils').deleteTableDataById
module.exports = function(query){
  return {
    "errcode":0,
    "errmsg":"",
    "data":deleteTableDataById(query,db) 
  }
}