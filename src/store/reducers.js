import { combineReducers } from 'redux'
import {
  ADD_COUNT,
  SUB_COUNT,
} from './actions'

function count(state = 0, action) {
  switch (action.type) {
    case ADD_COUNT:
        state++
        console.log(state)
        return state
    case SUB_COUNT:
        state++
        return {}
  default:
    return state
  }
}

const reducers = combineReducers({
  count
})

export default reducers