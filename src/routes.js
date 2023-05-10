import { Navigate } from 'react-router-dom';
// اHome
import Home from './pages/Home/Home'
// panel and subpages
import Panel from './pages/Panel/Panel';
import LoginPage from './pages/Panel/subpages/LoginPage/LoginPage';
import PrivatePage from './pages/Panel/PrivatePage'; 
import DashboardTest from './pages/Panel/subpages/Dashboard/Dashboard';
import Products from './pages/Panel/subpages/Products/Products';
import NewItem from './pages/Panel/subpages/NewItem/NewItem'
import EditItem from './pages/Panel/subpages/EditItem/EditItem';
import Courses from './pages/Panel/subpages/Courses/Courses';
import Artworks from './pages/Panel/subpages/Artworks/Artworks';
// Single Pages
import SingleProduct from './pages/SinglePages/SingleProduct/SingleProduct';
import SingleCourse from './pages/SinglePages/SingleCourse/SingleCourse';



// Website Routes Config
const routes = [
    { path: '/', element: <Home /> },
    {
        path: '/panel', element: <PrivatePage ><Panel /></PrivatePage>, children: [
            { path: 'dashboard', element: <PrivatePage ><DashboardTest /></PrivatePage> },
            { path: 'products', element: <PrivatePage ><Products /></PrivatePage> },
            { path: 'newproduct', element: <PrivatePage ><NewItem /></PrivatePage> },
            { path: 'editproduct/:productId', element: <PrivatePage ><EditItem /></PrivatePage> },
            { path: 'courses', element: <PrivatePage ><Courses /></PrivatePage> },
            { path: 'newcourse', element: <PrivatePage ><NewItem /></PrivatePage> },
            { path: 'editcourse/:courseId', element: <PrivatePage ><EditItem /></PrivatePage> },
            { path: 'artworks', element: <PrivatePage ><Artworks /></PrivatePage> },
            { path: 'newartwork', element: <PrivatePage ><NewItem /></PrivatePage> },
            { path: '', element:<Navigate to="dashboard" replace={ true} />},
            { path: '*', element:<Navigate to="dashboard" replace={ true} />},
]
    },
{ path: '/login', element: <LoginPage /> },
{ path: '/products/:productId', element: <SingleProduct /> },
{ path: '/courses/:courseId', element: <SingleCourse /> },

];


export default routes;