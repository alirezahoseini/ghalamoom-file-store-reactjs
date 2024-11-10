// This file is for automatically changing project links

// Global links
const dynamicLinks = {
    home: '/',
    courses: '/courses',
    products: '/products',
    artworks: '/artworks',
    about: '/about',
    blog: '/blog',
    mag: '/blog/mag',
    videos: '/blog/video',
    cast: '/blog/cast',
    panel: '/panel',
    upload: '/api/upload',
}

// Header Links 
const navigaitionLinks = [
    { id: 'navigaitionLinks-1', name: 'خانه', url: dynamicLinks.home, subMenu: false },
    { id: 'navigaitionLinks-2', name: 'دوره های آموزشی', url: dynamicLinks.courses, subMenu: false },
    { id: 'navigaitionLinks-3', name: 'فروشگاه', url: dynamicLinks.products, subMenu: false },
    { id: 'navigaitionLinks-4', name: 'نمونه کارها', url: dynamicLinks.artworks, subMenu: false },
    { id: 'navigaitionLinks-5', name: 'درباره من', url: dynamicLinks.about, subMenu: false },
    {
        id: 'navigaitionLinks-6', name: 'وبلاگ', url: '/blog', subMenu: true, subLinks: [
            { id: 'navigaitionLinks-7', name: 'مقالات', url: dynamicLinks.mag },
            { id: 'navigaitionLinks-8', name: 'ویدیو', url: dynamicLinks.videos },
            { id: 'navigaitionLinks-9', name: 'پادکست', url: dynamicLinks.cast },
        ]
    }
];

const apiLinks = {

    /* Render.com */
    // products: 'https://ghalamoom-backend-jsonserver.onrender.com/products',
    // login: 'https://ghalamoom-backend-jsonserver.onrender.com/login',
    // signup: 'https://ghalamoom-backend-jsonserver.onrender.com/register',
    // users: 'https://ghalamoom-backend-jsonserver.onrender.com/users',
    // courses: 'https://ghalamoom-backend-jsonserver.onrender.com/courses',
    // artworks: 'https://ghalamoom-backend-jsonserver.onrender.com/artworks',

    /* Localhost */
    // products: 'http://localhost:5000/products',
    // login: 'http://localhost:5000/login',
    // signup: 'http://localhost:5000/register',
    // users: 'http://localhost:5000/users',
    // courses: 'http://localhost:5000/courses',
    // artworks: 'http://localhost:5000/artworks'

    /* New backend from m0x1h0x64i */
    products: 'https://ghalamoom.m0x61h0x64i.ir/products',
    login: 'https://ghalamoom.m0x61h0x64i.ir/login',
    signup: 'https://ghalamoom.m0x61h0x64i.ir/signup',
    users: 'https://ghalamoom.m0x61h0x64i.ir/users',
    courses: 'https://ghalamoom.m0x61h0x64i.ir/courses',
    artworks: 'http://localhost:3000/api/artworks',
    categories: 'https://ghalamoom.m0x61h0x64i.ir/categories',
    likes: 'https://ghalamoom.m0x61h0x64i.ir/likes',
    comments: 'https://ghalamoom.m0x61h0x64i.ir/comments',

    /* New backend from Next js */
    // products: 'http://localhost:3000/api/products',
    // login: 'http://localhost:3000/api/login',
    // signup: 'http://localhost:3000/api/signup',
    // users: 'http://localhost:3000/api/users',
    // courses: 'http://localhost:3000/api/courses',
    // artworks: 'http://localhost:3000/api/artworks',
    // categories: 'http://localhost:3000/api/categories',
    // likes: 'http://localhost:3000/api/likes',
    // comments: 'http://localhost:3000/api/comments',
    // upload: 'http://localhost:3000/api/upload'
    upload: 'https://ghalamoom-next-api.onrender.com/api/upload'
}


export { dynamicLinks, navigaitionLinks, apiLinks };
