import { BeforeStep, When, Then} from '@cucumber/cucumber'
import assert from 'node:assert'

let _testServerAddress = ''
let _context = {}

function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
        method:'POST',
        body: JSON.stringify(data)
    })
}

BeforeStep(function() {
    _testServerAddress = this.testServerAddress
})


When(`I create a new user with the following details 5:`, async function(dataTable) {
    const [data] = dataTable.hashes()   
    _context.response = await createUser(data) 
    
    assert.strictEqual(_context.response.status, 400)
    assert.strictEqual(_context.response.statusText, 'Bad Request')
})

Then(`I should receive an error message that the birth date is invalid`, async function() {
    const error = await _context.response.json()
    assert.strictEqual(error.message, 'Invalid date')
    
})
