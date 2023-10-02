import React, { Component } from 'react'

const Botao = (props) => {

    return (
        <>
            <button className='flex items-center justify-center rounded-2xl p-3 
                drop-shadow-lg w-40 md:w-96 shadow-lg bg-white' onClick={props.onClick}>
                <p className='text-[#293751] text-lg font-bold'>{props.texto}</p>
            </button>
        </>
    )
}

export default Botao