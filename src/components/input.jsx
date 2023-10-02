import React, { Component } from 'react'

const InputSite = (props) => {

    return(
        <>
        <div className='flex items-center justify-center w-full pb-8'>
            <input className='lg:w-2/5 min-[600px]:w-2/3 border-b-2 p-1 border-[#8D8E90] placeholder:text-slate-400 placeholder-[#C5C6C8] 
                text-sm font-semibold' placeholder={props.placeholder} onChange={e => {props.set(e.target.value)}} value={props.value}/>
        </div>
        
        </>
    )
}

export default InputSite