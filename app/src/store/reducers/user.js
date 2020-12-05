import { AsyncStorage } from 'react-native';
import { NEW_HANDLE, INIT } from '../actions/user';

const initialState = {
    handles: ['@neymarjr', 'neyilton'],
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case NEW_HANDLE:
          let handle = action.handle;
          handle = handle.replace('@', '');
          handle = '@' + handle;

          if(state.handles.some((val) => val.toLowerCase() === handle.toLowerCase())){
            return state;
          }
          AsyncStorage.setItem('handles', JSON.stringify([...state.handles, handle]));
          return {
            handles: [...state.handles, handle]
          };
        case INIT:
          return { handles: action.handles };
        default:
            return state
    }
};