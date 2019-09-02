import { createStore } from 'redux'
import reducers from './reducers'
import {states} from './states'
let store = createStore(reducers,states)
export default store