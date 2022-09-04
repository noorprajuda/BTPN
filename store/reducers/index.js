import {
  CONTACTS_FETCH_SUCCESS,
  CONTACT_FETCH_SUCCESS,
} from "../action/actionType";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = { contacts: [], contact: {} };

function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case CONTACTS_FETCH_SUCCESS:
      return { ...state, contacts: action.payload };
    case CONTACT_FETCH_SUCCESS:
      return { ...state, contact: action.payload };
    default:
      return state;
  }
}

let store = createStore(contactsReducer, applyMiddleware(thunk));

export default store;
