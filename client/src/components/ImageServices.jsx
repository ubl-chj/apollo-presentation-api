import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
const uuidv4 = require('uuid/v4')

export const ImageServiceItem = (props) => {
  const {id} = props
  const thumbnail = id + '/full/90,/0/default.jpg'
  const link = '<a href=' + thumbnail + '>' + thumbnail + '</a>'
  return (
    <div className="Hj59Ib">
      <ul>
        <li className='list-group-item'>
          <div className='metadata-label'>ID:</div>
          <div className='list-value' dangerouslySetInnerHTML={{__html: link}}/>
          <img alt='' src={thumbnail}/>
        </li>
      </ul>
    </div>
  )
}

export class ImageServices extends React.Component {

  static query() {
    return gql`
          query Summary($manifestId: String!, $type: String!) {
            imageServices(manifestId: $manifestId, 
            type: $type)
            {id}
          }`
  }

  render () {
    const {manifestId, type} = this.props
    if (manifestId) {
      return (
        <Query query={ImageServices.query()} variables={{manifestId, type}}>
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error : {error.message}</p>
            }
            return (
              <div>
                {data.imageServices.map((s) =>
                  <ImageServiceItem
                    manifestId={manifestId}
                    id={s.id}
                    key={uuidv4()}
                  />)}
              </div>
            )
          }}
        </Query>)
    } else {
      return null
    }
  }
}

export default ImageServices
