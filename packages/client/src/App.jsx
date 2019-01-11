import * as React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {ManifestQueryForm} from './components/forms/ManifestQueryForm'
import {CanvasQueryForm} from './components/forms/CanvasQueryForm'
import {AnnotationPageQueryForm} from './components/forms/AnnotationPageQueryForm'
import {AnnotationQueryForm} from './components/forms/AnnotationQueryForm'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

class App extends React.Component {
  render () {
    const t = Boolean(true)
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact={t} path='/' component={Main}/>
            <Route exact={t} path='/manifest' component={MQuery}/>
            <Route exact={t} path='/canvas' component={CQuery}/>
            <Route exact={t} path='/annotationPage' component={APQuery}/>
            <Route exact={t} path='/annotation' component={AQuery}/>
          </Switch>
        </ApolloProvider>
      </BrowserRouter>)
  }
}

const Main = () => (<div>
  <h2>GraphQL Presentation API Validator <span aria-label="" role="img">🚀</span></h2>
  <ul>
    <li>
      <Link title='Validate Manifest' to='/manifest'>Validate Manifest</Link>
      <p><span className="fTNNmo">GET</span> /manifest?manifestId={'{'}<span
        style={{color: 'green'}}>manifestURI</span>{'}'}</p>
      <pre><code>
        <a
          href="/manifest?manifestId=https://iiif.bodleian.ox.ac.uk/iiif/manifest/eb45e6ee-395d-4da1-8337-d8bfdde72ae9.json">example</a>
      </code></pre>
    </li>
    <li>
      <Link title='Validate Canvas' to='/canvas'>Validate Canvas</Link>
      <p><span className="fTNNmo">GET</span> /canvas?manifestId={'{'}<span
        style={{color: 'green'}}>manifestURI</span>{'}'}&canvasId={'{'}<span
        style={{color: 'green'}}>canvasId</span>{'}'}</p>
    </li>
    <li>
      <Link title='Validate Annotation Page' to='/annotationPage'>Validate Annotation Page</Link>
      <p><span className="fTNNmo">GET</span> /annotationPage?manifestId={'{'}<span
        style={{color: 'green'}}>manifestURI</span>{'}'}&canvasId={'{'}<span
        style={{color: 'green'}}>canvasId</span>{'}'}&annotationPageId={'{'}<span
        style={{color: 'green'}}>annotationPageId</span>{'}'}</p>
    </li>
    <li>
      <Link title='Validate Annotation' to='/annotation'>Validate Annotation</Link>
      <p><span className="fTNNmo">GET</span> /annotation?manifestId={'{'}<span
        style={{color: 'green'}}>manifestURI</span>{'}'}&canvasId={'{'}<span
        style={{color: 'green'}}>canvasId</span>{'}'}&annotationPageId={'{'}<span
        style={{color: 'green'}}>annotationPageId</span>{'}'}&annotationId={'{'}<span
        style={{color: 'green'}}>annotationId</span>{'}'}</p>
    </li>
  </ul>
</div>)

const MQuery = () => (<div>
  <Link to='/'><h2>GraphQL Presentation API Validator <span aria-label="" role="img">🚀</span></h2></Link>
  <ManifestQueryForm/>
</div>)

const CQuery = () => (<div>
  <Link to='/'><h2>GraphQL Presentation API Validator <span aria-label="" role="img">🚀</span></h2></Link>
  <CanvasQueryForm/>
</div>)

const APQuery = () => (<div>
  <Link to='/'><h2>GraphQL Presentation API Validator <span aria-label="" role="img">🚀</span></h2></Link>
  <AnnotationPageQueryForm/>
</div>)

const AQuery = () => (<div>
  <Link to='/'><h2>GraphQL Presentation API Validator <span aria-label="" role="img">🚀</span></h2></Link>
  <AnnotationQueryForm/>
</div>)
export default App
