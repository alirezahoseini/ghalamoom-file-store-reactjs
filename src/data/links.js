// This file is for automatically changing project links

// Global links
const dynamicLinks = {
    home: '/',
    course: '/course',
    shop: '/shop',
    artworks: '/artworks',
    about: '/about',
    blog: '/blog',
    mag: '/blog/mag',
    videos: '/blog/video',
    cast: '/blog/cast',
    panel: '/panel',
}

// Header Links 
const navigaitionLinks = [
    { id: 'navigaitionLinks-1', name: 'خانه', url: dynamicLinks.home, subMenu: false },
    { id: 'navigaitionLinks-2', name: 'دوره های آموزشی', url: dynamicLinks.course, subMenu: false },
    { id: 'navigaitionLinks-3', name: 'فروشگاه', url: dynamicLinks.shop, subMenu: false },
    { id: 'navigaitionLinks-4', name: 'نمونه کارها', url: dynamicLinks.artworks, subMenu: false },
    { id: 'navigaitionLinks-5', name: 'درباره من', url: dynamicLinks.about, subMenu: false },
    {
        id: 'navigaitionLinks-6', name: 'وبلاگ', url: '/blog', subMenu: true, subLinks: [
            { id: 'navigaitionLinks-7', name: 'مقالات', url: dynamicLinks.mag },
            { id: 'navigaitionLinks-8', name: 'ویدیو', url: dynamicLinks.videos },
            { id: 'navigaitionLinks-9', name: 'پادکست', url: dynamicLinks.cast },
        ]
    }
]

export { dynamicLinks, navigaitionLinks };