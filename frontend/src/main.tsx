import { StrictMode } from 'react'
import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
const AnimatedCursor=lazy(()=> import('./assets/Reusable/AnimatedCursor.tsx'));
const LandingPage=lazy(()=> import ('./Components/LandingPage.tsx'));
const ContactUs= lazy(()=> import ('./Components/ContactUs.tsx'));
const MainPage= lazy(()=>import ('./Components/MainPage.tsx'));
const OurTeam= lazy(()=>import ('./Components/OurTeam.tsx'));
const Terms= lazy(()=>import ('./Components/Terms.tsx'));
const Workshop= lazy(()=>import ('./Components/Workshop.tsx'));
import 'bootstrap-icons/font/bootstrap-icons.css';
const ResetPass=lazy(()=> import('./Components/Login/ResetPass.tsx'));
const LoaderError=lazy(()=> import ('./assets/Reusable/LoaderError.tsx'));
const DashboardHome =lazy(()=>import  ( './Components/Dashboard/dashboardHome.tsx'));
const Dashboard =lazy(()=> import ('./Components/Dashboard/Dashboard.tsx'));
const AddUser=lazy(()=>import  ('./Components/Dashboard/AddUser.tsx'));
const Invoice= lazy(()=>import ('./Components/Dashboard/Invoice.tsx'));
const CreateBlogs =lazy(()=>import ('./Components/Dashboard/CreateBlogs.tsx'))
const Register=lazy(()=> import('./Components/Login/Register.tsx'));
const Login=lazy(()=> import('./Components/Login/Login.tsx'));
const Services= lazy(()=>import ('./Components/Services.tsx'));
const UserList=lazy(()=> import('./Components/Dashboard/userList.tsx'));
const ViewBlog=lazy(()=> import('./Components/Blogs.tsx'));
const DynamicBlog=lazy(()=> import('./assets/Reusable/DynamicBlog.tsx'));

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
          <Route path='createBlog' element={<CreateBlogs />} />
          <Route path="AddUser" element={<AddUser />} />
          <Route path='AddInvoice' element={<Invoice />} />
        </Route>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="team" element={<OurTeam />} />
          <Route path="terms-of-service" element={<Terms term={true} />} />
          <Route path="privacy-policy" element={<Terms term={false} />} />
          <Route path="workshop" element={<Workshop />} />
          <Route path="services" element={<Services />} />
          <Route path="blogs" element={<ViewBlog />} />
          <Route path="viewblog/:id" element={<DynamicBlog />} />
          <Route path="login/register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPass />} />
          
        </Route>
        <Route path="*" element={<LoaderError hasError={true} />} />
      </Routes>
          </Suspense>
    </BrowserRouter>
  </StrictMode>
)
