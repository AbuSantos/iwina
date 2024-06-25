import React from 'react'
interface LoginRegisterProps {
    mode?: "login" | "register"
}
const LoginRegister = ({ mode }: LoginRegisterProps) => {
    return (
        <div className='bg-red-900'>Login</div>
    )
}

export default LoginRegister