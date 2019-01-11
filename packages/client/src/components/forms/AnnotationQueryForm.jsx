import * as React from 'react'
import Annotation from '../Annotation'
import Checkbox from 'rc-checkbox'
import SplitterLayout from 'react-splitter-layout'
import {withRouter} from 'react-router-dom'

const qs = require('query-string')

class AnnotationQueryFormComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      annotation: true,
      manifestId: '(enter Manifest URI)',
      canvasId: '(enter Canvas URI)',
      annotationPageId: '(enter AnnotationPage URI)',
      annotationId: '(enter Annotation URI)',
      renderQueryInfo: true,
    }
    this.handleManifestChange = this.handleManifestChange.bind(this)
    this.handleCanvasChange = this.handleCanvasChange.bind(this)
    this.handleAnnotationPageChange = this.handleAnnotationPageChange.bind(this)
    this.handleAnnotationChange = this.handleAnnotationChange.bind(this)
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

  handleAnnotationChange (event) {
    this.setState({annotationId: event.target.value})
  }

  resolveParams () {
    const params = qs.parse(this.props.location.search)
    if (Object.keys(params).length) {
      if (params.manifestId && params.canvasId && params.annotationPageId && params.annotationId) {
        const manifest = params.manifestId
        const canvas = params.canvasId
        const annoPage = params.annotationPageId
        const annotation = params.annotationId
        this.setState({annotationId: annotation, annotationPageId: annoPage, canvasId: canvas, manifestId: manifest})
      }
    }
  }

  renderAnnotations () {
    const {renderQueryInfo, annotation, canvasId, manifestId, annotationPageId, annotationId} = this.state
    if (renderQueryInfo) {
      if (annotation) {
        return <Annotation manifestId={manifestId} canvasId={canvasId} annotationPageId={annotationPageId}
          annotationId={annotationId}/>
      }
    }
  }

  toggleAnnotation = () => {
    this.setState((state) => ({
      annotation: !state.annotation,
    }))
  }

  componentDidMount () {
    this.resolveParams()
  }

  componentDidUpdate (prevProps, prevState) {
    const {annotation, canvasId, manifestId, annotationPageId, annotationId} = this.state
    if (annotationId !== prevState.annotationId) {
      this.resolveParams()
    }
    if (annotationPageId !== prevState.annotationPageId) {
      this.resolveParams()
    }
    if (canvasId !== prevState.canvasId) {
      this.resolveParams()
    }
    if (manifestId !== prevState.manifestId) {
      this.resolveParams()
    }
    if (annotation !== prevState.annotation) {
      if (annotation) {
        this.setState({renderQueryInfo: true})
      } else {
        this.setState({renderQueryInfo: false})
      }
    }
  }

  render () {
    const {canvasId, manifestId, annotationPageId, annotationId} = this.state
    if (canvasId && manifestId && annotationPageId && annotationId) {
      return (<div>
        <div className='Hj59Ib'>Manifest URI</div>
        <textarea cols="100" rows="3" value={manifestId} name={manifestId} onChange={this.handleManifestChange}/>
        <div className='Hj59Ib'>Canvas URI</div>
        <textarea cols="100" rows="3" value={canvasId} name={canvasId} onChange={this.handleCanvasChange}/>
        <div className='Hj59Ib'>Annotation Page URI</div>
        <textarea cols="100" rows="3" value={annotationPageId} name={annotationPageId}
          onChange={this.handleAnnotationPageChange}/>
        <div className='Hj59Ib'>Annotation URI</div>
        <textarea cols="100" rows="3" value={annotationId} name={annotationId} onChange={this.handleAnnotationChange}/>
        <SplitterLayout primaryIndex={0} percentage secondaryInitialSize={80}>
          <div>
            <div className='Hj59Ib'>Show Annotation</div>
            <Checkbox aria-label='summary' defaultChecked onChange={this.toggleAnnotation}/>
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

export const AnnotationQueryForm = withRouter(AnnotationQueryFormComponent)
