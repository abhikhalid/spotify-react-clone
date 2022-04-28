export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
};



function reducer(state, action) {

    // console.log(action);

    switch (action.type) {
        case actionTypes.SET_USER:

            // console.log('Hello World');

            return {
                ...state,
                user: action.user,
            };

        default:

            return state;
    }
}

export default reducer;

