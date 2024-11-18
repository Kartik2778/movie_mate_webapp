import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center gap-5 bg-gray-100'>
        <div className='w-[50%] h-[50%] bg-white p-5 rounded-md shadow-md flex flex-col items-center justify-center'>
            <h1 className='text-4xl'>Payment Successfull</h1>
            <img src="https://raw.githubusercontent.com/Kartik2778/project_images/main/payment_success.png" className='w-[20%] object-cover' alt="..." />
            <Link to="/">
                <HomeIcon className='text-blue-500' fontSize='large'/> Home
            </Link>
        </div>
    </div>
  )
}

export default PaymentSuccess
