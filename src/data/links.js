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

    /* Online backend */
    products: 'https://ghalamoom-next-api.vercel.app/api/products',
    login: 'https://ghalamoom-next-api.vercel.app/api/login',
    signup: 'https://ghalamoom-next-api.vercel.app/api/signup',
    users: 'https://ghalamoom-next-api.vercel.app/api/users',
    courses: 'https://ghalamoom-next-api.vercel.app/api/courses',
    artworks: 'https://ghalamoom-next-api.vercel.app/api/artworks',
    categories: 'https://ghalamoom-next-api.vercel.app/api/categories',
    likes: 'https://ghalamoom-next-api.vercel.app/api/likes',
    comments: 'https://ghalamoom-next-api.vercel.app/api/comments',
}


export { dynamicLinks, navigaitionLinks, apiLinks };
