import React, { Component, useState, useEffect } from 'react'
import Botao from '../components/botao'
import Swal from 'sweetalert2';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import miniLogoImg from '../img/logo.png'
import cartoes from '../img/cartoes.png'


const CartaoDeCredito = ({ logado }) => {
    const navigate = useNavigate()
    const { idGlobal, pix } = useParams();

    const getConta = 'http://127.0.0.1:8000/banco/conta/' + idGlobal
    const getCliente = 'http://127.0.0.1:8000/banco/cliente/' + idGlobal
    const [dadosConta, setDadosConta] = useState([])
    const [dadosCliente, setDadosCliente] = useState([])
    const [dadosCartao, setDadosCartao] = useState([])
    const [temCartao, setTemCartao] = useState(false)


    // Busca dados do cartão de crédito
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

    // Busca dados da conta
    useEffect(() => {
        console.log('ID conta ' + idGlobal)
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(`http://127.0.0.1:8000/banco/cartao/${idGlobal}`,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {
                setDadosCartao(res.data)
                console.log(res.data)
                setTemCartao(true)
            })
            .catch(function (error) {                
                setTemCartao(false)
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
    const voltar = () => {
        navigate(`/menu/${idGlobal}/${pix}`)
    }


    // Cadastra novo cartão de crédito
    const solicitarCartao = () => {
        let access_token = JSON.parse(localStorage.getItem('token'))
        console.log(access_token.access)
        axios
            .post(`http://127.0.0.1:8000/banco/cartao/`, {
                cliente: idGlobal,
                conta: idGlobal,
                numero: (Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000).toString(),
                validade: '2030-01-01',
                cvv: (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString(),
                bandeira: 'VISA',
                situacao: 'aprovado'
            },
                { headers: { Authorization: `JWT ${access_token.access}` } },
            )
            .then(function (response) {                
                Swal.fire(
                    'Cartão solicitado com sucesso !!',
                    'Em breve ele irá aparecer aqui',
                    'success'
                  )
                navigate(`/menu/${idGlobal}/${pix}`)
            })
            .catch(function (error) {
                console.log('Deu ruim')
                console.log(error)
            })
    }

    return (
        <>


            <div className='flex flex-col md:flex-row h-screen'>
                {/* metade esquerda com foto 1/3*/}
                <div className="h-1/2 md:h-screen w-full md:w-1/3 bg-no-repeat bg-cover flex flex-col justify-center">
                    <div className='w-full h-full flex items-center justify-center'>
                        <img src={cartoes} />
                    </div>
                </div>

                {/* metade direita com o menu 2/3 */}
                <div className='h-screen w-full md:w-2/3 flex flex-col justify-center items-center '>

                    {/* Saudações 1/6 */}
                    <div className='h-2/6 w-11/12 flex flex-row justify-around items-center'>

                        <div className='w-1/3 h-1/2 flex flex-col'>                            

                        </div>

                        <div className='w-1/3 h-1/2 flex justify-end'>
                            <img src={miniLogoImg} className='h-12' />
                        </div>

                    </div>

                    {/* Se não tem cartão */}
                    {
                        temCartao == false ?
                            <>

                                {/* Conteúdo principal do menu 5/6*/}
                                <div className='h-5/6 w-11/12 flex flex-col items-center justify-around'>
                                    {/* 1/3 para textos/apresentação do cartão */}
                                    <div className='h-full w-11/12  '>
                                        <h1 className='font-bold text-xl md:text-2xl text-[#293751]'>
                                            Solicite seu cartão de crédito nessa página, {dadosCliente.nome}!
                                        </h1>
                                        <h3 className='font-normal text-base text-[#293751] pt-5'>
                                            Algumas vantagens que envolvem do cartão da CLEAN BANK são: Seguro em todo território nacional,
                                            possibilidade de utilizar no exterior , tudo isso sem taxas.
                                        </h3>
                                    </div>

                                    {/* 2/3 para funcionalidades cartão */}
                                    <div className='h-2/3 w-11/12 flex items-center justify-center'>
                                        <Botao texto='SOLICITAR' onClick={() => solicitarCartao()} />
                                    </div>
                                </div>

                                <div className='h-2/3 w-11/12 flex flex-col  justify-center items-center'>
                                    <Botao texto='VOLTAR' onClick={() => voltar()} />
                                </div>
                            </> : null
                    }

                    {/* Se tem cartão */}
                    {
                        temCartao == true ?
                            <>
                                {/* Conteúdo principal do menu 5/6*/}
                                <div className='h-5/6 w-11/12 flex flex-col items-center justify-around'>
                                    {/* 1/3 para textos/apresentação do cartão */}
                                    <div className='h-1/3 w-11/12'>
                                        <h1 className='font-bold text-lg md:text-2xl text-[#293751]'>
                                            Aqui estão seus dados, {dadosCliente.nome}!
                                        </h1>
                                    </div>

                                    {/* 2/3 para funcionalidades cartão */}
                                    <div className='h-2/3 w-11/12 flex items-center justify-center'>

                                        {/* Metade esquerda das informações 1/2 */}
                                        <div className='w-1/2 h-full flex flex-col items-center justify-center'>
                                            <div className='flex flex-col items-start'>
                                                <h3 className='font-semibold text-xl text-[#293751]'>
                                                    Conta <br></br>
                                                </h3>
                                                <h4 className='text-[#293751]'>
                                                    {dadosConta.conta}
                                                </h4>

                                                <h3 className='font-semibold text-xl text-[#293751]'>
                                                    Agência <br></br>
                                                </h3>
                                                <h4 className='text-[#293751]'>
                                                    {dadosConta.agencia}
                                                </h4>

                                                <h3 className='font-semibold text-xl text-[#293751]'>
                                                    Validade <br></br>
                                                </h3>
                                                <h4 className='text-[#293751]'>
                                                    {dadosCartao.validade}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Metade direita das informações 1/2 */}
                                        <div className='w-1/2 h-full flex flex-col items-center justify-center'>
                                            <div className='flex flex-col items-start'>
                                                <h3 className='font-semibold text-xl text-[#293751]'>
                                                    Bandeira <br></br>
                                                </h3>
                                                <h4 className='text-[#293751]'>
                                                    {dadosCartao.bandeira}
                                                </h4>

                                                <h3 className='font-semibold text-xl text-[#293751]'>
                                                    CVV <br></br>
                                                </h3>
                                                <h4 className='text-[#293751]'>
                                                    {dadosCartao.cvv}
                                                </h4>

                                                <h3 className='font-semibold text-xl text-[#293751]'>
                                                    Número <br></br>
                                                </h3>
                                                <h4 className='text-[#293751]'>
                                                    {dadosCartao.numero}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='h-2/3 w-full flex flex-col  justify-center items-center'>
                                    <Botao texto='VOLTAR' onClick={() => voltar()} />
                                </div>

                            </> : null
                    }



                </div>
            </div>
        </>
    )
}

export default CartaoDeCredito