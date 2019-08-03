import {RequestOptions, RESTDataSource} from 'apollo-datasource-rest'

export class ManifestAPIv2 extends RESTDataSource {
    public constructor() {
        super()
        this.baseURL = ''
    }

    public parseBody(response: any) {
        if (response.headers.get('Content-Type').includes('json')) {
            return response.json()
        } else {
            return response.text()
        }
    }

    public willSendRequest(request: RequestOptions) {
        request.headers.set('Accept', this.context.version)
    }


    public async getManifest(id: string) {
        const data = await this.get(`${id}`)
        const dataStr = JSON.stringify(data)
        const replaced = dataStr.replace(/@/gi, '')
        return JSON.parse(replaced)
    }
}
