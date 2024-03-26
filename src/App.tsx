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
import DemandeClient from './component/dashboard/DemandeClient';
import Mesdemande from './component/dashDemandeur/MesDemande';
import DashDemandeur from './component/dashDemandeur/DashDemandeur';
import CompteDemandeur from './component/dashDemandeur/CompteDemandeur';
import { Switch } from '@mui/material';
import SuivreDemande from "./component/dashDemandeur/SuivreDemande";
import DetailOffreur from "./component/dashboard/DetailOffreur";
import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "./component/VerifyEmail"
import ProfileDemandeur from "./component/ProfileDemandeur"
import NotFound  from "./component/NotFound"
import OffreurProfile from './component/OffreurProfile';
import ProfileOffreur from './component/ProfileOffreur';
import PageSuccess from './component/PageSuccess';
import PageFailed from './component/PageFailed';




function App() {




  return (

    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup/demandeur" element={<SignUp role='demandeur' />} />
        <Route path="/signup/offreur" element={<SignUp role='offreur' />} />
        <Route
          path="/service"
          element={
            <PrivateRoute allowedRoles={['demandeur']}>
              <ServiceOffer />
            </PrivateRoute>
          }
        />
          <Route
          path="/offreur/dashboard"
          element={
            <PrivateRoute allowedRoles={['offreur']}>
              <Dashboard />
            </PrivateRoute>
          }
        />


       
        <Route path="/offreur/evenement" element={<Evenement />} />
        <Route path="/offreur/client" element={<Client />} />
        <Route path="/offreur/projet" element={<Projet />} />
        <Route path="/offreur/tache" element={<Tache />} />
        <Route path="/offreur/message" element={<Message />} />
        <Route path="/offreur/equipe" element={<Equipe />} />
        <Route path="/offreur/compte" element={<Compte />} />
        <Route path="/offreur/demande" element={<DemandeClient />} />

        <Route path="/offreurProfile/:id" element={<OffreurProfile />} />
        <Route path="/profileOffreur" element={<ProfileOffreur />} />
        <Route path="/success" element={<PageSuccess />} />
        <Route path="/failed" element={<PageFailed />} />


    

        <Route path="/demandeur/dashboard" element={<DashDemandeur />} />
        <Route path="/demandeur/mesdemande" element={<Mesdemande />} />
        <Route path="/demandeur/comptedemandeur" element={<CompteDemandeur />} />

        <Route path="/demande/:id" element={<SuivreDemande demande={[]} />} />
        <Route path="/nouvelle/:id/:titre/:client/:dateenvoie/:description/:cahierDeCharge" element={<DetailOffreur closeEvent={() => { }} />} />


        <Route path="/verifyemail" element={<VerifyEmail />} />

        
        <Route path="/notfound" element={<NotFound />} />
        
        <Route
          path="/profildemandeur"
          element={
            <PrivateRoute allowedRoles={['demandeur']}>
              <ProfileDemandeur />
            </PrivateRoute>
          }
        />

      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>

  );
}

export default App;