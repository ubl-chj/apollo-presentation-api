import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

const defaultLang = 'en'

export class Label extends React.Component {
  static query () {
    return gql`
          query Label($manifestId: String!) {
              manifest(id: $manifestId)
          {label {${defaultLang}}}
          }`
  }

  render () {
    const {manifestId} = this.props
    if (manifestId) {
      return (<Query query={Label.query()} variables={{manifestId}}>
        {({loading, error, data}) => {
          if (loading) {
            return <p>Loading...</p>
          }
          if (error) {
            return <p>Error: {error.graphQLErrors.map(({message}, i) => (<span key={i}>{message}</span>))}
            </p>
          }
          return (<div className="Hj59Ib">
            <strong>Label</strong>
            <ul>
              <li className='list-group-item'>
                {data.manifest ? data.manifest.label[defaultLang][0] : null}
              </li>
            </ul>
          </div>)
        }}
      </Query>)
    } else {
      return null
    }
  }
}

export default Label
