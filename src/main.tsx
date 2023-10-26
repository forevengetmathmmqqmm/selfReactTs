import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import { RouterProvider } from "react-router-dom"
import router from './router/index.tsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
const store = configureStore({
  reducer: rootReducer, 
  devTools: import.meta.env.NODE_ENV !== 'production', 
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    //关闭redux序列化检测
    serializableCheck: false
  })
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
