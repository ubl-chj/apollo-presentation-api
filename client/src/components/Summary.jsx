import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

export class Summary extends React.Component {

  static query() {
      return gql`
          query Summary($manifestId: String!) {
              manifest(id: $manifestId)
          {summary}
          }`
  }

  render () {
      const {manifestId} = this.props
      if (manifestId) {
        return (
          <Query query={Summary.query()} variables={{manifestId}}>
            {({loading, error, data}) => {
              if (loading) {
                return <p>Loading...</p>
              }
              if (error) {
                return <p>Error : {error.message}</p>
              }
              return (
                <div className="Hj59Ib">
                  <ul>
                    <li className='list-group-item'>
                    {data.manifest.summary}
                    </li>
                  </ul>
                </div>
              )
            }}
          </Query>)
    } else {
      return null
    }
  }
}

export default Summary
