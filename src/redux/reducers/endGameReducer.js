import { END_GAME, HAVE_WINNER, RESET_GAME } from "../actions/actions";

const initialState = false;

function endGameReducer(state = initialState, action) {
  switch (action.type) {
    case HAVE_WINNER:
    case END_GAME:
      return true;
    case RESET_GAME:
      return false;
    default:
      return state;
  }
}

export default endGameReducer;
