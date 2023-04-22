import { Navigate } from 'react-router-dom';
// components
import Home from './pages/Home/Home'
// panel and subpages
import Panel from './pages/Panel/Panel';
import LoginPage from './pages/Panel/subpages/LoginPage/LoginPage';
import PrivatePage from './pages/Panel/PrivatePage';

//// Test 
import DashboardTest from './pages/Panel/new/subpages/Dashboard/Dashboard';
import Products from './pages/Panel/new/subpages/Products/Products';
import NewItem from './pages/Panel/new/subpages/NewItem/NewItem'
import EditItem from './pages/Panel/new/subpages/EditItem/EditItem';


// Website Routes Config
const routes = [
    { path: '/', element: <Home /> },
    {
        path: '/panel', element: <PrivatePage ><Panel /></PrivatePage>, children: [
            { path: 'dashboard', element: <PrivatePage ><DashboardTest /></PrivatePage> },
            { path: 'products', element: <PrivatePage ><Products /></PrivatePage> },
            { path: 'newproduct', element: <PrivatePage ><NewItem /></PrivatePage> },
            { path: 'editproduct/:productId', element: <PrivatePage ><EditItem /></PrivatePage> },
            { path: '', element:<Navigate to="dashboard" replace={ true} />},
            { path: '*', element:<Navigate to="dashboard" replace={ true} />},
]
    },
{ path: '/login', element: <LoginPage /> },

];


export default routes;