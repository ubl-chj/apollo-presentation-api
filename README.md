# Apollo Presentation API

A GraphQL implementation to support IIIF Presentation API validation

## Installation

1. Clone this repository: `git clone https://github.com/ubl-chj/apollo-presentation-api.git`
2. run `npm install` for all packages and root

## Server Only Usage
1. cd packages/server
2. run `npm start`
3. go to http://localhost:4000

## React Client Usage
![](docs/screenshot.png?raw=true)
1. `lerna run start`

Client endpoint accepts query parameters:
`http://localhost:3300/manifest?manifestId=https://iiif.bodleian.ox.ac.uk/iiif/manifest/eb45e6ee-395d-4da1-8337-d8bfdde72ae9.json`

## E2E Tests
1. cd packages/e2e-tests
2. `npm test`

## E2E Fixtures
spec tests run against json fixtures in the `cypress/fixtures` directory served from http://localhost:5000

### Example Server Queries
```graphql
# Summary and Metadata
query {
  manifest(id: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json")
  {summary, metadata {label {en},value {en}}}
}

# Canvases
query {
  manifest(id: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/eb45e6ee-395d-4da1-8337-d8bfdde72ae9.json")
  {items {type, label, width, height,
    items {id, type,
      items {target, body {width, height, service {id}}}}}}}

# Structures
query {
  manifest(id: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/eb45e6ee-395d-4da1-8337-d8bfdde72ae9.json")
  {structures {type, items {type, items {type, id}}}}}

# Get A Single Canvas
query { canvas(manifestId: $manifestId, canvasId: $canvasId),
            {id, label, width, height}
          }

# Get an Annotation Page
query { annotationPage(manifestId: $manifestId, canvasId: $canvasId, annotationPageId: $annotationPageId),
            {items {id, type, motivation, target, body {id, type, format, width, height, service {id, type, profile}}}}
          }

# Get an Annotation
query { annotation(manifestId: $manifestId, canvasId: $canvasId, annotationPageId: $annotationPageId, annotationId: $annotationId),
            {id, type, motivation, target, body {id, type, format, width, height, service {id, type, profile}}}
          }
```
