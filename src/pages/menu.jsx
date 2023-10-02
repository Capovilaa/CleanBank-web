import React, { Component, useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import cleanBankImg from '../img/cleanBank.png'
import miniLogoImg from '../img/logo.png'
import cartaoImg from '../img/cartaoCredito.png'
import extratoImg from '../img/extrato.png'

const Menu = ({ logado }) => {
    const navigate = useNavigate()
    const { idGlobal, pix } = useParams();

    const getConta = 'http://127.0.0.1:8000/banco/conta/' + idGlobal
    const getCliente = 'http://127.0.0.1:8000/banco/cliente/' + idGlobal
    const [dadosConta, setDadosConta] = useState([])
    const [dadosCliente, setDadosCliente] = useState([])

    const [saldoVisivel, setSaldoVisivel] = useState(false)

    // Busca dados da conta
    useEffect(() => {
        if (logado != idGlobal) {
            navigate('/')
        }
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(getConta,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {
                setDadosConta(res.data)
            })
    }, [pix])

    // Busca dados cliente
    useEffect(() => {
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(getCliente,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {
                setDadosCliente((res.data))
            })
    }, [pix])


    // Navegação
    // Ir para extrato
    const irExtrato = () => {
        navigate(`/extrato/${idGlobal}/${pix}`)
    }

    // Ir cartão de crédito
    const irCartao = () => {
        navigate(`/cartao/${idGlobal}/${pix}`)
    }

    const irHome = () => {
        navigate('/')
    }

    const visibilidade = (num) => {
        if(num == 1){
            setSaldoVisivel(true)
        }else{
            setSaldoVisivel(false)
        }
    }

    return (
        <>
            {console.log(idGlobal)}
            <div className='flex  flex-col md:flex-row h-screen'>
                {/* metade esquerda com foto 1/3*/}
                <div className="h-60 md:h-screen w-full md:w-1/3 bg-[url('./img/fundoHome.png')] bg-no-repeat bg-cover flex flex-col justify-center">
                    <div className='w-full md:h-full flex items-center justify-center'>
                        <img src={cleanBankImg} className='w-1/5 md:w-1/3 cursor-pointer' onClick={irHome} />
                    </div>
                </div>

                {/* metade direita com o menu 2/3 */}
                <div className='h-full md:h-screen w-full md:w-2/3 flex flex-col justify-center items-center'>

                    {/* Saudações 1/6 */}
                    <div className='h-1/6 w-11/12 flex flex-row justify-around items-center'>

                        <div className='w-2/3 lg:w-1/3 h-1/2 flex flex-col'>
                            <h3 className='font-semibold md:text-xl lg:text-2xl'>
                                Bem vindo, {dadosCliente.nome}
                            </h3>
                            {
                                saldoVisivel == false ?
                                    <>
                                        <h3 onClick={() => visibilidade(1)} className='cursor-pointer italic text-[#011E3E] font-normal text-lg'>
                                            SEU SALDO <br></br> R$-------
                                        </h3>
                                    </> : null
                            }

                            {
                                saldoVisivel == true ?
                                    <>
                                        <h3 onClick={() => visibilidade(2)} className='cursor-pointer italic text-[#011E3E] font-normal text-lg'>
                                            SEU SALDO <br></br> R${dadosConta.saldo}
                                        </h3>
                                    </> : null
                            }
                        </div>

                        <div className='w-1/3 h-1/2 flex justify-end'>
                            <img src={dadosCliente.foto} className='rounded-full' />
                        </div>

                    </div>

                    {/* Conteúdo principal do menu 5/6*/}

                    <div className='h-5/6 w-[100vw] md:w-11/12 flex flex-col xl:flex-row items-center justify-around'>

                        {/* Opção esquerda cartão de crédito 1/5 */}
                        <button onClick={irCartao}>
                            <div className='h-48 w-48 sm:h-60 sm:w-60 lg:h-80 lg:w-80 bg-white rounded-3xl drop-shadow-2xl'>
                                {/* para imagem do cartão 4/5 */}
                                <div className='w-full h-4/5 flex items-center justify-center'>
                                    <img src={cartaoImg} className='w-11/12' />
                                </div>

                                {/* para o texto 1/5 */}
                                <div className='w-full h-1/5 flex items-center justify-center'>
                                    <h4 className='text-[#011E3E] font-semibold text-xl'>
                                        Cartão de crédito
                                    </h4>
                                </div>
                            </div>
                        </button>



                        {/* Opção direita extrato 1/5 */}
                        <button onClick={irExtrato}>
                            <div className='h-48 w-48 sm:h-60 sm:w-60 lg:h-80 lg:w-80 bg-white rounded-3xl drop-shadow-2xl'>
                                {/* para imagem do cartão 4/5 */}
                                <div className='w-full h-4/5 flex items-center justify-center'>
                                    <img src={extratoImg} className='w-8/12' />
                                </div>

                                {/* para o texto 1/5 */}
                                <div className='w-full h-1/5 flex items-center justify-center'>
                                    <h4 className='text-[#011E3E] font-semibold text-xl'>
                                        Extrato
                                    </h4>
                                </div>
                            </div>
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu