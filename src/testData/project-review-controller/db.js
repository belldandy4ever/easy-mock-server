const Mock = require('mockjs')
const Random = Mock.Random
const utils = require('../../utils')
const usersDb = require('../user-controller/db.json')
const getRandomIsoDateTimeString = utils.getRandomIsoDateTimeString
const generateArray = utils.generateArray

function getSingleAcceptor(){
    const usersDbIndex = Random.natural(0,usersDb.length - 1)
    return (usersDb[usersDbIndex])
}

function getSingleApprover(){
    const usersDbIndex = Random.natural(0,usersDb.length - 1)
    return (usersDb[usersDbIndex])
}

function getSingleFollower(){
    const usersDbIndex = Random.natural(0,usersDb.length - 1)
    return (usersDb[usersDbIndex])
}

function getSingleReviewManager(){
    const usersDbIndex = Random.natural(0,usersDb.length - 1)
    return (usersDb[usersDbIndex])
}

function getSingleReviewProcess(){
    return {
        "id":Random.id(),
        "name":Random.csentence(3,5)
    }
}

function getSingleReviewer(){
    const usersDbIndex = Random.natural(0,usersDb.length - 1)
    return (usersDb[usersDbIndex])
}

function getSingleMockData(isEmpty = false){
    return (Mock.mock({
        "id":"@id",
        "acceptorList":new Array(1).fill(undefined).map(()=>getSingleAcceptor()),
        "approverList":  new Array(1).fill(undefined).map(()=>getSingleApprover()),
        "content": Random.csentence(),
        "creatorName": "@cname",
        "followerList": generateArray(Random.natural(3,33), getSingleFollower),
        "name":"@cname",
        "planReviewDate":getRandomIsoDateTimeString(),
        "realReviewDate":getRandomIsoDateTimeString(),
        "remark":Random.csentence(),
        "reviewManagerList": new Array(1).fill(undefined).map(()=>getSingleReviewManager()),
        "reviewProcess":getSingleReviewProcess(),
        "reviewerList":new Array(1).fill(undefined).map(()=>getSingleReviewer()),
        "status|1": ["WAIT_ACCEPT", "IN_ACCEPT", "DENY_ACCEPT", "WAIT_REVIEW" ,"IN_REVIEW", "DENY_REVIEW" , "WAIT_APPROVE", "IN_APPROVE", "DENY_APPROVE", "PASS", "END"],
        "type|1": ["PROJECT_CREATE", "PROJECT_NORMAL"]
    }))
}

const db = generateArray(Random.natural(20,100),getSingleMockData)

exports.db = db
exports.getData = getSingleMockData