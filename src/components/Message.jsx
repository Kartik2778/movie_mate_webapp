import React from 'react'

const Message = ({severity, children}) => {

  const messBgColor = {
     success: " bg-green-200",
     error: "bg-red-200"
  }

  console.log(children);

  return (
    <div className={`w-full text-center text-gray-600 h-fit p-5 rounded-md ${messBgColor[severity]}`}>
      {children}
    </div>
  )
}

export default Message
