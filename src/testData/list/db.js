const Mock = require('mockjs')
const Random = Mock.Random
const utils = require('../../utils')


function getSingleItem(){
    return ({
        'id':Random.id(),
        'time': utils.getRandomIsoDateTimeString(),
        'name': Random.cname()
    })
}

const db = utils.generateArray(Random.natural(5,22),getSingleItem)

exports.db = db
exports.getData = getSingleItem