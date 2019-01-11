import {gql} from 'apollo-server'

export const typeDefs = gql`
    type Manifest {
        id: String!
        type: String!
        label: Label
        summary: String!
        metadata: [Metadata]!
        homepage: [Homepage]!
        logo: [Logo]!
        thumbnail: [Thumbnail]!
        requiredStatement: RequiredStatement
        partOf: PartOf
        behavior: Behavior
        items(id: String): [Canvas]!
        structures: [Structure]!
    }
    type Metadata {
        label: Label
        value: Value
    }
    type Label {
        en: [String]!
    }
    type Value {
        en: [String]!
    }
    type Homepage {
        id: String
        type: String
        label: Label
        format: String
    }
    type Logo {
        id: String
        type: String
        service: Service
    }
    type Service {
        id: String
        type(type: String): String
        profile(profile: String): String
    }
    type Thumbnail {
        id: String
        type: String
        service: Service
    }
    type RequiredStatement {
        label: Label
        value: Value
    }
    type PartOf {
        partOf: [Parent]
    }
    type Parent {
        id: String
        type: String
        label: Label
    }
    type Behavior {
        behavior: [String]
    }
    type Canvas {
        id: String
        type: String
        label: String
        width: Int
        height: Int
        items: [AnnotationPage]!
        metadata: [Metadata]
    }
    type AnnotationPage {
        id: String
        type: String
        items: [Annotation]!
    }
    type Annotation {
        id: String
        type: String
        motivation: String
        target: String
        body: Body
    }
    type Body {
        id: String
        type: String
        format: String
        width: Int
        height: Int
        service: Service
    }
    type Structure {
        id: String
        type: String
        label: Label
        items: [Range]
    }
    type Range {
        id: String
        type: String
        items: [Canvas]
    }
    type Query {
        imageServices(manifestId: String!, type: String!, profile: String): [Service]
        annotation(manifestId: String!, canvasId: String!, annotationPageId: String!, annotationId: String!): Annotation
        annotationPage(manifestId: String!, canvasId: String!, annotationPageId: String!): AnnotationPage
        canvas(manifestId: String!, canvasId: String!): Canvas
        manifest(id: String!): Manifest
    }
`
