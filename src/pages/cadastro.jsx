import React, { Component, useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Botao from '../components/botao'
import InputSite from '../components/input'
import axios from 'axios';


const Cadastro = () => {
    const navigate = useNavigate()

    const voltar = () => {
        navigate('/login')
    }


    const [passo, setPasso] = useState(1)

    const [numCPF, setNumCPF] = useState()

    const [nomeCompleto, setNomeCompleto] = useState('')
    const [email, setEmail] = useState('')
    const [validaEmail, setValidaEmail] = useState([])
    const [dataNasc, setDataNasc] = useState('')
    const [celular, setCelular] = useState('')

    const cepURL = `https://viacep.com.br/ws/`
    const [numCEP, setCEP] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')

    const [senha, setSenha] = useState('')
    const [senhaConf, setSenhaConf] = useState('')

    const [imagem, setImagem] = useState()

    // Navegação
    const proximoPasso = (num) => {
        setPasso(num)
    }

    function converter_imagem(e) {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImagem(reader.result)
        };
    }


    // Api via cep
    useEffect(() => {
        axios
            .get('https://viacep.com.br/ws/' + numCEP + '/json/', {

            })
            .then(function (response) {
                setLogradouro(response.data.logradouro)
                setCidade(response.data.localidade)
                setUF(response.data.uf)
                setBairro(response.data.bairro)
            })
            .catch(function (error) {
                if (numCEP.length == 9) {
                    console.log(error)
                }
            })
    }, [numCEP])


    // CADASTROS
    const cadastrarAuthUser = () => {
        axios
            .post('http://127.0.0.1:8000/auth/users/', {
                email: '',
                cpf: numCPF,
                password: senha
            })
            .then(function (response) {
                retornarJWT(response.data.id)

            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const retornarJWT = (pegarId) => {
        axios
            .post('http://127.0.0.1:8000/auth/jwt/create', {
                cpf: numCPF,
                password: senha,
            })
            .then(function (response) {
                cadastrarUserModel(response.data.access, pegarId)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const cadastrarUserModel = (acesso, pegarId) => {
        axios
            .post('http://127.0.0.1:8000/banco/cliente/', {
                nome: nomeCompleto,
                cpf_cliente: numCPF,
                email: email,
                foto: imagem,
                data_nascimento: dataNasc,
                user: pegarId,
            },
                { headers: { Authorization: `JWT ${acesso}` } },
            )
            .then(function (response) {
                cadastrarEnderecoModel(acesso, pegarId)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const cadastrarEnderecoModel = (acesso, id) => {
        axios
            .post('http://127.0.0.1:8000/banco/endereco/', {
                cliente: id,
                logradouro: logradouro,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                cep: numCEP,
            },
                { headers: { Authorization: `JWT ${acesso}` } },
            )
            .then(function (response) {
                cadastrarContaModel(acesso, id)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const cadastrarContaModel = (acesso, id) => {
        let geraConta = (Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111).toString()
        axios
            .post('http://127.0.0.1:8000/banco/conta/', {
                cliente: id,
                agencia: '4444',
                conta: geraConta,
                saldo: 1000,
                situacao_cartao: false
            },
                { headers: { Authorization: `JWT ${acesso}` } },
            )
            .then(function (response) {                
                Swal.fire(
                    'Bom trabalho!',
                    'Cadastro finalizado',
                    'success'
                  )
                navigate('/login')
                console.log(response)
            })
            .catch(function (error) {
                Swal.fire(
                    'Ops...',
                    'Problema ao cadastrar',
                    'error'
                  )
                console.log(error)
            })
    }


    // VALIDAÇÕES

    // Validação CPF
    const validacaoCPF = () => {
        if (numCPF.length == 11) {
            proximoPasso(2)
        } else {
            Swal.fire(
                'Ops...',
                'CPF inválido',
                'error'
              )
        }
    }


    // Validação E-mail
    const validacaoEmail = () => {
        if (!validaEmail.includes(email) && email.includes('@') && email.includes('.com')) {
            if (nomeCompleto != '' && dataNasc != '' && celular != '') {
                proximoPasso(3)
            }
            else {
                alert('Preencha todos os campos')
            }
        }
        else {
            alert('E-mail inválido')
        }
    }


    // Validação endereço
    const validacaoEndereco = () => {
        if (numCEP != '' && logradouro != '' && bairro != '' && cidade != '' && uf != '') {
            proximoPasso(4)
        } else {
            alert('Preencha todos os campos')
        }
    }


    // Validação senha
    const validacaoSenha = () => {
        if (senha != '' && setSenhaConf != '') {
            if (senha == senhaConf) {
                if (imagem != null) {
                    console.log('pode cadastrar')
                    cadastrarAuthUser()
                } else {
                    alert('Selecione uma imagem')
                }
            }
            else {
                alert('Senhas não estão iguais')
            }
        } else {
            alert('Preenhca todos os campos')
        }
    }


    return (
        <>
            {/* cadastro cpf */}
            {
                passo == 1 ?
                    <>
                        <div className='h-screen w-screen flex flex-row'>
                            {/* metade esquerda com foto 1/3 */}
                            <div className="h-screen w-1/3 bg-[url('./img/start.png')] bg-no-repeat bg-cover lg:flex flex-col justify-center 
                            sm: hidden bg-center">
                                <div className="h-screen w-3/6 flex flex-col justify-end">
                                    <img src='src\img\cleanBank.png' className='w-1/2 p-4' />
                                </div>
                            </div>

                            {/* metade direita com cadastro */}
                            <div className='h-screen lg:w-2/3 flex flex-col justify-center items-center 
                            sm: w-full'>

                                {/* 1/6 para o título da página */}
                                <div className='w-5/6 h-1/6 flex flex-col items-center justify-center'>
                                    <h1 className='text-[#5A5252] font-bold italic text-5xl'>
                                        CADASTRO
                                    </h1>
                                </div>

                                {/* 3/6 para conteúdo */}
                                <div className='w-5/6 h-3/6 flex flex-col items-center justify-center'>
                                    <InputSite placeholder='CPF' set={setNumCPF} value={numCPF} />
                                </div>

                                {/* 2/6 para botão */}
                                <div className='w-full h-2/6 flex flex-col items-center justify-center'>
                                    {/* botão de fato 2/3 */}
                                    <div className='h-2/3 w-full flex flex-col  justify-center items-center'>
                                        <Botao texto='CONTINUAR' onClick={() => validacaoCPF()} />
                                        <button className='pt-10' onClick={() => voltar()}>
                                            Voltar
                                        </button>
                                    </div>


                                    {/* apenas para logo 1/3 */}
                                    <div className='h-1/3 w-full flex flex-col items-end justify-end'>
                                        <img src='src\img\logo.png' className='p-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : null
            }


            {/* cadastro dados pessoais */}
            {
                passo == 2 ?
                    <>
                        <div className='h-screen w-screen flex flex-row'>
                            {/* metade esquerda com foto 1/3 */}
                            <div className="h-screen w-1/3 bg-[url('./img/start.png')] bg-no-repeat bg-cover lg:flex flex-col justify-center 
                            sm: hidden bg-center">
                                <div className="h-screen w-3/6 flex flex-col justify-end">
                                    <img src='src\img\cleanBank.png' className='w-1/2 p-4' />
                                </div>
                            </div>

                            {/* metade direita com cadastro */}
                            <div className='h-screen lg:w-2/3 flex flex-col justify-center items-center 
                            sm: w-full'>

                                {/* 1/6 para o título da página */}
                                <div className='w-5/6 h-1/6 flex flex-col items-center justify-center'>
                                    <h1 className='text-[#5A5252] font-bold italic text-5xl'>
                                        CADASTRO
                                    </h1>
                                </div>

                                {/* 3/6 para conteúdo */}
                                <div className='w-5/6 h-3/6 flex flex-col items-center justify-center'>
                                    <InputSite placeholder='Nome completo' set={setNomeCompleto} value={nomeCompleto} />
                                    <InputSite placeholder='E-mail' set={setEmail} value={email} />
                                    <InputSite placeholder='Data nascimento' set={setDataNasc} value={dataNasc} />
                                    <InputSite placeholder='Celular' set={setCelular} value={celular} />
                                </div>

                                {/* 2/6 para botão */}
                                <div className='w-full h-2/6 flex flex-col items-center justify-center'>
                                    {/* botão de fato 2/3 */}
                                    <div className='h-2/3 w-full flex flex-col justify-center items-center'>
                                        <Botao texto='CONTINUAR' onClick={() => validacaoEmail()} />
                                        <button className='pt-10' onClick={() => proximoPasso(1)}>
                                            Voltar
                                        </button>
                                    </div>

                                    {/* apenas para logo 1/3 */}
                                    <div className='h-1/3 w-full flex items-end justify-end'>
                                        <img src='src\img\logo.png' className='p-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : null
            }


            {/* cadastro dados endereco */}
            {
                passo == 3 ?
                    <>
                        <div className='h-screen w-screen flex flex-row'>
                            {/* metade esquerda com foto 1/3 */}
                            <div className="h-screen w-1/3 bg-[url('./img/start.png')] bg-no-repeat bg-cover lg:flex flex-col justify-center 
                            sm: hidden bg-center">
                                <div className="h-screen w-3/6 flex flex-col justify-end">
                                    <img src='src\img\cleanBank.png' className='w-1/2 p-4' />
                                </div>
                            </div>

                            {/* metade direita com cadastro */}
                            <div className='h-screen lg:w-2/3 flex flex-col justify-center items-center 
                            sm: w-full'>

                                {/* 1/6 para o título da página */}
                                <div className='w-5/6 h-1/6 flex flex-col items-center justify-center'>
                                    <h1 className='text-[#5A5252] font-bold italic text-5xl'>
                                        CADASTRO
                                    </h1>
                                </div>

                                {/* 3/6 para conteúdo */}
                                <div className='w-5/6 h-3/6 flex flex-col items-center justify-center'>
                                    <InputSite placeholder='CEP' set={setCEP} value={numCEP} />
                                    <InputSite placeholder='Logradouro' set={setLogradouro} value={logradouro} />
                                    <InputSite placeholder='Bairro' set={setBairro} value={bairro} />
                                    <InputSite placeholder='Cidade' set={setCidade} value={cidade} />
                                    <InputSite placeholder='UF' set={setUF} value={uf} />
                                </div>

                                {/* 2/6 para botão */}
                                <div className='w-full h-2/6 flex flex-col items-center justify-center'>
                                    {/* botão de fato 2/3 */}
                                    <div className='h-2/3 w-full flex flex-col justify-center items-center'>
                                        <Botao texto='CONTINUAR' onClick={() => validacaoEndereco()} />
                                        <button className='pt-10' onClick={() => proximoPasso(2)}>
                                            Voltar
                                        </button>
                                    </div>

                                    {/* apenas para logo 1/3 */}
                                    <div className='h-1/3 w-full flex items-end justify-end'>
                                        <img src='src\img\logo.png' className='p-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : null
            }


            {/* cadastro senha e foto */}
            {
                passo == 4 ?
                    <>
                        <div className='h-screen w-screen flex flex-row'>
                            {/* metade esquerda com foto 1/3 */}
                            <div className="h-screen w-1/3 bg-[url('./img/start.png')] bg-no-repeat bg-cover lg:flex flex-col justify-center 
                            sm: hidden bg-center">
                                <div className="h-screen w-3/6 flex flex-col justify-end">
                                    <img src='src\img\cleanBank.png' className='w-1/2 p-4' />
                                </div>
                            </div>

                            {/* metade direita com cadastro */}
                            <div className='h-screen lg:w-2/3 flex flex-col justify-center items-center 
                            sm: w-full'>

                                {/* 1/6 para o título da página */}
                                <div className='w-5/6 h-1/6 flex flex-col items-center justify-center'>
                                    <h1 className='text-[#5A5252] font-bold italic text-5xl'>
                                        CADASTRO
                                    </h1>
                                </div>

                                {/* 3/6 para conteúdo */}
                                <div className='w-5/6 h-3/6 flex flex-col items-center justify-center'>
                                    <input type='password' className='lg:w-2/5 min-[600px]:w-2/3 border-b-2 p-1 border-[#8D8E90] placeholder:text-slate-400 placeholder-[#C5C6C8] 
                                    text-sm font-semibold' placeholder='Senha' onChange={e => { setSenha(e.target.value) }} value={senha} />
                                    <input type='password' className='lg:w-2/5 min-[600px]:w-2/3 border-b-2 p-1 border-[#8D8E90] placeholder:text-slate-400 placeholder-[#C5C6C8] 
                                    text-sm font-semibold' placeholder='Senha' onChange={e => { setSenhaConf(e.target.value) }} value={senhaConf} />                                    
                                    <div className='w-40 h-40 bg-stone-100 flex items-center justify-center'>
                                        <img src={imagem} alt="" className='w-full' />
                                    </div>
                                    <input type="file" onChange={e => converter_imagem(e)} className='pt-5' />
                                </div>

                                {/* 2/6 para botão */}
                                <div className='w-full h-2/6 flex flex-col items-center justify-center'>
                                    {/* botão de fato 2/3 */}
                                    <div className='h-2/3 w-full flex flex-col justify-center items-center'>
                                        <Botao texto='CONTINUAR' onClick={() => validacaoSenha()} />
                                        <button className='pt-10' onClick={() => proximoPasso(3)}>
                                            Voltar
                                        </button>
                                    </div>

                                    {/* apenas para logo 1/3 */}
                                    <div className='h-1/3 w-full flex items-end justify-end'>
                                        <img src='src\img\logo.png' className='p-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : null
            }
        </>
    )
}

export default Cadastro