
// Import Components 
import Home from './components/Home/Home'
import Panel from './components/Panel/Panel';
import Dashbord from './components/Panel/Dashbord/Dashbord';
import PanelProducts from './components/Panel/PanelProducts/PanelProducts';
import PanelCourses from './components/Panel/PanelCourses/PanelCourses';
import LoginPage from './components/Panel/LoginPage/LoginPage';
import PrivatePage from './components/Panel/PrivatePage';


// Website Routes Config
const routes = [
    { path: '/', element: <Home /> },
    {
        path: '/panel', element: <PrivatePage ><Panel /></PrivatePage>, children: [
            { path: 'dashbord', element:<PrivatePage ><Dashbord /></PrivatePage>},
            { path: 'products', element:<PrivatePage ><PanelProducts /></PrivatePage>},
            { path: 'courses', element:<PrivatePage ><PanelCourses /></PrivatePage>},
        ]
    },
    { path: '/login', element: <LoginPage /> },

];


export default routes;