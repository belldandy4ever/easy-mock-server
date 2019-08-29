const db = require('./db').db
const getTableReturnData = require('../../utils').getTableReturnData

module.exports = function(query){
  const data = getTableReturnData(query,db)
  return data
}
