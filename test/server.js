/**
* @author Pork
* @description jest server
* @created_at 2020/11/18
* @updated_at
*/

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
