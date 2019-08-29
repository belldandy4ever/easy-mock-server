const Mock = require('mockjs')
const Random = Mock.Random
const utils = require('../../utils')
const usersDb = require('../user-controller/db.json')
const officesDb = require('../office-controller/get.pms-service.sys.offices.json').content
const getRandomIsoDateTimeString = utils.getRandomIsoDateTimeString
const generateArray = utils.generateArray

function  getSingleAttachment(){
  return({
    "changed": getRandomIsoDateTimeString(),
    "changer": Random.string(),
    "created": getRandomIsoDateTimeString(),
    "creator": Random.cname(),
    "id": Random.id(),
    "lifeCycleState": Random.string(),
    "name": Random.cname(),
    "path": Random.string(),
    "size": Random.natural(1,100),
    "targetId": Random.id(),
    "targetType": Random.string()
  })
}

function getSingleCreator(){
  return ({
    "userId": Random.id(),
    "userName": Random.cname()
  })
}

function getSingleExtendField(){
  return ({
    "changed": getRandomIsoDateTimeString(),
    "changer": Random.string(),
    "code": Random.string(),
    "created": getRandomIsoDateTimeString(),
    "creator": Random.cname(),
    "id": Random.id(),
    "lifeCycleState": Random.string(),
    "value": Random.string()
  })
}

function getSingleFollower(){
  const usersDbIndex = Random.natural(0,usersDb.length - 1)
  return (usersDb[usersDbIndex])
}

function getSingleManager(){
  return ({
    "userId": Random.id(),
    "userName": Random.cname()
  })
}

function getSingleRole(){
  return ({
    "changed": getRandomIsoDateTimeString(),
    "changer": Random.cname(),
    "code": Random.string(),
    "created": getRandomIsoDateTimeString(),
    "creator": Random.cname(),
    "description": Random.cword(5,10),
    "id": Random.id(),
    "isSystem": Random.boolean(),
    "lifeCycleState": Random.string(),
    "name": Random.cword(4),
    "scope": Random.string()
  })
}

function getSingleMember(){
  return ({
    "changed": getRandomIsoDateTimeString(),
    "changer": Random.cname(),
    "created": getRandomIsoDateTimeString(),
    "creator": Random.cname(),
    "id": Random.id(),
    "lifeCycleState": Random.string(),
    "userId": Random.id(),
    "userName": Random.cname(),
    "roleList": generateArray(5,getSingleRole)
  })
}

function getSingleOrganization(){
  const officesDbIndex = Random.natural(0,officesDb.length - 1)
  return officesDb[officesDbIndex]
}

function getSingleAcceptor(){
  const usersDbIndex = Random.natural(0,usersDb.length - 1)
  return (usersDb[usersDbIndex])
}

function getSingleApprover(){
  const usersDbIndex = Random.natural(0,usersDb.length - 1)
  return (usersDb[usersDbIndex])
}

function getSingleReviewManager(){
  const usersDbIndex = Random.natural(0,usersDb.length - 1)
  return (usersDb[usersDbIndex])
}

function getSingleReviewer(){
  const usersDbIndex = Random.natural(0,usersDb.length - 1)
  return (usersDb[usersDbIndex])
}

function getSingleProjectReview(){
  return Mock.mock({
    "acceptorList": new Array(1).fill(undefined).map(()=>getSingleAcceptor()),
    "approverList":  new Array(1).fill(undefined).map(()=>getSingleApprover()),
    "content": Random.csentence(),
    "creatorName": "string",
    "followerList": new Array(1).fill(undefined).map(()=>getSingleFollower()),
    "name": Random.cname(),
    "id": Random.id(),
    "planReviewDate":  getRandomIsoDateTimeString(),
    "realReviewDate":  getRandomIsoDateTimeString(),
    "remark": Random.csentence(),
    "reviewManagerList": new Array(1).fill(undefined).map(()=>getSingleReviewManager()),
    "reviewProcess": {
      "id": Random.id(),
      "name": Random.cname()
    },
    "reviewerList": new Array(1).fill(undefined).map(()=>getSingleReviewer()),
    "status|1": ["WAIT_ACCEPT", "IN_ACCEPT", "DENY_ACCEPT", "WAIT_REVIEW" ,"IN_REVIEW", "DENY_REVIEW" , "WAIT_APPROVE", "IN_APPROVE", "DENY_APPROVE", "PASS", "END"],
    "type|1": ["PROJECT_CREATE", "PROJECT_NORMAL"]
  })
}


function getSingleMockData(isEmpty = false) {
  return (Mock.mock({
    "id":"@id",
    "attachmentList": generateArray(10,getSingleAttachment),
    "budgetPrice":"@natural",
    "content":"@natural",
    "contractPrice":"@natural",
    "creator": getSingleCreator(),
    "extendFieldList": generateArray(3, getSingleExtendField),
    "followerList": generateArray(Random.natural(3,33), getSingleFollower),
    "level": Random.string(),
    "manager": getSingleManager(),
    "memberList": generateArray(5,getSingleMember),
    "name": Random.cword(5),
    "organization": getSingleOrganization(),
    "origin": Random.string(),
    "planEndDate": getRandomIsoDateTimeString(),
    "planStartDate": getRandomIsoDateTimeString(),
    "planWorkHour": Random.natural(1, 100),
    "receiptPrice":"@natural",
    "remark": Random.csentence(),
    "projectReview": getSingleProjectReview(),
    "serialNumber": Random.id(),
    "shortName": Random.cword(5),
    "status|1": ["WAIT_ACCEPT", "IN_ACCEPT", "DENY_ACCEPT", "WAIT_REVIEW" ,"IN_REVIEW", "DENY_REVIEW" , "WAIT_APPROVE", "IN_APPROVE", "DENY_APPROVE", "PASS", "END"],
    "type|1": ["PROJECT_CREATE", "PROJECT_NORMAL"] 
   }))
}

const db = generateArray(Random.natural(20,100),getSingleMockData)

exports.db = db
exports.getData = getSingleMockData