import React from "react"
import { render } from "react-dom"

import ApolloClient from "apollo-boost"
import { ApolloProvider, Query } from "react-apollo"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const Summary = () => (
  <Query
    query={gql`
        {
        manifest(id: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json")
        {summary}
        }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return (
        <div>
          <p>
            Summary: {data.manifest.summary}
          </p>
        </div>
      );
    }}
  </Query>
)

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Manifest Validator <span aria-label="" role="img">🚀</span></h2>
      <Summary/>
    </div>
  </ApolloProvider>
)

render(<App />, document.getElementById("root"));
