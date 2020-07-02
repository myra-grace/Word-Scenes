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

export const wordAdded = (word: string) => ({
    type: 'WORD_ADDED',
    word,
})

export const illustrationAdded = (illustrations: string) => ({
    type: 'ILLUSTRATION_ADDED',
    illustrations,
})