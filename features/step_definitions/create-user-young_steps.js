import { BeforeStep, When, Then, Given } from '@cucumber/cucumber'
import assert from 'node:assert'

let _testServerAddress = ''
let _context = {}

function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
        method:'POST',
        body: JSON.stringify(data)
    })
}

async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`)
    return await user.json()
}

BeforeStep(function() {
    _testServerAddress = this.testServerAddress
})
    

When(`I create a new user with the following details 1:`, async function(dataTable) {
    const [data] = dataTable.hashes()
    const response = await createUser(data)
    assert.strictEqual(response.status, 201)
    _context.userData = await response.json()
    assert.ok(_context.userData.id)
})

Then(`I request the API with the user's ID "1"`, async function() {
    const user = await findUserById(_context.userData.id)
    _context.createUserData = user
})

Then(`I should receive a JSON response with the user's details "1"`, async function() {
    const expectedUser = {
        "birthDay": "2000-01-01",
        "category": "young-adult",
        "id": _context.createUserData.id,
        "name": "Erick Wendel",
    }

    assert.equal(_context.createUserData.name, expectedUser.name)
    assert.equal(_context.createUserData.birthDay, expectedUser.birthDay)
    assert.equal(_context.createUserData.id, expectedUser.id)
    assert.equal(_context.createUserData.category, expectedUser.category)
})

Then(`The user's category should be {string} "1"`, async function(category) {
    assert.deepStrictEqual(_context.createUserData.category, category)
})