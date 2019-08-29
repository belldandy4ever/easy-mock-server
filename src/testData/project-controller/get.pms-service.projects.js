const db = require('./db').db
const getTableReturnData = require('../../utils').getTableReturnData

module.exports = function(query){
  return getTableReturnData(query,db)
}