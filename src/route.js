const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')
const router = require('express').Router()

const exceptedMethods = ['get', 'post', 'put', 'delete']
const testDateDirPath = path.resolve(__dirname,'testData')

readAndSetRoute(testDateDirPath)

function readAndSetRoute(dirPath){
  fs.readdir(dirPath,function(err,files){
    if(err){
      return console.log(err)
    }
    for(let fileName of files){
      const filePath = `${dirPath}/${fileName}`
      const isDirectory = fs.lstatSync(filePath).isDirectory()
      if(isDirectory){
        readAndSetRoute(filePath)
      }else{
        setRoute(fileName,dirPath)
      }
    }
  })
}

function setRoute(fileName, dirPath){
  const fileNameArr = fileName.replace('$',':').split('.')
  const method = fileNameArr[0]
  const extName = fileNameArr[fileNameArr.length - 1]
  const route = '/' + fileNameArr.slice(1,fileNameArr.length-1).join('/')
  if(!exceptedMethods.includes(method)){
    return 
  }
  if(extName === 'json'){
    setJsonToRoute(route,method,`${dirPath}/${fileName}`)
  }
  if(extName === 'js'){
    setJsToRoute(route,method,`${dirPath}/${fileName}`)
  }
}

function setJsonToRoute(route, method, filePath){
  router[method](route,(req,res) => {
    fs.readFile(filePath,function(err,data){
      if(err){
        return console.log(err)
      }
      res.json({
        errcode:0,
        errmsg:'',
        data:Mock.mock(JSON.parse(data))
      })  
    })
  })
}

function setJsToRoute(route,method,filePath){
  const getResponse = require(filePath)
  router[method](route,(req,res) => {
    let query = {}
    Object.keys(req.query).length && (query = {...query,...req.query})
    Object.keys(req.params).length && (query = {...query,...req.params})
    req.body && req.body.data && (query = {...query, ...req.body.data})
    const data = getResponse(query,req,res)
    if(data && data.total !== undefined && data.data){
      res.header('Access-Control-Expose-Headers', 'pagetotalelements')
      res.set('pagetotalelements',data.total)
      res.json({
        errcode:0,
        errmsg:'',
        data:{
          content:data.data,
          totalElements:data.total
        }
      })
    }else{
      res.json({
        errcode:0,
        errmsg:'',
        data
      })  
    }
  })
}

module.exports = router

