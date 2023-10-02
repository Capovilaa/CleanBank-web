import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, BrowserRouter} from 'react-router-dom'
import Home from './pages/home.jsx'
import Cadastro from './pages/cadastro'
import Menu from './pages/menu'
import Login from './pages/login'
import Extrato from './pages/extrato'
import CartaoDeCredito from './pages/cartaoDeCredito'
import App from './App';

// const [idLogado, setIdLogado] = useState(0)

const Rotas = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/menu/:idGlobal/:pix",
    element: <Menu  />
  },
  {
    path: "/login",
    element: <Login  />
  },
  {
    path: "/extrato/:idGlobal/:pix",
    element: <Extrato />
  },
  {
    path: "/cartao/:idGlobal/:pix",
    element: <CartaoDeCredito />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={Rotas} /> */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
