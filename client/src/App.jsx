import React from 'react'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {QueryForm} from './components/QueryForm'

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Manifest Validator <span aria-label="" role="img">🚀</span></h2>
      <QueryForm/>
    </div>
  </ApolloProvider>
)

export default App
