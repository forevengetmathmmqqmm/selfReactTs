import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import { RouterProvider} from "react-router-dom";
import router from './router/index.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
