import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

const defaultLang = 'en'

export class Label extends React.Component {

  static query() {
    return gql`
          query Summary($manifestId: String!) {
              manifest(id: $manifestId)
          {label {${defaultLang}}}
          }`
  }

  render () {
    const {manifestId} = this.props
    if (manifestId) {
      return (
        <Query query={Label.query()} variables={{manifestId}}>
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
                  {data.manifest.label[defaultLang][0]}
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

export default Label
