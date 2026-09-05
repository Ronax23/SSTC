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
import InvestDash from './Components/Dashboard/InvestDash.tsx';
import BlogList from './Components/Dashboard/BlogList.tsx';
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
        <Route path="/register" element={<AddUser userType={"customer"} main={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path='userList'  element={<UserList/>}/>
          <Route path='createBlog' element={<CreateBlogs />} />
          <Route path="addUser" element={<AddUser userType={"customer"} />} />
          <Route path="editUser/:id" element={<AddUser userType={"customer"} />} />
          <Route path="addEmployee" element={<AddUser userType={"employee"} />} />
          <Route path="addEmployee/:id" element={<AddUser userType={"employee"} />} />
          <Route path="addAdmin" element={<AddUser userType={"admin"} />} />
          <Route path="addAdmin/:id" element={<AddUser userType={"admin"} />} />
          <Route path="addSupplier" element={<AddUser userType={"supplier"} />} />
          <Route path="addSupplier/:id" element={<AddUser userType={"supplier"} />} />

          <Route path='AddInvoice' element={<Invoice Usetype="invoice" />} />
          <Route path="Investments" element={<InvestDash/>}></Route>
          <Route path="viewBlogs" element={<BlogList />}>
            <Route path=":id" element={<DynamicBlog />} />
          </Route>
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
          <Route path="login/register" element={<AddUser userType={"customer"} main={true} />} />
          <Route path="signup" element={<AddUser userType={"customer"} main={true} />} />
          <Route path="login" element={<Login />} />  
                  
        </Route>
        <Route path="*" element={<LoaderError hasError={true} />} />
      </Routes>
          </Suspense>
    </BrowserRouter>
  </StrictMode>
)
