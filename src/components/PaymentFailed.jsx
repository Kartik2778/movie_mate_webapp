import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const PaymentFailed = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-100'>
        <div className='w-[50%] h-[50%] bg-white p-5 rounded-md shadow-md flex flex-col gap-5 items-center justify-center'>
            <h1 className='text-4xl'>Payment Failed</h1>
            <img src="https://raw.githubusercontent.com/Kartik2778/project_images/main/payment_failed.jpg" className='w-[20%] object-cover' alt="..." />
            <Link to="/">
                <HomeIcon className='text-blue-500' fontSize='large'/> Home
            </Link>
        </div>
    </div>
  )
}

export default PaymentFailed
