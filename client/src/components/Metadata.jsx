import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
const uuidv4 = require('uuid/v4')

const defaultLang = 'en'

export const MetadataItem = (props) => {
  const {language, label, value} = props
  return (
    <li className='list-group-item'><div className='metadata-label'>{label[language][0]}:</div>
      {value[language].map((v) => <div key={uuidv4()} className='list-value' dangerouslySetInnerHTML={{__html: v}}/>)}
    </li>
  )
}

export class Metadata extends React.Component {

  static query() {
    return gql`
          query Summary($manifestId: String!) {
              manifest(id: $manifestId)
          {metadata {label {${defaultLang}},value {${defaultLang}}}}
          }`
  }

  buildItemList(data) {
    return (
      <div className="Hj59Ib">
          <ul>
            {data.manifest.metadata.map((metadata) =>
              <MetadataItem key={uuidv4()} language={defaultLang} label={metadata.label} value={metadata.value}/>)
            }
          </ul>
      </div>
    )
  }

  render () {
      const {manifestId} = this.props
      if (manifestId) {
        return (
          <Query query={Metadata.query()} variables={{manifestId}}>
            {({loading, error, data}) => {
              if (loading) {
                return <p>Loading...</p>
              }
              if (error) {
                return <p>Error : {error.message}</p>
              }
              return this.buildItemList(data)
            }}
          </Query>)
      } else {
        return null
      }
    }
}

export default Metadata
