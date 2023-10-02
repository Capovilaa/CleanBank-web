import React, { Component, useState } from 'react'
import InputSite from '../components/input'
import Botao from '../components/botao'
import Swal from 'sweetalert2';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const Login = ({ setIdLogado }) => {
    const navigate = useNavigate()

    const irCadastro = () => {
        navigate('/cadastro')
    }

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [statusLogin, setStatusLogin] = useState(false)
    const pix = 'a'


    const logar = () => {
        axios
            .post('http://127.0.0.1:8000/auth/jwt/create', {
                cpf: user,
                password: password,
            })
            .then(function (response) {
                localStorage.setItem('token', JSON.stringify({ access: (response.data.access) }))
                axios.get('http://127.0.0.1:8000/auth/users/',
                    {
                        headers: {
                            Authorization: `JWT ${response.data.access}`
                        }
                    })
                    .then((res) => {
                        setStatusLogin(true)
                        setIdLogado(res.data[0].id)
                        navigate(`/menu/${res.data[0].id}/${pix}`)
                    })

            })
            .catch(function (error) {                
                Swal.fire(
                    'Ops...',
                    'Credenciais incorretas',
                    'error'
                  )                  
            })
    }

    return (
        <>
            <div className='flex flex-row '>
                {/* metade esquerda com foto 1/3*/}
                <div className="h-screen w-1/3 bg-[url('./img/fundoHome.png')] bg-no-repeat bg-cover lg:flex flex-col justify-center 
                hidden ">
                    <div className='w-full h-full flex items-center justify-center'>
                        <img src="src\img\cleanBank.png" className='' />
                    </div>
                </div>

                {/* metade esquerda com o menu 2/3 */}
                <div className='h-screen lg:w-2/3 flex flex-col justify-center items-center 
                sm: w-full'>

                    {/* Saudações 1/6 */}
                    <div className='h-1/6 w-11/12 flex flex-row justify-around items-center'>

                        <div className='h-1/2 flex flex-col'>
                            <h1 className='text-[#5A5252] font-bold italic text-5xl'>
                                LOGIN
                            </h1>
                        </div>
                    </div>

                    {/* Conteúdo principal do menu 3/6*/}
                    <div className='h-3/6 w-11/12 flex flex-col items-center justify-center'>
                        <InputSite placeholder='CPF' set={setUser} value={user} />                        
                        <input type='password' className='lg:w-2/5 min-[600px]:w-2/3 border-b-2 p-1 border-[#8D8E90] placeholder:text-slate-400 placeholder-[#C5C6C8] 
                        text-sm font-semibold' placeholder='Senha' onChange={e => { setPassword(e.target.value) }} value={password} />
                    </div>

                    {/* 2/6 para botão */}
                    <div className='w-full h-2/6 flex flex-col items-center justify-center'>
                        {/* botão de fato 2/3 */}
                        <div className='h-2/3 w-full flex flex-col  justify-center items-center'>
                            <Botao texto='CONTINUAR' onClick={() => logar()} />
                            <button className='pt-10' onClick={() => irCadastro()}>
                                Cadastrar
                            </button>
                        </div>

                        {/* apenas para logo 1/3 */}
                        <div className='h-1/3 w-full flex flex-row items-end justify-end'>
                            <img src='src\img\logo.png' className='p-3' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login