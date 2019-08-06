import {IResolvers} from "graphql-tools"

export const resolvers: IResolvers = {
    Query: {
        annotation: async (source, {manifestId, canvasId, annotationPageId, annotationId}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv3.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationPageId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationId)[0]
            })
        },
        annotationPage: async (source, {manifestId, canvasId, annotationPageId}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv3.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationPageId)[0]
            })
        },
        canvas: async (source, {manifestId, canvasId}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv3.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            })
        },
        imageServices: async (source, {manifestId, type, profile}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv3.getManifest(manifestId).then((res: any) => {
                return res.items.reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.items]
                }, []).reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.items]
                }, []).map((a: any) => a.body.service).filter((s: any) => s.type === type)
            })
        },
        manifest: async (source, {id}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv3.getManifest(id)
        },
        manifestv2: async (source, {id}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv2.getManifest(id)
        },
        imageServicesv2: async (source, {manifestId, profile}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv2.getManifest(manifestId).then((res: any) => {
                return res.sequences.reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.canvases]
                }, []).reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.images]
                }, []).map((a: any) => a.resource.service).filter((s: any) => s.profile === profile)
            })
        },
        imageServicesv2NoProfile: async (source, {manifestId}, {dataSources}): Promise<string> => {
            return dataSources.manifestAPIv2.getManifest(manifestId).then((res: any) => {
                return res.sequences.reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.canvases]
                }, []).reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.images]
                }, []).map((a: any) => a.resource.service)
            })
        },
    },
}
