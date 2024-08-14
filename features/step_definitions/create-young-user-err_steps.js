import { BeforeStep, When, Then, Given } from '@cucumber/cucumber'
import assert from 'node:assert'

let _testServerAddress = ''
let _context = {}

async function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
        method:'POST',
        body: JSON.stringify(data)
    })
}

BeforeStep(function() {
    _testServerAddress = this.testServerAddress
})


When(`I create a young user with the following details:`, async function(dataTable) {
    const [data] = dataTable.hashes()   
    _context.response = await createUser(data) 
    assert.strictEqual(_context.response.status, 400)
    assert.strictEqual(_context.response.statusText, 'Bad Request')
})

Then(`I should receive an error message that the user must be at least 18 years old`, async function() {
    const error = await _context.response.json()
    assert.strictEqual(error.message, 'User must be 18yo or older')
})
