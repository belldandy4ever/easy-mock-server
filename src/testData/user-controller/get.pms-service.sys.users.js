const db = require('./db.json')
const getTableReturnData = require('../../utils').getTableReturnData

module.exports = function(query){
  return getTableReturnData(query,db)
}
