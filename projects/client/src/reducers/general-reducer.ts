const initialState = {
    submitions:<number> 0,
    source:<string> "fr",
    target:<string> "en",
    words:<string[]> [],
    illustrations:<string[]> [],
}

// it(italian), es(spanish), ru(russian),

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT': {
            return {
                ...state,
                submitions: action.submitions,
            };
        }

        case 'SOURCE_SELECTION': {
            return {
                ...state,
                source: action.source,
            };
        }

        case 'TARGET_SELECTION': {
            return {
                ...state,
                target: action.target,
            };
        }

        case 'WORD_ADDED': {
            return {
                ...state,
                words: action.words,
            };
        }

        case 'ILLUSTRATION_ADDED': {
            return {
                ...state,
                illustrations: [...state.illustrations, action.illustrations],
            };
        }
    
        default:
            return state;
    }
}

export default generalReducer;