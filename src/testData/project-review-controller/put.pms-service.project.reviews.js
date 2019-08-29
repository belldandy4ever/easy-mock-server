const db = require('./db').db
const updateTableDataById = require('../../utils').updateTableDataById
module.exports = function(query){
  return updateTableDataById(query,db)
}