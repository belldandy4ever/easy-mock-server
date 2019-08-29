const db = require('./db').db

const getDetailTableDataById = require('../../utils').getDetailTableDataById

module.exports = function(query){
  return getDetailTableDataById(query, db)
}
