import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  todos: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/getAll':
      return { ...state, todos: action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store