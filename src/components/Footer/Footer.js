import React from 'react'
import { TbBrandTelegram, TbPhone, TbMail } from 'react-icons/tb'

// Files 
import { dynamicLinks } from '../../dynamicLinks.js'

// Components 
import Logo from '../Global/Logo'
import Button from './../Global/Button'
import FooterHeading from './FooterHeading'
import FooterLink from './FooterLink'
import FooterSocialLinks from './FooterSocialLinks.js'

export default function Footer() {

    const siteLinks = [
        { id: "footerSiteLink-1", name: 'دوره های آموزشی', url: dynamicLinks.course },
        { id: "footerSiteLink-2", name: 'فروشگاه فایل', url: dynamicLinks.shop },
        { id: "footerSiteLink-3", name: 'نمونه کارهای قلموم', url: dynamicLinks.artworks },
        { id: "footerSiteLink-4", name: 'آموزش های رایگان', url: dynamicLinks.videos },
    ]

    const socialLinks = [
        {
            id: 'footerSocialLink-1',
            name: 'ایمیل',
            title: 'info@example.com',
            url: 'mailto:mehdimj0161@gmail.com',
            icon: <TbMail />
        },
        {
            id: 'footerSocialLink-2',
            name: 'آیدی تلگرام',
            title: '@exampleid',
            url: 'http://t.me/exampleid',
            icon: <TbBrandTelegram />
        },
        {
            id: 'footerSocialLink-3',
            name: 'شماره تماس',
            title: '0933033333',
            url: 'tel:0933033333',
            icon: <TbPhone />
        },
    ]


    return (
        <>
            <footer className='bg-primary-1 lg:px-5 lg:pt-10 lg:pb-5 lg:rounded-t-3xl'>
                <div id="footer-wrapper" className='flex flex-col lg:flex-row lg:items-start justify-evenly'>
                    {/* Section 1 - about */}
                    <section id='about' className='p-6 lg:w-5/12'>
                        <Logo width={120} />
                        <h2 className='font-yekan text-gray-3 mt-7 mb-3 text-sm break-words leading-7'>
                            قلموم یکی از فعالیت ترین و پرتلاش ترین تولیدکنندگان محتوای گرافیک در ایران است و همیشه تلاش کرده تا با انتشار بروزترین و جدیدترین مقالات و دوره های آموزشی گرافیک دیزاین، قدمی در ارتقای سطح طراحان جوان ایرانی برداشته باشد.
                        </h2>
                        <form id='newslater' onSubmit={event => event.preventDefault()} className='w-full'>
                            <label htmlFor="emali" className='block font-yekan-bakh text-gray-1 font-bold text-lg my-2'>عضویت در خبر نامه</label>
                            <div className='w-full flex justify-around items-center'>
                                <input type="email" name='emali' placeholder='آدرس ایمیل' className='bg-gray-1 bg-opacity-20 p-2 rounded-lg outline-none text-sm placeholder:text-sm text-gray-1 w-8/12 ml-2' />
                                <Button type={'submit'} value='ارسال' hover='true' size='w-4/12' />
                            </div>
                        </form>
                    </section>
                    {/* End of Section 1 - about */}
                    {/* Section 2 - site links */}
                    <section id='site-links' className='p-6 w-fit'>
                        <FooterHeading value='بخش های سایت' />
                        <div className='flex flex-col gap-2 my-4 p-2'>
                            {
                                siteLinks.map(link => (
                                    <FooterLink key={link.id} {...link} />
                                ))
                            }
                        </div>
                    </section>
                    {/* End of Section 2 - site links */}
                    {/* Section 3 - Contact links */}
                    <section id='contact-links' className='p-6 lg:w-4/12'>
                        <FooterHeading value='ارتباط با قلموم' />
                        <div>
                            {
                                socialLinks.map(link => (
                                    <FooterSocialLinks key={link.id} {...link} />
                                ))
                            }
                        </div>
                        <div id='trust-logos' className='flex items-center justify-around mt-5'>
                            <img src="./images/public-img/zarinpal.svg" alt="zarinpal logo" />
                            <img src="./images/public-img/enamad.png" alt="enamad logo" className='w-28' />
                        </div>
                    </section>
                    {/* End of Section 3 - Contact links */}
                </div>
            </footer>
            {/* Section 4 - copyright  */}
            <section id='copyright' className='bg-gold-1 p-5 text-center text-primary-1' >
                <p>
                    <span>Powerd by <strong>React js</strong> | Made with ❤️  </span>
                    <a href="https://a-hosseini.ir" target="_blank" rel="noopener noreferrer" className='font-bold text-black'>A-Hosseini</a>
                </p>
            </section>
            {/*  End of Section 4 - copyright  */}
        </>
    )
}
