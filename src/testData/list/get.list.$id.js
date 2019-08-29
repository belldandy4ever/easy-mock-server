const db = require('./db').db

const getDetailTableDataById = require('../../utils').getDetailTableDataById

module.exports = function(query){
  return {
    "errcode":0,
    "errmsg":"",
    "data":getDetailTableDataById(query, db)
  }
}
