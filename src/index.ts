import { ApolloServer, gql, IResolverObject } from 'apollo-server'
import {ManifestAPI} from './ManifestAPI'

const typeDefs = gql`
    type Manifest {
        id: String
        summary: String
        metadata: [Metadata]
    }
    type Metadata {
        label: Label
        value: Value
    }
    type Label {
      en: [String]
    }

    type Value {
      en: [String]
    }
    
    type Query {
        manifest(id: String!): Manifest
    }
`;

const resolvers: IResolverObject = {
  Query: {
    manifest: async (_source, { id }, { dataSources }) => {
      return dataSources.manifestAPI.getManifest(id);
    },
  },
};

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  dataSources: () => ({
    manifestAPI: new ManifestAPI(),
  }),
  context: () => {
      return {
          version: 'application/json;profile=http://iiif.io/api/presentation/3/context.json',
      };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
