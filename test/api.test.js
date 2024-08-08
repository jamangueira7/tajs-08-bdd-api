import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals'
import { server} from '../src/api.js'

/**
 * Deve cadastrar usuarios e definir uma categoria onde:
 * - Jovens Adultos 18-25
 * - Adultos 26-50
 * - Idosos 51+
 * - Menor estourar um erro
*/

describe('API Users E2E Suite', () => {
    function waitForServerStatus(server) {
        return new Promise((resolve, reject) => {
            server.once('error', (err) => reject(err))
            server.once('listening', () => resolve())
        })
    }

    function createUser(data) {
        return fetch(`${_testServerAddress}/users`, {
            method:'POST',
            body: JSON.stringify(data)
        })
    }

    async function findUserById(id) {
        const user = await fetch(`${_testServerAddress}/users/${id}`)
        return user.json()
    }

    let _testServer
    let _testServerAddress

    beforeAll(async () => {
        _testServer = server.listen()
        
        await waitForServerStatus(_testServer)
        const serverInfo = _testServer.address()
        _testServerAddress = `http://localhost:${serverInfo.port}`
    })

    afterAll(() => {
        server.closeAllConnections()
        _testServer.close()
    })

    it('should return hello word', async () => {
        const response = await fetch(`${_testServerAddress}/test`)

        expect(response.status).toBe(404)
        const result = await response.text()
        expect(result).not.toBeUndefined()
        expect(result).toBe('hello word')
    })

    it('should register a new user with young-adult catetory', async () => {
        const expectCategory = 'young-adult'
        jest.useFakeTimers({
            now: new Date('2024-08-07T00:00')
        })
        const response = await createUser({
            name: 'Xuxa da Silva',
            birthDay: '2005-01-01'
        })

        expect(response.status).toBe(201)
        const result = await response.json()
        expect(result.id).not.toBeUndefined()
        const user = await findUserById(result.id)
        expect(user.category).toBe(expectCategory)
    })    
    it('should register a new user with adult catetory', async () => {
        const expectCategory = 'adult'
        jest.useFakeTimers({
            now: new Date('2024-08-07T00:00')
        })
        const response = await createUser({
            name: 'Xuxa da Silva',
            birthDay: '1987-01-01'
        })

        expect(response.status).toBe(201)
        const result = await response.json()
        expect(result.id).not.toBeUndefined()
        const user = await findUserById(result.id)
        expect(user.category).toBe(expectCategory)
    })    
    it('should register a new user with senior catetory', async () => {
        const expectCategory = 'senior'
        jest.useFakeTimers({
            now: new Date('2024-08-07T00:00')
        })
        const response = await createUser({
            name: 'Xuxa da Silva',
            birthDay: '1958-01-01'
        })

        expect(response.status).toBe(201)
        const result = await response.json()
        expect(result.id).not.toBeUndefined()
        const user = await findUserById(result.id)
        expect(user.category).toBe(expectCategory)
    })    
    it('should throw an error when registering a under-age user', async () => {
        jest.useFakeTimers({
            now: new Date('2024-08-07T00:00')
        })
        const response = await createUser({
            name: 'Xuxa da Silva',
            birthDay: '2013-01-01'
        })

        expect(response.status).toBe(400)
        const result = await response.json()
        expect(result).toEqual({
            message: 'User must be 18yo or older'
        })
    })    
})

