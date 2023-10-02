import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Cadastro from "./pages/cadastro";
import Extrato from "./pages/extrato";
import CartaoDeCredito from "./pages/cartaoDeCredito";

import { useEffect, useState } from "react";

function App() {
    const [idLogado, setIdLogado] = useState(0)

    const navigate = useNavigate()

    return ( 
        <div>
            <Routes>
                <Route path="/" element={<Home /> } /> 
                <Route path="/cadastro" element={<Cadastro /> } /> 
                <Route path="/login" element={<Login setIdLogado={setIdLogado} />} />
                <Route path="/menu/:idGlobal/:pix" element={<Menu logado={idLogado} />} />
                <Route path="/extrato/:idGlobal/:pix" element={<Extrato logado={idLogado} />} />
                <Route path="/cartao/:idGlobal/:pix" element={<CartaoDeCredito logado={idLogado} />} />                
            </Routes>
        </div>
     );
}

export default App;