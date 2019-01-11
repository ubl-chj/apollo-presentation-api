import * as React from 'react'
import Annotations from '../Annotations'
import Checkbox from 'rc-checkbox'
import {withRouter} from 'react-router-dom'
import SplitterLayout from 'react-splitter-layout'

const qs = require('query-string')

class AnnotationPageQueryFormComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      annotations: true,
      manifestId: '(enter Manifest URI)',
      canvasId: '(enter Canvas URI)',
      annotationPageId: '(enter AnnotationPage URI)',
      renderQueryInfo: true,
    }
    this.handleManifestChange = this.handleManifestChange.bind(this)
    this.handleCanvasChange = this.handleCanvasChange.bind(this)
    this.handleAnnotationPageChange = this.handleAnnotationPageChange.bind(this)
  }

  handleManifestChange (event) {
    this.setState({manifestId: event.target.value})
  }

  handleCanvasChange (event) {
    this.setState({canvasId: event.target.value})
  }

  handleAnnotationPageChange (event) {
    this.setState({annotationPageId: event.target.value})
  }

  resolveParams () {
    const params = qs.parse(this.props.location.search)
    if (Object.keys(params).length) {
      if (params.manifestId && params.canvasId && params.annotationPageId) {
        const manifest = params.manifestId
        const canvas = params.canvasId
        const annoPage = params.annotationPageId
        this.setState({annotationPageId: annoPage, canvasId: canvas, manifestId: manifest})
      }
    }
  }

  renderAnnotations () {
    const {renderQueryInfo, annotations, canvasId, manifestId, annotationPageId} = this.state
    if (renderQueryInfo) {
      if (annotations) {
        return <Annotations manifestId={manifestId} canvasId={canvasId} annotationPageId={annotationPageId}/>
      }
    }
  }

  toggleAnnotations = () => {
    this.setState((state) => ({
      annotations: !state.annotations,
    }))
  }

  componentDidMount () {
    this.resolveParams()
  }

  componentDidUpdate (prevProps, prevState) {
    const {annotations, canvasId, manifestId, annotationPageId} = this.state
    if (annotationPageId !== prevState.annotationPageId) {
      this.resolveParams()
    }
    if (canvasId !== prevState.canvasId) {
      this.resolveParams()
    }
    if (manifestId !== prevState.manifestId) {
      this.resolveParams()
    }
    if (annotations !== prevState.annotations) {
      if (annotations) {
        this.setState({renderQueryInfo: true})
      } else {
        this.setState({renderQueryInfo: false})
      }
    }
  }

  render () {
    const {canvasId, manifestId, annotationPageId} = this.state
    if (canvasId && manifestId && annotationPageId) {
      return (<div>
        <div className='Hj59Ib'>Manifest URI</div>
        <textarea cols="100" rows="3" value={manifestId} name={manifestId} onChange={this.handleManifestChange}/>
        <div className='Hj59Ib'>Canvas URI</div>
        <textarea cols="100" rows="3" value={canvasId} name={canvasId} onChange={this.handleCanvasChange}/>
        <div className='Hj59Ib'>Annotation Page URI</div>
        <textarea cols="100" rows="3" value={annotationPageId} name={annotationPageId}
          onChange={this.handleAnnotationPageChange}/>
        <SplitterLayout primaryIndex={0} percentage secondaryInitialSize={80}>
          <div>
            <div className='Hj59Ib'>Annotations</div>
            <Checkbox aria-label='summary' defaultChecked onChange={this.toggleAnnotations}/>
          </div>
          <div>
            {this.renderAnnotations()}
          </div>
        </SplitterLayout>
      </div>)
    } else {
      return null
    }
  }
}

export const AnnotationPageQueryForm = withRouter(AnnotationPageQueryFormComponent)
