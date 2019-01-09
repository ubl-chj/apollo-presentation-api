import {ApolloServer, IResolverObject} from 'apollo-server'
import {ManifestAPI} from './ManifestAPI'
import {typeDefs} from './v3Schema'

const resolvers: IResolverObject = {
    Query: {
        annotation: async (source, {manifestId, canvasId, annotationPageId, annotationId}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item:any) => item.id === annotationPageId)[0]
            }).then((res: any) => {
                console.log(res.items.filter((item:any) => item.id === annotationId))
                return res.items.filter((item:any) => item.id === annotationId)[0]
            })
        },
        annotationPage: async (source, {manifestId, canvasId, annotationPageId}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item:any) => item.id === annotationPageId)[0]
            })
        },
        canvas: async (source, {manifestId, canvasId}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            })
        },
        manifest: async (source, {id}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(id)
        },
    },
}

const server = new ApolloServer({
    context: () => {
        return {
            version: 'application/json;profile=http://iiif.io/api/presentation/3/context.json',
        }
    },
    cors: true,
    dataSources: () => ({
        manifestAPI: new ManifestAPI(),
    }),
    resolvers,
    typeDefs,
})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
