import * as React from 'react';
import Navdashboard from "../dashboard/Navdahboard";
import SidDemandeur from "./SidDemandeur";
 import Listdeman from "./Listdeman";
const CompteDemandeur: React.FC = () => {
  return (
    <>
      <Navdashboard />
      <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding:'20px' }}>
              <Listdeman></Listdeman>
           </div>
      <SidDemandeur />
    </>
  );
};

export default CompteDemandeur;
