
import { createStore } from 'redux'
import reducers from './reducers/index.js'
import Observables from './Observables.js'

console.log(Observables);

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
