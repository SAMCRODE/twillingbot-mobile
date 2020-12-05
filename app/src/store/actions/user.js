export const NEW_HANDLE = 'NEW_HANDLE';
export const INIT = 'INIT';

export const new_handle = (handle) => {
    return dispatch => {
        dispatch({ type: NEW_HANDLE, handle: handle });
    };
};

export const init = (handles) => {
    return dispatch => {
        dispatch({ type: INIT, handles: handles });
    };
};