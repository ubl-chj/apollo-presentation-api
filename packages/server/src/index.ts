import {ApolloServer, IResolvers} from 'apollo-server'
import {ManifestAPI} from './ManifestAPI'
import {typeDefs} from './v3Schema'

const resolvers: IResolvers = {
    Query: {
        annotation: async (source, {manifestId, canvasId, annotationPageId, annotationId}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationPageId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationId)[0]
            })
        },
        annotationPage: async (source, {manifestId, canvasId, annotationPageId}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationPageId)[0]
            })
        },
        canvas: async (source, {manifestId, canvasId}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            })
        },
        imageServices: async (source, {manifestId, type, profile}, {dataSources}) => {
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.items]
                }, []).reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.items]
                }, []).map((a: any) => a.body.service).filter((s: any) => s.type === type)
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

server.listen().then(({url}: {url: any}) => {
    console.log(`🚀  Server ready at ${url}`)
})
