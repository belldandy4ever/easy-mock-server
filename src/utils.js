const Random = require('mockjs').Random

exports.getTableReturnData = function(query,dbData){
  const params = {}
  for(let key in query){
    if(key === 'page' || key === 'pageSize'){
      continue
    }
    params[key] = query[key]
  }

  const filteredDb = dbData.filter(item => {
    for(let param in params){
      const paramInItem = item[param] + ''
      const paramInParams = params[param] + ''
      if(!paramInItem.includes(paramInParams)){
        return false
      }
    }
    return true
  })

  const page = query.page - 0
  const pageSize = query.pageSize - 0
  const startIndex = (page * pageSize) 
  const endIndex = (startIndex + pageSize) >= filteredDb.length ? filteredDb.length - 1 : (startIndex +pageSize) 
  const res = filteredDb.length < pageSize ? [...filteredDb] : filteredDb.slice(startIndex,endIndex)
  return {
    data:res,
    total:filteredDb.length
  }
}

exports.getDetailTableDataById = function(query,dbData){
  const id = query.id || ''
  const resData = dbData.find(data => data.id === id)
  return resData
}

exports.deleteTableDataById = function(query,dbData){
  const id = query.id || ''
  const projectIndex = dbData.findIndex(data => data.id === id)
  dbData.splice(projectIndex,1)
  return {}
}

exports.updateTableDataById = function(query, dbData){
  const id = query.id
  const itemIndex = dbData.findIndex(data => data.id === id)
  if(itemIndex !== -1){
    dbData[itemIndex] = {...dbData[itemIndex], ...query}
  }
  return {}
}

exports.getRandomIsoDateTimeString = function(){
  return new Date(Random.datetime()).toISOString()
}

exports.generateArray = function(arrayLength, dataGenerator){
  const resArray = []
  for(let i = 0 ; i < arrayLength ; i ++ ){
    resArray.push(dataGenerator())
  }
  return resArray
}

