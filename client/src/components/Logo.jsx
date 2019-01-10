import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

const uuidv4 = require('uuid/v4')

export const LogoItem = (props) => {
  const {id, type, service} = props
  const link = '<a href=' + id + '>' + id + '</a>'
  return (<li className='list-group-item'>
    <div className='metadata-label'>ID:</div>
    <div className='list-value' dangerouslySetInnerHTML={{__html: link}}/>
    <img alt='logo' src={id}/>
    <div className='metadata-label'>Type:</div>
    <div className='list-value' dangerouslySetInnerHTML={{__html: type}}/>
    <div className='metadata-label'>Service:</div>
    <ul>
      <li>
        <div className='metadata-label'>ID:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: service.id}}/>
      </li>
      <li>
        <div className='metadata-label'>Type:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: service.type}}/>
      </li>
      <li>
        <div className='metadata-label'>Profile:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: service.profile}}/>
      </li>
    </ul>
  </li>)
}

export class Logo extends React.Component {
  static query () {
    return gql`
          query Logo($manifestId: String!) {
              manifest(id: $manifestId)
          {logo{id, type, service {id, type, profile}}}
          }`
  }

  render () {
    const {manifestId} = this.props
    if (manifestId) {
      return (<Query query={Logo.query()} variables={{manifestId}}>
        {({loading, error, data}) => {
          if (loading) {
            return <p>Loading...</p>
          }
          if (error) {
            return <p>Error: {error.graphQLErrors.map(({message}, i) => (<span key={i}>{message}</span>))}
            </p>
          }
          return (<div className="Hj59Ib">
            <strong>Logo</strong>
            <ul>
              {data.manifest ? data.manifest.logo.map(
                (logo) => <LogoItem key={uuidv4()} id={logo.id} type={logo.type} service={logo.service}/>) : null}
            </ul>
          </div>)
        }}
      </Query>)
    } else {
      return null
    }
  }
}

export default Logo
