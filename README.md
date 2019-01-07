# Apollo Presentation API

A GraphQL server to support IIIF Presentation API validation

## Installation

1. Clone this repository: `git clone https://github.com/ubl-chj/apollo-presentation-api.git`
2. run `npm install`

## Server Only Usage
1. cd server
2. run `npm start`
3. go to http://localhost:4000

## React Client Usage (WIP)
1. start server
2. cd client
3. run `npm start`

Example queries:

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
query {
  canvas(manifestId: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/eb45e6ee-395d-4da1-8337-d8bfdde72ae9.json",
    canvasId:"https://iiif.bodleian.ox.ac.uk/iiif/canvas/93dc199e-1b71-496c-a11d-48d2ef6e99a5.json")
    {id, label, width, height}
 }
```
