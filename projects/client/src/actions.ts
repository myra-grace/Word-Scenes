import { Illustration } from "./models/Illustration"

export const submit = (submitions: string) => ({
    type: 'SUBMIT',
    submitions,
})

export const sourceSelection = (source: string) => ({
    type: 'SOURCE_SELECTION',
    source,
})

export const targetSelection = (target: string) => ({
    type: 'TARGET_SELECTION',
    target,
})

export const illustrationAdded = (illustration: Illustration) => ({
    type: 'ILLUSTRATION_ADDED',
    illustration,
})