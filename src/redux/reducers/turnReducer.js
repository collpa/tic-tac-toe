import { RESET_GAME, UPDATE_TURN } from "../actions/actions";

const initialState = 0;

function turnReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TURN:
      return state + 1;
    case RESET_GAME:
      return 0;
    default:
      return state;
  }
}

export default turnReducer;
