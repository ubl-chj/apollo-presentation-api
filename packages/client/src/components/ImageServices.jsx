import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

const uuidv4 = require('uuid/v4')

export const ImageServiceItem = (props) => {
  const {id} = props
  const thumbnail = id + '/full/300,/0/default.jpg'
  const link = '<a href=' + id + '>' + id + '</a>'
  return (
    <div className="Hj59Ib">
      <ul id='imageServices'>
        <li className='list-group-item'>
          <div className='metadata-label'>ID:</div>
          <div className='list-value' dangerouslySetInnerHTML={{__html: link}}/>
          <img alt='' src={thumbnail}/>
        </li>
      </ul>
    </div>)
}

export class ImageServices extends React.Component {
  static query () {
    return gql`
          query ImageServices($manifestId: String!, $type: String!) {
            imageServices(manifestId: $manifestId, 
            type: $type)
            {id}
          }`
  }

  render () {
    const {manifestId, type} = this.props
    if (manifestId) {
      return (
        <Query
          query={ImageServices.query()}
          variables={{manifestId, type}}
        >
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error: {error.graphQLErrors.map(({message}, i) => (<span key={i}>{message}</span>))}
              </p>
            }
            return (<div>
              <strong>Image Services</strong>
              {data.imageServices ? data.imageServices.map(
                (s) =>
                  <ImageServiceItem
                    manifestId={manifestId}
                    id={s.id}
                    key={uuidv4()}
                  />) : null}
            </div>)
          }}
        </Query>)
    } else {
      return null
    }
  }
}

export default ImageServices
