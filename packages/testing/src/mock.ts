import * as SuperTest from "supertest"
import * as Web from "@lugma/web-helpers"

export class SuperTestTransport implements Web.Transport<void> {
    st: SuperTest.SuperTest<SuperTest.Test>

    constructor(app: any) {
        this.st = SuperTest.default(app)
    }
    async makeRequest(endpoint: string, body: any, extra: void): Promise<any> {
        const resp = await this.st.post(endpoint).send(JSON.stringify(body))
        console.warn(resp.statusCode)
        if (resp.statusCode == 200) {
            return resp.body
        } else {
            throw resp.body
        }
    }
    openStream(endpoint: string, extra: void): Web.Stream {
        throw new Error("Method not implemented.")
    }
}
