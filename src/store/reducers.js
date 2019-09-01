import { combineReducers } from 'redux'
import {
  ADD_COUNT,
  SUB_COUNT,
} from './actions'

function addCount(state = [], action) {
  switch (action.type) {
    case ADD_COUNT:
        console.log(action)
    default:
      return state
  }
}

function subCount(state = [], action) {
    switch (action.type) {
      case SUB_COUNT:
            console.log(action)
      default:
        return state
    }
}

const reducers = combineReducers({
  addCount,
  subCount
})

export default reducers