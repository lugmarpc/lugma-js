import { Result, Transport, Stream } from '@lugma/server-helpers'
import { Message } from './Base.types'
export * from './Base.types'
export interface Server<T> {
	echo(m: Message, extra: T): Promise<Result<Message, void>>
}
export function bindServerToTransport<T>(impl: Server<T>, transport: Transport<T>) {
	transport.bindMethod("Test/Base/echo", (content: any, extra: T | undefined) => impl.echo(content['m'], extra))
}
