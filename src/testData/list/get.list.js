const db = require('./db').db
const getTableReturnData = require('../../utils').getTableReturnData

module.exports = function(query){
    return {
        "errcode":0,
        "errmsg":"",
        "data":getTableReturnData(query, db)
    }
}