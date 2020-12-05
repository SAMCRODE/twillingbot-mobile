import { NEW_HANDLE } from '../actions/user';

const initialState = {
    handles: ['@neymarjr', 'neyilton'],
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case NEW_HANDLE:
          return {
            token: [...state.handles, action.handle]
          };
        default:
            return state
    }
};