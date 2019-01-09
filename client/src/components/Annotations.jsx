import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'
const uuidv4 = require('uuid/v4')

export const AnnotationsItem = (props) => {
  const {id, type, motivation, target, body, manifestId, canvasId, annotationPageId} = props
  const targetlink =  '<a href=' + target + '>' + target + '</a>'
  const bodylink =  '<a href=' + body.id + '>' + body.id + '</a>'
  return (
    <div className="Hj59Ib">
      <ul>
        <li className='list-group-item'>
          <div className='metadata-label'>ID:</div>
          <Link to={`/annotation?manifestId=${manifestId}&canvasId=${canvasId}&annotationPageId=${annotationPageId}&annotationId=${id}`}>{id}</Link>
          <div className='metadata-label'>Type:</div>
          <div className='list-value' dangerouslySetInnerHTML={{__html: type}}/>
          <div className='metadata-label'>Motivation:</div>
          <div className='list-value' dangerouslySetInnerHTML={{__html: motivation}}/>
          <div className='metadata-label'>Target:</div>
          <div className='list-value' dangerouslySetInnerHTML={{__html: targetlink}}/>
          <div className='metadata-label'>Body:</div>
          <ul>
            <li className='list-group-item'>
              <div className='metadata-label'>Body Id:</div>
              <div className='list-value' dangerouslySetInnerHTML={{__html: bodylink}}/></li>
            <li className='list-group-item'>
              <div className='metadata-label'>Type:</div>
              <div className='list-value' dangerouslySetInnerHTML={{__html: body.type}}/>
            </li>
            <li className='list-group-item'>
              <div className='metadata-label'>Format:</div>
              <div className='list-value' dangerouslySetInnerHTML={{__html: body.format}}/>
            </li>
            <div className='metadata-label'>Service:</div>
            <ul>
              <li className='list-group-item'>
                <div className='metadata-label'>Service Id:</div>
                <div className='list-value' dangerouslySetInnerHTML={{__html: body.service.id}}/>
              </li>
              <li className='list-group-item'>
                <div className='metadata-label'>Service Type:</div>
                <div className='list-value' dangerouslySetInnerHTML={{__html: body.service.type}}/>
              </li>
              <li className='list-group-item'>
                <div className='metadata-label'>Service Profile:</div>
                <div className='list-value' dangerouslySetInnerHTML={{__html: body.service.profile}}/>
              </li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export class Annotations extends React.Component {

  static query() {
    return gql`
          query Summary($manifestId: String!, $canvasId: String!, $annotationPageId: String!) {
              annotationPage(manifestId: $manifestId, canvasId: $canvasId, annotationPageId: $annotationPageId),
            {items {id, type, motivation, target, body {id, type, format, width, height, service {id, type, profile}}}}
          }`
  }

  render () {
    const {manifestId, canvasId, annotationPageId} = this.props
    if (manifestId && canvasId && annotationPageId) {
      return (
        <Query query={Annotations.query()} variables={{manifestId, canvasId, annotationPageId}}>
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error : {error.message}</p>
            }
            return (
              <div>
                {data.annotationPage ? data.annotationPage.items.map((c) =>
                  <AnnotationsItem
                    manifestId={manifestId}
                    canvasId={canvasId}
                    annotationPageId={annotationPageId}
                    id={c.id}
                    type={c.type}
                    motivation={c.motivation}
                    target={c.target}
                    body={c.body}
                    key={uuidv4()}
                  />) : 'no annotations returned from endpoint'}
              </div>
            )
          }}
        </Query>)
    } else {
      return null
    }
  }
}

export default Annotations
