import { HAVE_WINNER, RESET_GAME } from "../actions/actions";

const initialState = false;

function winnerReducer(state = initialState, action) {
  switch (action.type) {
    case HAVE_WINNER:
      return payload;
    case RESET_GAME:
      return false;
    default:
      return state;
  }
}

export default winnerReducer;
