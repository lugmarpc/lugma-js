import { afterAll, afterEach, beforeAll, beforeEach, expect, test } from 'vitest'
import * as Expresss from 'express'
import * as HTTP from 'http'
import * as ExpressHelpers from '@lugma/express-helpers'
import { bindServerToTransport, Message } from './Base.server'
import { Result } from '@lugma/server-helpers'
import { SuperTestTransport } from './mock'
import { makeClientFromTransport } from './Base.client'

let app: Express.Application
let server: HTTP.Server

beforeAll(async () => {
    app = Expresss.default()

    const transport = new ExpressHelpers.ExpressTransport()
    bindServerToTransport({
        echo: async function (m: Message, extra: HTTP.IncomingHttpHeaders): Promise<Result<Message, void>> {
            return ["ok", m]
        }
    }, transport)

    app.use(transport.router)
})

test('hi', async () => {
    const transport = new SuperTestTransport(app)
    const client = makeClientFromTransport(transport)
    const msg = await client.echo({"hi": "world"})
    console.warn("msg is", msg)
    expect(msg.hi).toBe("world")
})
