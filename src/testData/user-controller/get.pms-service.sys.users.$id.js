const db = require('./db.json')
const getDetailTableDataById = require('../../utils').getDetailTableDataById

module.exports = function(query){
  return getDetailTableDataById(query,db)
}