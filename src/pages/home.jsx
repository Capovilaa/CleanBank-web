import React, { Component } from 'react'
import Botao from '../components/botao'
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()    
    const irLogin = () => {
        navigate('/login')
    }

    return (
        <>
            <div className='overflow-x-hidden snap-proximity snap-y overflow-scroll h-screen w-screen scroll-smooth'>

                {/* primeira parte home */}
                <div className="h-screen w-screen bg-[url('./img/fundoHome.png')] 
            flex-col justify-center items-center bg-no-repeat bg-fixed bg-cover snap-center">

                    {/* div para icon */}
                    <div className="w-screen flex items-center">
                        <img src='src\img\logo.png' className='h-14 p-3' />                        
                    </div>

                    {/* div para título */}
                    <div className="h-5/6 w-screen flex items-center justify-center">
                        <h1 className="text-white text-6xl font-bold font-">CLEAN <br></br> BANK</h1>
                    </div>

                </div>

                {/* segunda parte home */}
                <div className="h-screen w-screen flex md:flex-row items-center justify-center snap-center 
                flex-col">

                    {/* metade esquerda com bg e escrita 1/2 */}
                    <div className='h-screen md:w-1/2 bg-[#011E3E] flex flex-col items-center 
                    w-full'>
                        {/* para o ícone 1/6*/}
                        <div className='w-full h-1/6 flex items-center'>
                            <img src='src\img\logo.png' className='h-14 p-3' />
                        </div>

                        {/* para título 2/6 */}
                        <div className='w-11/12 h-1/6'>
                            <h1 className='text-white font-bold p-3 text-2xl 
                            sm:text-4xl'>
                                O QUE<br></br> OFERECEMOS
                            </h1>
                        </div>

                        {/* para informações 4/6 */}
                        <div className='w-full h-4/6 flex flex-col items-center justify-center'>

                            {/* seguranca */}
                            <div className='w-5/6 h-1/3 flex flex-row items-center'>
                                <img src='src\img\seguranca.png' className='h-14' />
                                <h2 className='text-white pl-5 text-base'>
                                    <b>Segurança</b> em primeiro, segundo e<br></br> terceiro <b>lugar</b>.
                                </h2>
                            </div>

                            {/* empréstimo */}
                            <div className='w-5/6 h-1/3 flex flex-row items-center'>
                                <img src='src\img\emprestimo.png' className='h-14' />
                                <h2 className='text-white pl-5 text-base'>
                                    Empréstimos <b>justos</b>, com taxa de<br></br><b>3.4%</b> ao mês.
                                </h2>
                            </div>

                            {/* 24 horas */}
                            <div className='w-5/6 h-1/3 flex flex-row items-center'>
                                <img src='src\img\funcionamento.png' className='h-12' />
                                <h2 className='text-white pl-5 text-base'>
                                    Funcionamento <b>24 horas por dia</b>,<br></br> 7 dias por semana.
                                </h2>
                            </div>

                        </div>

                    </div>

                    {/* metade direita com a imagem */}
                    <div className="h-screen w-full bg-[url('./img/celular.png')] bg-cover bg-cebg-no-repeat 
                    min-[500px]:w-full">

                    </div>
                </div>

                {/* terceira parte home */}
                <div className='h-screen w-screen flex flex-col md:flex-row items-center justify-center bg-white snap-center'>

                    {/* metade esquerda com foto dos cartões */}
                    <div className='w-full md:w-1/2 h-screen flex flex-col items-center'>

                        {/* para icone 1/6 */}
                        <div className='w-full h-1/6 flex items-center'>
                            <img src='src\img\logo.png' className='h-14 p-3' />
                        </div>

                        {/* para imagem do cartão 5/6 */}
                        <div className='h-5/6 w-full flex items-center justify-center'>
                            <img src='src\img\cartoes.png' className='md:h-1/2 hover:scale-105 transition duration-200' />
                        </div>
                    </div>

                    {/* metade direita com informações dos cartões */}
                    <div className='w-full md:w-1/2 h-screen flex items-center justify-center'>
                        <div className='h-1/6'>

                        </div>
                        {/* para juntar todas as informações dos cartões */}
                        <div className='w-full flex flex-col items-center justify-center'>

                            {/* 1/3 para titulo */}
                            <div className='w-11/12 h-1/3 flex justify-center md:items-center md:justify-start'>
                                <h1 className='text-[#011E3E] font-bold text-3xl w-10/12 md:text-4xl'>
                                    NOSSOS<br></br> CARTÕES
                                </h1>
                            </div>

                            {/* 2/3 para informações de fato */}
                            <div className='w-11/12 h-2/3 flex md:flex-col justify-around'>
                                <p className='font-normal text-lg w-1/3 md:w-full'>
                                    Cartões sem anuidade e ainda com a <br></br>possibilidade de usar no exterior.
                                </p>
                                <p className='font-normal text-lg pt-0 md:pt-10 w-1/3 md:w-full'>
                                    Ainda com garantia anti furto que <br></br>cobre todo território nacional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* quarta parte home */}
                <div className='h-screen w-screen flex flex-col lg:flex-row items-center justify-center snap-center'>

                    {/* metade esquerda com foto do veio 2/3*/}
                    <div className="h-screen w-full lg:w-2/3 bg-[url('./img/velho.png')] bg-center bg-cover bg-no-repeat">
                        <div className='w-full h-1/6 flex items-center'>
                            <img src='src\img\logo.png' className='h-14 p-3' />
                        </div>
                    </div>

                    {/* metade direita 1/3 */}
                    <div className='h-screen w-11/12 lg:w-1/3 bg-white '>

                        {/* metade de cima 1/2 */}
                        <div className='h-5/6 lg:h-1/2'>
                            {/* titulo 1/3 */}
                            <div className='h-1/3 w-11/12 flex flex-col items-center justify-end'>
                                <h1 className='w-4/6 text-[#011E3E] font-bold text-lg md:text-2xl lg:text-4xl'>FAÇA PARTE</h1>
                                <h2 className='w-4/6 text-[#011E3E] font-semibold text-lg md:text-xl lg:text-3xl'>AGORA MESMO</h2>
                            </div>

                            {/* informações 2/3 */}
                            <div className='h-2/3 w-11/12 flex flex-col items-center justify-center'>
                                <p className='w-4/6 font-semibold text-[#011E3E]'>
                                    Entre para o banco que mais cresce
                                </p>
                                <p className='w-4/6 text-[#011E3E]'>
                                    300 mil novos usuários nos útimos 3 meses.
                                </p>

                                <p className='w-4/6 font-semibold text-[#011E3E]'>
                                    <br></br>Crie sua conta de onde estiver!
                                </p>
                                <p className='w-4/6 text-[#011E3E]'>
                                    Se cadastrar não leva mais de 2 minutos.
                                </p>
                            </div>
                        </div>


                        {/* metade de baixo 1/2 */}
                        <div className='h-1/6 lg:h-1/2 flex items-center justify-center'>
                            <Botao texto='COMEÇAR' onClick={irLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home