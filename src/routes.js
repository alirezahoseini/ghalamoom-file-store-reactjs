
// Import Components 
import Home from './components/Home/Home'
import Panel from './components/Panel/Panel';
import Dashbord from './components/Panel/Dashbord/Dashbord';
import PanelProducts from './components/Panel/PanelProducts/PanelProducts';
import PanelCourses from './components/Panel/PanelCourses/PanelCourses';


// Website Routes Config
const routes = [
    {path: '/' , element: <Home />},
    {path: '/panel' , element: <Panel />, children : [
        {path: 'dashbord' , element : <Dashbord />},
        {path: 'products' , element : <PanelProducts />},
        {path: 'courses' , element : <PanelCourses />},
    ]},
];


export default routes;