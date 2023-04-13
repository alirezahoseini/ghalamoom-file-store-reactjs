import { Navigate } from 'react-router-dom';
// Import Components 
import Home from './components/Home/Home'
import Panel from './components/Panel/Panel';
import Dashboard from './components/Panel/Dashboard/Dashboard';
import PanelProducts from './components/Panel/PanelProducts/PanelProducts';
import PanelCourses from './components/Panel/PanelCourses/PanelCourses';
import LoginPage from './components/Panel/LoginPage/LoginPage';
import PrivatePage from './components/Panel/PrivatePage';


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