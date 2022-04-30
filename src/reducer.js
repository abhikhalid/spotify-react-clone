export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    discover_weekly: null,
    top_artists: null,
    playing: false,
    item: null,
    token: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_PLAYLISTS: "SET_PLAYLISTS",
    SET_DISCOVER_WEEKLY: "SET_DISCOVER_WEEKLY",
    SET_TOP_ARTISTS: "SET_TOP_ARTISTS",
    SET_PLAYING: "SET_PLAYING",
    SET_ITEM: "SET_ITEM",
    SET_TOKEN: "SET_TOKEN",
    SET_SPOTIFY: "SET_SPOTIFY",

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

        case actionTypes.SET_TOKEN:

            return {
                ...state,
                token: action.token,
            };

        case actionTypes.SET_PLAYLISTS:

            return {
                ...state,
                playlists: action.playlists
            };
        case actionTypes.SET_DISCOVER_WEEKLY:

            return {
                ...state,
                discover_weekly: action.discover_weekly
            };



        default:

            return state;
    }
}

export default reducer;


