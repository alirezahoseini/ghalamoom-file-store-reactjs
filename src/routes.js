import { Navigate } from 'react-router-dom';
// Home
import Home from './pages/Home/Home'
// panel and subpages
import Panel from './pages/Panel/Panel';
import LoginPage from './pages/Panel/subpages/LoginPage/LoginPage';
import PrivatePage from './pages/Panel/PrivatePage';
import DashboardTest from './pages/Panel/subpages/Dashboard/Dashboard';
import PanelProducts from './pages/Panel/subpages/Products/PanelProducts';
import NewItem from './pages/Panel/subpages/NewItem/NewItem'
import EditItem from './pages/Panel/subpages/EditItem/EditItem';
import PanelCourses from './pages/Panel/subpages/Courses/PanelCourses';
import PanelArtworks from './pages/Panel/subpages/Artworks/PanelArtworks';
import EditProfile from './pages/Panel/subpages/EditProfile/EditProfile';
// User Management
import ConfirmEmailPage from './pages/Panel/subpages/ConfirmEmailPage/ConfirmEmailPage';
import PleaseConfirmEmail from './pages/Panel/subpages/LoginPage/components/PleaseConfirmEmail/PleaseConfirmEmail';
import PleaseCheckEmailForgotPass from './pages/Panel/subpages/LoginPage/PleaseCheckEmailForgotPass/PleaseCheckEmailForgotPass';
import ResetPasswordForm from './pages/Panel/subpages/LoginPage/components/ResetPasswordForm/ResetPasswordForm';
// Single Pages
import SingleProduct from './pages/SinglePages/SingleProduct/SingleProduct';
import SingleCourse from './pages/SinglePages/SingleCourse/SingleCourse';
import SingleArtwork from './pages/SinglePages/SingleArtwork/SingleArtwork';
// Categories
import Courses from './pages/Categories/Courses/Courses';
import Products from './pages/Categories/Products/Products';
import Artworks from './pages/Categories/Artworks/Artworks';
// Landing page
import LandingPage from './pages/Landing/LandingPage';



// Website Routes Config
const routes = [
    { path: '/', element: <Home /> },
    {
        path: '/panel', element: <PrivatePage ><Panel /></PrivatePage>, children: [
            { path: 'dashboard', element: <PrivatePage ><DashboardTest /></PrivatePage> },
            { path: 'products', element: <PrivatePage ><PanelProducts /></PrivatePage> },
            { path: 'newproduct', element: <PrivatePage ><NewItem /></PrivatePage> },
            { path: 'editproduct/:productId', element: <PrivatePage ><EditItem /></PrivatePage> },
            { path: 'courses', element: <PrivatePage ><PanelCourses /></PrivatePage> },
            { path: 'newcourse', element: <PrivatePage ><NewItem /></PrivatePage> },
            { path: 'editcourse/:courseId', element: <PrivatePage ><EditItem /></PrivatePage> },
            { path: 'artworks', element: <PrivatePage ><PanelArtworks /></PrivatePage> },
            { path: 'newartwork', element: <PrivatePage ><NewItem /></PrivatePage> },
            { path: 'editartwork/:artworkId', element: <PrivatePage ><EditItem /></PrivatePage> },
            { path: 'editprofile', element: <PrivatePage ><EditProfile /></PrivatePage> },
            { path: '', element: <Navigate to="dashboard" replace={true} /> },
            { path: '*', element: <Navigate to="dashboard" replace={true} /> },
        ]
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/please-confirm-email', element: <PleaseConfirmEmail /> },
    { path: '/please-check-your-email-forgot-password', element: <PleaseCheckEmailForgotPass /> },
    { path: '/confirm-email', element: <ConfirmEmailPage /> },
    { path: '/reset-password', element: <ResetPasswordForm /> },
    { path: '/products', element: <Products /> },
    { path: '/products/:productId', element: <SingleProduct /> },
    { path: '/courses', element: <Courses /> },
    { path: '/courses/:courseId', element: <SingleCourse /> },
    { path: '/artworks', element: <Artworks /> },
    { path: '/artworks/:artworkId', element: <SingleArtwork /> },
    { path: '/landing', element: <LandingPage /> },

];


export default routes;