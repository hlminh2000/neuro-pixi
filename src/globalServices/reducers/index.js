
import GlobalInitialState from '../GlobalInitialState.js'

export default (state = GlobalInitialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        ...state,
        counter: state.counter + 1
      }
    }
    case 'DECREMENT': {
      return {
        ...state,
        counter: state.counter - 1
      }
    }
    default: return state;
  }
}
