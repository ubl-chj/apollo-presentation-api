import * as React from 'react'
import Summary from './Summary'

export class QueryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      manifestId: '',
      submitted: false }

    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ manifestId: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true })
    alert(this.state.manifestId + ' was submitted');
  }

  renderQueryInfo() {
    return <Summary manifestId={this.state.manifestId} />
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Manifest Id:
            <br/>
            <textarea
              cols="60" rows="3"
              name={this.state.manifestId}
              onChange={this.handleChange}
            />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        {this.state.submitted && this.renderQueryInfo()}
      </div>
    )
  }
}
