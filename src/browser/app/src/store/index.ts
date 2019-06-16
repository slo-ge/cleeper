import { createStore} from "redux";
import { clipBoardReducer} from "./reducers";

const store = createStore(clipBoardReducer);
export default store;
