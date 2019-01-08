import * as React from 'react'
import Label from './Label'
import Summary from './Summary'
import Metadata from './Metadata'
import Homepage from './Homepage'
import Canvases from './Canvases'
import Checkbox from 'rc-checkbox'

export class QueryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: false,
      summary: false,
      metadata: false,
      homepage: false,
      canvases: false,
      manifestId: '',
      renderQueryInfo: false,
      submitted: false }

    this.handleChange= this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ manifestId: event.target.value })
  }

  renderLabel() {
    const {renderQueryInfo, label} = this.state
    if (renderQueryInfo) {
      if (label) {
        return <Label manifestId={this.state.manifestId}/>
      }
    }
  }

  renderSummary() {
    const {renderQueryInfo, summary} = this.state
    if (renderQueryInfo) {
      if (summary) {
        return <Summary manifestId={this.state.manifestId}/>
      }
    }
  }

  renderMetadata() {
    const {renderQueryInfo, metadata} = this.state
    if (renderQueryInfo) {
      if (metadata) {
        return <Metadata manifestId={this.state.manifestId}/>
      }
    }
  }

  renderHomepage() {
    const {renderQueryInfo, homepage} = this.state
    if (renderQueryInfo) {
      if (homepage) {
        return <Homepage manifestId={this.state.manifestId}/>
      }
    }
  }

  renderCanvases() {
    const {renderQueryInfo, canvases} = this.state
    if (renderQueryInfo) {
      if (canvases) {
        return <Canvases manifestId={this.state.manifestId}/>
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

  toggleCanvases = () => {
    this.setState((state) => ({
      canvases: !state.canvases,
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    const {label, summary, metadata, homepage, canvases} = this.state
    if (summary !== prevState.summary
      || label !== prevState.label
      || metadata !== prevState.metadata
      || homepage !== prevState.homepage
      || canvases !== prevState.canvases) {
      if (summary || label || metadata || homepage || canvases) {
        this.setState({renderQueryInfo: true})
      } else {
        this.setState({renderQueryInfo: false})
      }
    }
  }

  render() {
    return (
      <div>
        <div className='Hj59Ib'>Manifest URI</div>
          <textarea
            cols="100" rows="3"
            name={this.state.manifestId}
            onChange={this.handleChange}
          />
        <div className='Hj59Ib'>Label</div>
        <Checkbox
          aria-label='label'
          onChange={this.toggleLabel}
        />
        {this.renderLabel()}
        <div className='Hj59Ib'>Summary</div>
        <Checkbox
          aria-label='summary'
          onChange={this.toggleSummary}
        />
        {this.renderSummary()}
        <div className='Hj59Ib'>Metadata</div>
        <Checkbox
          aria-label='summary'
          onChange={this.toggleMetadata}
        />
        {this.renderMetadata()}
        <div className='Hj59Ib'>Homepage</div>
        <Checkbox
          aria-label='summary'
          onChange={this.toggleHomepage}
        />
        {this.renderHomepage()}
        <div className='Hj59Ib'>Canvases</div>
        <Checkbox
          aria-label='summary'
          onChange={this.toggleCanvases}
        />
        {this.renderCanvases()}
      </div>
    )
  }
}
