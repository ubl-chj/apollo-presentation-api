import {RequestOptions, RESTDataSource} from 'apollo-datasource-rest'

export class ManifestAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = ''
    }

    parseBody(response: any) {
        if (response.headers.get('Content-Type').includes('json')) {
            return response.json()
        } else {
            return response.text()
        }
    }

    willSendRequest(request: RequestOptions) {
        request.headers.set('Accept', this.context.version)
    }

    async getManifest(id: any) {
        return this.get(`${id}`)
    }
}
