const initialState = {
    submitions:<number> 0,
    source:<string> "fr",
    target:<string> "en",
    illustrations: [],
}

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

        case 'ILLUSTRATION_ADDED': {
            return {
                ...state,
                illustrations: [...state.illustrations, action.illustration],
            };
        }
    
        default:
            return state;
    }
}

export default generalReducer;