const app = require('../server')
const request = require('supertest')
const {faker} = require('@faker-js/faker')

let name = faker.name.firstName();
let address = faker.address.streetAddress();
let phone = faker.address.number();
let date = faker.date.datetime()

console.log(name);
console.log(address);
console.log(phone);
console.log(date);