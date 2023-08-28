import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import App from './App.jsx';
import Merger from './Merger/Merger.jsx';
import Image_to_pdf from './Image_to_pdf/img_to_pdf';
import Spliter from './spliter/spliter';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
  },
  {
    path:'/merge',
    element: <Merger/>,
  },
  {
    path:'/image_to_pdf',
    element: <Image_to_pdf/>,
  },
  {
    path:'/spliter',
    element: <Spliter/>,
  },


])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
