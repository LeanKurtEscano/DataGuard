import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MyProvider, useMyContext } from './Components/MyContext';
import Generate from './Sections/Generate';
import Dashboard from './Sections/Dashboard';
import Login from './Sections/Login';
import Signup from './Sections/Signup';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Sections/Home';
import { auth } from './Api/Api';
import Profile from './Sections/Profile';
import VideoSection from './Sections/VideoSection';
import Features from './Components/Features';
import Activity from './Sections/Activity';
import DataSources from './Sections/DataSources';
import ProtectedRoutes from './Components/ProtectedRoutes';
import ResponseLogs from './Sections/ResponseLogs';
import Help from './Sections/Help';

function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { isAuthenticated, setIsAuthenticated } = useMyContext();

  useEffect(() => { 
    if (isAuthenticated) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [location, isAuthenticated]);

  useEffect(() => {
    const storedPath = localStorage.getItem('currentPath');
    const checkUserAuth = async () => {
      const isAuthorized = await auth();
      setIsAuthenticated(isAuthorized);

      if (isAuthorized && storedPath) {
        navigate(storedPath);
      } 

    };
    checkUserAuth();
  }, [setIsAuthenticated, navigate]);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/activity');
    }
  }, [location, navigate]);




  return (
    <main className='h-auto flex flex-col'>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <section className='w-full h-screen flex justify-center items-center '>
            <Login />
          </section>
        } />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
           <Route path="" element={<Navigate to="/dashboard/activity" replace />} />
          <Route path="activity" element={<Activity isAuthenticated={isAuthenticated} />} />
          <Route path="response" element={<ResponseLogs />} />
          <Route path="data" element={<DataSources />} />
          <Route path="profile" element={<Profile />} />
         
          <Route path = "help" element={
          <section>
            <Help/>
            <Footer/>
          </section>
            } />
        </Route>

        <Route path='/signup' element={
          <section className='w-full h-screen flex justify-center items-center'>
            <Signup />
          </section>
        } />
        <Route path='/generate' element={
          <section className='h-auto '>
            <Generate />
          </section>
        } />
        <Route path='/home' element={
          <section className='h-auto'>
            <Home />
            <VideoSection />
            <Features />
            <Footer />
          </section>
        } />
         <Route path='/help' element={
          <section className='h-auto'>
            <Help />
            <Footer />
          </section>
        } />

      </Routes>
    </main>
  );
}

export default App;