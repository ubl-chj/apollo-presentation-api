import gql from 'graphql-tag'
import React from 'react'
import {Query} from 'react-apollo'

const uuidv4 = require('uuid/v4')

export const ThumbnailItem = (props) => {
  const {id, type, service} = props
  const link = '<a href=' + id + '>' + id + '</a>'
  return (
    <li className='list-group-item'>
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

export class Thumbnail extends React.Component {
  static query() {
    return gql`
          query Thumbnail($manifestId: String!) {
              manifest(id: $manifestId)
          {thumbnail{id, type, service {id, type, profile}}}
          }`
  }

  render() {
    const {manifestId} = this.props
    if (manifestId) {
      return (
        <Query
          query={Thumbnail.query()}
          variables={{manifestId}}
        >
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error: {error.graphQLErrors.map(({message}, i) => (<span key={i}>{message}</span>))}
              </p>
            }
            return (<div className="Hj59Ib">
              <strong>Thumbnail</strong>
              <ul id='thumbnail'>
                {data.manifest ? data.manifest.thumbnail.map(
                  (t) =>
                    <ThumbnailItem
                      key={uuidv4()}
                      id={t.id}
                      type={t.type}
                      service={t.service}
                    />) : null}
              </ul>
            </div>)
          }}
        </Query>)
    } else {
      return null
    }
  }
}

export default Thumbnail
