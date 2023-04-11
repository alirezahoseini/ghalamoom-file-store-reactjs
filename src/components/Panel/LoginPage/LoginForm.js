import React, { useEffect, useState } from 'react'

// Commponents
import LoginInput from './LoginInput'
import LoginPasswordInput from './LoginPasswordInput'
import LoginButton from './LoginButton'
import LoginWithSocials from './LoginWithSocials'

export default function LoginForm() {
    const [showLoginForm, setShowLoginForm] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    /// Validation
    const [isValidForm, setIsValidForm] = useState(false)
    const [runValidation, setRunValidation] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [isValidPassword, setIsValidPassword] = useState(null);


    useEffect(() => {
        if (runValidation) {
            validationHaandler()
        }
    }, [emailValue, passwordValue])

    const validationHaandler = () => {
        // checking email
        if (emailValue.length < 4) {
            setEmailValue(false)
        } else {
            setIsValidEmail(true)
        }
        // chcking password
        if (passwordValue.length < 5) {
            setIsValidPassword(false)
        } else {
            setIsValidPassword(true)
        }
        // Set validating status
        if (isValidEmail && isValidPassword) {
            setIsValidForm(true)
        } else {
            setIsValidForm(false)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        // Run validate inputs 
        if (!runValidation) {
            setRunValidation(true)
            validationHaandler()
        }
        // Checking is valid form
        if (isValidForm) {
            console.log('submited')
        } else {
            console.log('not valid form')
        }
    }

    return (
        <div id="login-form" className='flex flex-col text-center'>
            {/* Form Header */}
            <h2 className='text-secondary-2 text-xl mt-5' >خوش برگشتی</h2>
            <h3 className='text-sm text-text-2 mt-2'>دلمون برات تنگ شده بود!</h3>
            {/* End of Form Header */}
            <form onSubmit={(event) => submitHandler(event)} className='my-8 px-3 flex flex-col gap-4 text-xs lg:w-9/12 lg:mx-auto '>
                {/* Username input  */}
                <LoginInput value={emailValue} type='email' setValue={setEmailValue} placeholder=' ایمیل خود را وارد کنید' isValid={isValidEmail} />
                {/* Password input  */}
                <div>
                    <LoginPasswordInput value={passwordValue} setValue={setPasswordValue} showPass={showPassword} setShowPass={setShowPassword} placeholder='رمزعبور' isValid={isValidPassword} />
                    <p className='text-right my-3 mr-2' >بازیابی رمزعبور</p>
                </div>
                {/* Submit button  */}
                <LoginButton value='ورود' />
                {/* Login with socials  */}
                <LoginWithSocials />
                {/* End of Login with socials  */}
            </form>
        </div>
    )
}
