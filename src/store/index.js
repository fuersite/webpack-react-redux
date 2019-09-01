import { createStore } from 'redux'
import reducers from './reducers'
import {states} from './states'
console.log(states)
let store = createStore(reducers,states)
console.log(store.getState())
export default store