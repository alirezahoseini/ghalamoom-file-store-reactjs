import { Navigate } from 'react-router-dom';
// components
import Home from './pages/Home/Home'
// panel and subpages
import Panel from './pages/Panel/Panel';
import Dashboard from './pages/Panel/subpages/Dashboard/Dashboard';
import PanelProducts from './pages/Panel/subpages/Products/PanelProducts';
import PanelCourses from './pages/Panel/subpages/Courses/PanelCourses';
import LoginPage from './pages/Panel/subpages/LoginPage/LoginPage';
import PrivatePage from './pages/Panel/PrivatePage';


// Website Routes Config
const routes = [
    { path: '/', element: <Home /> },
    {
        path: '/panel', element: <PrivatePage ><Panel /></PrivatePage>, children: [
            { path: 'dashboard', element: <PrivatePage ><Dashboard /></PrivatePage> },
            { path: 'products', element: <PrivatePage ><PanelProducts /></PrivatePage> },
            { path: 'courses', element: <PrivatePage ><PanelCourses /></PrivatePage> },
            { path: '', element:<Navigate to="dashboard" replace={ true} />},
            { path: '*', element:<Navigate to="dashboard" replace={ true} />},
]
    },
{ path: '/login', element: <LoginPage /> },

];


export default routes;