export const submit = (submitions) => ({
    type: 'SUBMIT',
    submitions,
})

export const sourceSelection = (source) => ({
    type: 'SOURCE_SELECTION',
    source,
})

export const targetSelection = (target) => ({
    type: 'TARGET_SELECTION',
    target,
})

export const wordAdded = (word) => ({
    type: 'WORD_ADDED',
    word,
})

export const illustrationAdded = (illustrations) => ({
    type: 'ILLUSTRATION_ADDED',
    illustrations,
})