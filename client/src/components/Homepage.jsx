import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

const uuidv4 = require('uuid/v4')

const defaultLang = 'en'

export const HomepageItem = (props) => {
  const {id, type, label, format} = props
  const link = '<a href=' + id + '>' + id + '</a>'
  return (<li className='list-group-item'>
    <div className='metadata-label'>ID:</div>
    <div className='list-value' dangerouslySetInnerHTML={{__html: link}}/>
    <div className='metadata-label'>Type:</div>
    <div className='list-value' dangerouslySetInnerHTML={{__html: type}}/>
    <div className='metadata-label'>Label:</div>
    <div className='list-value' dangerouslySetInnerHTML={{__html: label[defaultLang][0]}}/>
    <div className='metadata-label'>Format:</div>
    <div className='list-value' dangerouslySetInnerHTML={{__html: format}}/>
  </li>)
}

export class Homepage extends React.Component {
  static query () {
    return gql`
          query Homepage($manifestId: String!) {
              manifest(id: $manifestId)
          {homepage{id, type, label {${defaultLang}}, format}}
          }`
  }

  render () {
    const {manifestId} = this.props
    if (manifestId) {
      return (<Query query={Homepage.query()} variables={{manifestId}}>
        {({loading, error, data}) => {
          if (loading) {
            return <p>Loading...</p>
          }
          if (error) {
            return <p>Error: {error.graphQLErrors.map(({message}, i) => (<span key={i}>{message}</span>))}
            </p>
          }
          return (<div className="Hj59Ib">
            <strong>Homepage</strong>
            <ul>
              {data.manifest ? data.manifest.homepage.map(
                (hp) => <HomepageItem key={uuidv4()} id={hp.id} type={hp.type} label={hp.label}
                  format={hp.format}/>) : null}
            </ul>
          </div>)
        }}
      </Query>)
    } else {
      return null
    }
  }
}

export default Homepage
