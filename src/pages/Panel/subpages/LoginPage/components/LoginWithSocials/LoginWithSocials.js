import React from 'react'

// assets
import googleLogo from '../../../../../../assets/images/logos/google-logo.svg'
import facebookLogo from '../../../../../../assets/images/logos/facebook-logo.svg'
import appleLogo from '../../../../../../assets/images/logos/apple-logo.svg'

export default function LoginWithSocials() {
    return (
        <div id="login-with-socials">
            {/* Separator */}
            <div id='separator' className='flex items-center gap-3 my-10 mx-auto w-full justify-center'>
                <div className='w-1/3 h-1 rounded-2xl bg-gradient-to-r from-gray-3 to-transparent' ></div>
                <div className='text-xs font-bold text-secondary-1'>ورود از طریق</div>
                <div className='w-1/3 h-1 rounded-2xl bg-gradient-to-l from-gray-3 to-transparent' ></div>
            </div>
            {/* End of Separator */}
            {/* Icons  */}
            <div id="icons" className='flex justify-center items-center gap-3'>
                <div className='w-fit bg-transparent border-2 border-white py-1 px-4 rounded-lg hover:bg-white hover:shadow-lg cursor-pointer transition-all duration-500'>
                    <img src={facebookLogo} alt="facebook logo" width={32} />
                </div>
                <div className='w-fit bg-transparent border-2 border-white py-1 px-4 rounded-lg hover:bg-white hover:shadow-lg cursor-pointer transition-all duration-500'>
                    <img src={appleLogo} alt="apple logo" width={32} />
                </div>
                <div className='w-fit bg-transparent border-2 border-white py-1 px-4 rounded-lg hover:bg-white hover:shadow-lg cursor-pointer transition-all duration-500'>
                    <img src={googleLogo} alt="google logo" width={32} />
                </div>
            </div>
            {/* End of Icons  */}
        </div>
    )
}
