import React, { Component, useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import cleanBankImg from '../img/cleanBank.png'
import miniLogoImg from '../img/logo.png'
import cartaoImg from '../img/cartaoCredito.png'
import extratoImg from '../img/extrato.png'
import Botao from '../components/botao';

const Extrato = ({ logado }) => {
    const navigate = useNavigate()

    const { idGlobal, pix } = useParams();
    const [transacoes, setTransacoes] = useState([])


    // Buscar minhas transações
    useEffect(() => {
        if(logado != idGlobal ){            
            navigate('/')
        }
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get('http://127.0.0.1:8000/banco/transacoes/?cliente_id=' + idGlobal,
            { headers: { Authorization: `JWT ${access_token.access}` } })
            .then((res) => {
                setTransacoes(res.data)
            })
    }, [])

    const voltarMenu = () => {
        navigate(`/menu/${idGlobal}/${pix}`)
    }
    return (
        <>
            <div className='flex flex-row '>
                {/* metade esquerda com foto 1/3*/}
                <div className="h-screen w-1/3 bg-[url('./img/fundoHome.png')] bg-no-repeat bg-cover hidden lg:flex flex-col justify-center">
                    <div className='w-full h-full flex items-center justify-center'>
                        <img src={cleanBankImg} />
                    </div>
                </div>

                {/* metade direita com o menu 2/3 */}
                <div className='h-screen w-full lg:w-2/3 flex flex-col justify-center items-center'>

                    {/* Saudações 1/6 */}
                    <div className='h-1/6 w-11/12 flex flex-row justify-around items-center'>

                        <div className='w-1/2 lg:w-1/3 h-1/2 flex flex-col'>
                            <h3 className='font-semibold text-2xl'>
                                Extrato
                            </h3>
                            <h3 className='italic text-[#011E3E] font-normal'>
                                Aqui estão suas movimentações
                            </h3>
                        </div>

                        <div className='w-1/3 h-1/2 flex justify-end'>
                            <img src={miniLogoImg} className='h-12' />
                        </div>

                    </div>

                    {/* Conteúdo principal do menu 3/5*/}
                    <div className='h-4/5 w-11/12 flex flex-col items-center justify-around overflow-y-auto'>
                        {transacoes.map((item) => (
                            <>
                                <div key={item.id} className='flex flex-row items-center justify-center w-2/3 h-24 bg-[#FFFBFB] rounded-lg 
                                pt-2 m-3'>
                                    {/* Metade esquerda 1/2 */}
                                    <div className='h-full w-1/2 flex flex-col justify-center'>
                                        <h4 className='text-[#5A5252]'><b>Data</b> {item.data}</h4>
                                        <h4 className='text-[#5A5252]'><b>Destinatário</b> {item.destinatario}</h4>
                                    </div>

                                    {/* Metade direira 1/2 */}
                                    <div className='h-full w-1/2 flex flex-col justify-center'>
                                        <h4 className='text-[#5A5252]'><b>Tipo</b> {item.tipo_transacao}</h4>
                                        <h4 className='text-[#5A5252]'><b>Valor</b> R$ {item.valor}</h4>
                                    </div>
                                </div>

                            </>


                        ))}
                    </div>

                    {/* 2/5 para botões */}
                    <div className='w-11/12 h-1/5 flex flex-col items-center justify-center'>
                        <Botao texto='VOLTAR' onClick={() => voltarMenu()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Extrato