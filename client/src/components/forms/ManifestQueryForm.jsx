import * as React from 'react'
import Label from '../Label'
import Summary from '../Summary'
import Metadata from '../Metadata'
import Homepage from '../Homepage'
import Logo from '../Logo'
import Thumbnail from '../Thumbnail'
import Canvases from '../Canvases'
import ImageServices from '../ImageServices'
import Checkbox from 'rc-checkbox'
import SplitterLayout from 'react-splitter-layout'
import {withRouter} from 'react-router-dom'

const qs = require('query-string')

class ManifestQueryFormComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      label: false,
      summary: false,
      metadata: false,
      homepage: false,
      logo: false,
      thumbnail: false,
      canvases: false,
      imageServices: false,
      manifestId: '(enter Manifest URI)',
      renderQueryInfo: false,
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  resolveParams () {
    const params = qs.parse(this.props.location.search)
    if (Object.keys(params).length) {
      if (params.manifestId) {
        const manifest = params.manifestId
        this.setState({manifestId: manifest})
      }
    }
  }

  handleChange (event) {
    this.setState({manifestId: event.target.value})
  }

  renderLabel () {
    const {renderQueryInfo, label, manifestId} = this.state
    if (renderQueryInfo) {
      if (label) {
        return <Label manifestId={manifestId}/>
      }
    }
  }

  renderSummary () {
    const {renderQueryInfo, manifestId, summary} = this.state
    if (renderQueryInfo) {
      if (summary) {
        return <Summary manifestId={manifestId}/>
      }
    }
  }

  renderMetadata () {
    const {renderQueryInfo, manifestId, metadata} = this.state
    if (renderQueryInfo) {
      if (metadata) {
        return <Metadata manifestId={manifestId}/>
      }
    }
  }

  renderHomepage () {
    const {renderQueryInfo, homepage, manifestId} = this.state
    if (renderQueryInfo) {
      if (homepage) {
        return <Homepage manifestId={manifestId}/>
      }
    }
  }

  renderLogo () {
    const {renderQueryInfo, logo, manifestId} = this.state
    if (renderQueryInfo) {
      if (logo) {
        return <Logo manifestId={manifestId}/>
      }
    }
  }

  renderThumbnail () {
    const {renderQueryInfo, thumbnail, manifestId} = this.state
    if (renderQueryInfo) {
      if (thumbnail) {
        return <Thumbnail manifestId={manifestId}/>
      }
    }
  }

  renderCanvases () {
    const {renderQueryInfo, canvases, manifestId} = this.state
    if (renderQueryInfo) {
      if (canvases) {
        return <Canvases manifestId={manifestId}/>
      }
    }
  }

  renderImageServices () {
    const {renderQueryInfo, imageServices, manifestId} = this.state
    if (renderQueryInfo) {
      if (imageServices) {
        return <ImageServices manifestId={manifestId} type='ImageService2'/>
      }
    }
  }

  toggleLabel = () => {
    this.setState((state) => ({
      label: !state.label,
    }))
  }

  toggleSummary = () => {
    this.setState((state) => ({
      summary: !state.summary,
    }))
  }

  toggleMetadata = () => {
    this.setState((state) => ({
      metadata: !state.metadata,
    }))
  }

  toggleHomepage = () => {
    this.setState((state) => ({
      homepage: !state.homepage,
    }))
  }

  toggleLogo = () => {
    this.setState((state) => ({
      logo: !state.logo,
    }))
  }

  toggleThumbnail = () => {
    this.setState((state) => ({
      thumbnail: !state.thumbnail,
    }))
  }

  toggleCanvases = () => {
    this.setState((state) => ({
      canvases: !state.canvases,
    }))
  }

  toggleImageServices = () => {
    this.setState((state) => ({
      imageServices: !state.imageServices,
    }))
  }

  componentDidMount () {
    this.resolveParams()
  }

  componentDidUpdate (prevProps, prevState) {
    const {manifestId, label, summary, metadata, homepage, logo, thumbnail, canvases, imageServices} = this.state
    if (manifestId !== prevState.manifestId) {
      this.resolveParams()
    }
    if (summary !== prevState.summary || label !== prevState.label || metadata !== prevState.metadata || homepage !== prevState.homepage || logo !== prevState.logo || thumbnail !== prevState.thumbnail || canvases !== prevState.canvases || imageServices !== prevState.imageServices) {
      if (summary || label || metadata || homepage || logo || thumbnail || canvases || imageServices) {
        this.setState({renderQueryInfo: true})
      } else {
        this.setState({renderQueryInfo: false})
      }
    }
  }

  render () {
    const {manifestId} = this.state
    if (manifestId) {
      return (<div>
        <div className='Hj59Ib'>Manifest URI</div>
        <textarea cols="100" rows="3" name={manifestId} onChange={this.handleChange} value={manifestId}/>
        <SplitterLayout primaryIndex={0} percentage secondaryInitialSize={80}>
          <div>
            <div className='Hj59Ib'>Label</div>
            <Checkbox aria-label='label' onChange={this.toggleLabel}/>
            <div className='Hj59Ib'>Summary</div>
            <Checkbox aria-label='summary' onChange={this.toggleSummary}/>
            <div className='Hj59Ib'>Metadata</div>
            <Checkbox aria-label='summary' onChange={this.toggleMetadata}/>
            <div className='Hj59Ib'>Homepage</div>
            <Checkbox aria-label='summary' onChange={this.toggleHomepage}/>
            <div className='Hj59Ib'>Logo</div>
            <Checkbox aria-label='summary' onChange={this.toggleLogo}/>
            <div className='Hj59Ib'>Thumbnail</div>
            <Checkbox aria-label='summary' onChange={this.toggleThumbnail}/>
            <div className='Hj59Ib'>Canvases</div>
            <Checkbox aria-label='summary' onChange={this.toggleCanvases}/>
            <div className='Hj59Ib'>Image Services</div>
            <Checkbox aria-label='summary' onChange={this.toggleImageServices}/>
          </div>
          <div>
            {this.renderLabel()}
            {this.renderSummary()}
            {this.renderMetadata()}
            {this.renderHomepage()}
            {this.renderLogo()}
            {this.renderThumbnail()}
            {this.renderCanvases()}
            {this.renderImageServices()}
          </div>
        </SplitterLayout></div>)
    } else {
      return null
    }
  }
}

export const ManifestQueryForm = withRouter(ManifestQueryFormComponent)
