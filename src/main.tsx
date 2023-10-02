import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import { RouterProvider} from "react-router-dom";
import router from './router/index.tsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
const store = createStore(rootReducer);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
