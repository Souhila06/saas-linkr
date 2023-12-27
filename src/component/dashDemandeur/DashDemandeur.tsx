import * as React from 'react';
import Navdashboard from "../dashboard/Navdahboard";
import SidDemandeur from "./SidDemandeur";

const dashDemandeur: React.FC = () => {
  return (
    <>
    
      <Navdashboard />
      <SidDemandeur />
    </>
  );
};

export default dashDemandeur;