import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
const uuidv4 = require('uuid/v4')

export const CanvasItem = (props) => {
  const {id, type, label, width, height} = props
  const link =  '<a href=' + id + '>' + id + '</a>'
  return (
    <li className='list-group-item'>
      <div className='metadata-label'>ID:</div>
      <div className='list-value' dangerouslySetInnerHTML={{__html: link}}/>
      <div className='metadata-label'>Type:</div>
      <div className='list-value' dangerouslySetInnerHTML={{__html: type}}/>
      <div className='metadata-label'>Label:</div>
      <div className='list-value' dangerouslySetInnerHTML={{__html: label}}/>
      <div className='metadata-label'>Width:</div>
      <div className='list-value' dangerouslySetInnerHTML={{__html: width}}/>
      <div className='metadata-label'>Height:</div>
      <div className='list-value' dangerouslySetInnerHTML={{__html: height}}/>
    </li>
  )
}

export class Canvases extends React.Component {

  static query() {
    return gql`
          query Summary($manifestId: String!) {
              manifest(id: $manifestId)
            {items {id, type, label, width, height}}
          }`
  }

  render () {
    const {manifestId} = this.props
    if (manifestId) {
      return (
        <Query query={Canvases.query()} variables={{manifestId}}>
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error : {error.message}</p>
            }
            return (
              <div>
                  {data.manifest.items.map((c) =>
                    <CanvasItem
                      id={c.id}
                      type={c.type}
                      label={c.label}
                      width={c.width}
                      height={c.height}
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

export default Canvases
