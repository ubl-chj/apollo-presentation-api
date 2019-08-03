import {server} from './server'
export * from './ManifestAPIv3'
export * from './ManifestAPIv2'
export * from './resolvers'
export * from './v3Schema'

server.listen().then(({url}: {url: any}) => {
    console.log(`🚀  Server ready at ${url}`)
})
