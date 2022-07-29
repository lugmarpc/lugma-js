import { Transport, Stream } from '@lugma/web-helpers'
import { Message } from './Base.types'
export * from './Base.types'
export interface Client<T> {
	echo(m: Message, extra: T): Promise<Message>
}
export function makeClientFromTransport<T>(transport: Transport<T>): Client<T> {
	return {
		async echo(m: Message, extra: T): Promise<Message> {
			return await transport.makeRequest(
				"Test/Base/echo",
				{
					m: m,
				},
				extra,
			)
		},
	}
}
