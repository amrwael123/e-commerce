import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

export default function loading() {
    return <>


    <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <MutatingDots
    visible={true}
    height="100"
    width="100"
    color="#4fa94d"
    secondaryColor="#4fa94d"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
    </div>

    </>
}
