import {gql} from 'apollo-server'

export const typeDefs = gql`
    type Manifest {
        id: String!
        type: String!
        label: String
        summary: String
        metadata: [Metadata]!
        homepage: [Homepage]!
        logo: [Logo]!
        thumbnail: [Thumbnail]!
        requiredStatement: RequiredStatement
        partOf: PartOf
        behavior: Behavior
        items(id: String): [Canvas]!
        seeAlso: [SeeAlso]
        structures: [Structure]!
    }
    type Manifestv2 {
        id: String!
        description: String
        type: String!
        label: String
        license: String
        attribution: String
        logo: String
        related: [String]
        seeAlso: [SeeAlso]
        metadata: [Metadatav2]
        sequences: [Sequence]!
        thumbnail: String
        structures: [Structurev2]
    }

    type SeeAlso {
        id: String!
        format: String!
    }
    type Sequence {
        canvases: [Canvasv2]!
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
    type Metadatav2 {
        label: String
        value: String
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
    type Canvasv2 {
        id: String
        type: String
        label: String
        width: Int
        height: Int
        images: [Annotationv2]!
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
    type Annotationv2 {
        id: String
        type: String
        motivation: String
        on: String
        resource: Body
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
    type Structurev2 {
        id: String
        type: String
        label: String
        ranges: [String]
        canvases: [String]
        metadata: [Metadatav2]
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
        manifestv2(id: String!): Manifestv2
        imageServicesv2(manifestId: String!, profile: String): [Service]
        imageServicesv2NoProfile(manifestId: String!): [Service]
    }
`
