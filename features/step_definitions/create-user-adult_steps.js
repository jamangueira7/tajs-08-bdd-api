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

BeforeStep(async function() {
    _testServerAddress = this.testServerAddress
})
    

When(`I create a new user with the following details 2:`, async function(dataTable) {
    const [data] = dataTable.hashes()
    const response = await createUser(data)
    assert.strictEqual(response.status, 201)
    _context.userData = await response.json()
    assert.ok(_context.userData.id)
})

Then(`the user should be categorized as an {string} "2"`, async function(category) {
    const user = await findUserById(_context.userData.id)
    assert.strictEqual(user.category, category)
})


When(`I request the user with ID "2"`, async function() {
    const user = await findUserById(_context.userData.id)
    _context.createUserData = user
    assert.strictEqual(user.id, _context.createUserData.id)
})

Then(`I should receive a JSON response with the user's details "2"`, async function() {
    const expectedUser = {
        "birthDay": "1980-01-01",
        "category": "adult",
        "id": _context.createUserData.id,
        "name": "Jane",
    }

    assert.equal(_context.createUserData.name, expectedUser.name)
    assert.equal(_context.createUserData.birthDay, expectedUser.birthDay)
    assert.equal(_context.createUserData.id, expectedUser.id)
    assert.equal(_context.createUserData.category, expectedUser.category)
})

Then(`the user's category should be {string} "2"`, function (category) {
    assert.strictEqual(_context.createUserData.category, category)
});