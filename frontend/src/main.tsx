import { StrictMode } from 'react'
import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
const AnimatedCursor=lazy(()=> import('./Components/AnimatedCursor.tsx'));
const LandingPage=lazy(()=> import ('./Components/LandingPage.tsx'));
const ContactUs= lazy(()=> import ('./Components/ContactUs.tsx'));
const MainPage= lazy(()=>import ('./Components/MainPage.tsx'));
const OurTeam= lazy(()=>import ('./Components/OurTeam.tsx'));
const Terms= lazy(()=>import ('./Components/Terms.tsx'));
const Workshop= lazy(()=>import ('./Components/Workshop.tsx'));
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoaderError from './assets/Reusable/LoaderError.tsx';
import DashboardHome from './Components/Dashboard/dashboardHome.tsx';
import Dashboard from './Components/Dashboard.tsx';
const Register=lazy(()=> import('./Components/Register.tsx'));
const Login=lazy(()=> import('./Components/Login.tsx'));
const Services= lazy(()=>import ('./Components/Services.tsx'));
const UserList=lazy(()=> import('./Components/Dashboard/userList.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AnimatedCursor />
    <Suspense fallback={<LoaderError loading={true} />}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path='dashboardhome' element={<DashboardHome />} />
          <Route path='userList'  element={<UserList/>}/>
        </Route>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="team" element={<OurTeam />} />
          <Route path="terms-of-service" element={<Terms term={true} />} />
          <Route path="privacy-policy" element={<Terms term={false} />} />
          <Route path="workshop" element={<Workshop />} />
          <Route path="services" element={<Services />} />
          
        </Route>
        <Route path="*" element={<LoaderError hasError={true} />} />
      </Routes>
          </Suspense>
    </BrowserRouter>
  </StrictMode>
)
