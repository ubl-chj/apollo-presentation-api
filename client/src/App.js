import * as React from 'react'
import './App.css'
import ApolloClient from "apollo-boost"
import {Query} from "react-apollo"
import gql from "graphql-tag"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://localhost:4000"
})

const SummaryQuery = () => (
  <Query query={gql`
        {
          manifest(id: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json")
          {summary}
        }`}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      return data.manifest.map(({summary}) => (
        <div key={summary}>
          <p>{summary}</p>
        </div>
      ))
    }}}
  </Query>
)
class App extends React.Component {
  render () {
    return (
      <ApolloProvider client={client}>
          <SummaryQuery/>
      </ApolloProvider>)
  }
}

export default App
