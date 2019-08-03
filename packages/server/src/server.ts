import {ApolloServer} from "apollo-server"
import {ManifestAPIv2, ManifestAPIv3} from "./index"
import {resolvers} from "./resolvers"
import {typeDefs} from "./v3Schema"

export const server = new ApolloServer({
    context: () => {
        return {
            version: 'application/json;profile=http://iiif.io/api/presentation/3/context.json',
        }
    },
    cors: true,
    dataSources: () => ({
        manifestAPIv2: new ManifestAPIv2(),
        manifestAPIv3: new ManifestAPIv3(),
    }),
    resolvers,
    typeDefs,
})
