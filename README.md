# Apollo Presentation API

A GraphQL server to support IIIF Presentation API validation

## Installation

1. Clone this repository: `git clone https://github.com/ubl-chj/apollo-presentation-api`
2. run `npm install`

## Usage

1. run `npm start`
2. go to http://localhost:4000

Example query:

```graphql
query {
  manifest(id: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json")
  {summary, metadata {label {en},value {en}}}
}
```
