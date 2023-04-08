
// Import Components 
import Home from './components/Home/Home'
import Panel from './components/Panel/Panel';
import PanelProducts from './components/Panel/PanelProducts/PanelProducts';
import PanelCourses from './components/Panel/PanelCourses/PanelCourses';


// Website Routes Config
const routes = [
    {path: '/' , element: <Home />},
    {path: '/panel' , element: <Panel />, children : [
        {path: 'products' , element : <PanelProducts />},
        {path: 'courses' , element : <PanelCourses />},
    ]},
];


export default routes;