import NavBar from './component/NavBar'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from './page/Index'
import SignIn from './page/SignIn'
import SignUp from './page/SignUp';
import Footer from './component/Footer';
import ServiceOffer from './page/ServiceOffer';
import Dashboard from './component/dashboard/Dashboard';
import Orders from './component/dashboard/Orders';
import { Settings } from '@mui/icons-material';
import Message from './component/dashboard/Message';
import Evenement from './component/dashboard/Evenement';
import Client from './component/dashboard/Client';
import Projet from './component/dashboard/Projet';
import Tache from './component/dashboard/Tache';
import Equipe from './component/dashboard/Equipe';
import Compte from './component/dashboard/Compte';





function App() {
  return (

    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup/demandeur" element={<SignUp type='demandeur' />} />
        <Route path="/signup/offreur" element={<SignUp type='offreur' />} />
        <Route path="/service" element={<ServiceOffer />} />


        <Route path="/offreur/dashboard" element={<Dashboard />} />
        <Route path="/offreur/evenement" element={<Evenement />} />
        <Route path="/offreur/client" element={<Client />} />
        <Route path="/offreur/projet" element={<Projet />} />
        <Route path="/offreur/tache" element={<Tache />} />
        <Route path="/offreur/message" element={<Message />} />
        <Route path="/offreur/equipe" element={<Equipe />} />
        <Route path="/offreur/compte" element={<Compte />} />

      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>

  );
}

export default App;