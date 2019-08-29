const Mock = require('mockjs')
const Random = Mock.Random
const utils = require('../../utils')
const usersDb = require('../user-controller/db.json')
const projectsDb = require('../project-controller/db').db
const getRandomIsoDateTimeString = utils.getRandomIsoDateTimeString
const generateArray = utils.generateArray

function getSingleProject(){
    const projectsDbIndex = Random.natural(0,projectsDb.length - 1)
    const project = projectsDb[projectsDbIndex]
    return ({
        "name": project.name,
        "id": project.id
    })
}

function getSingleProjectStage(){
    return ({
        "name": Random.csentence(3,5),
        "id": Random.id()
    })
}

function getSingleReviewBy(){
    const usersDbIndex = Random.natural(0,usersDb.length - 1)
    return (usersDb[usersDbIndex])
}

function getSingleMockData(isEmpty = false){
    return (Mock.mock({
        "description": Random.csentence(),
        "dificulty": Random.csentence(3,5),
        "grade": Random.csentence(3,5),
        "id": Random.id(),
        "name": Random.csentence(3,5),
        "origin": Random.csentence(3,5),
        "planEndDate": getRandomIsoDateTimeString(),
        "planStartDate": getRandomIsoDateTimeString(),
        "planWorkHour": Random.natural(1,20),
        "project": getSingleProject(),
        "projectStage": getSingleProjectStage(),
        "realEndDate": getRandomIsoDateTimeString(),
        "realStartDate": getRandomIsoDateTimeString(),
        "realWorkHour": Random.natural(1,20),
        "remark":Random.csentence(),
        "reviewedBy": getSingleReviewBy(),
        "status|1": ["UNRELEASED","NOT_START","IN_PROGRESS","SUSPEND","FINISHED","CHECKED"],
        "type": Random.csentence(1,3)
    }))
}

const db = generateArray(Random.natural(20,100),getSingleMockData)

exports.db = db
exports.getData = getSingleMockData