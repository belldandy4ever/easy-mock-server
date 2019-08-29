const db = require('./db').db
const deleteTableDataById = require('../../utils').deleteTableDataById
module.exports = function(query){
  return deleteTableDataById(query,db)
}