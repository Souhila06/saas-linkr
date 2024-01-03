import * as React from 'react';

import Sidenav from './Sidenav';
import Navdahboard from './Navdahboard';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import { MdPeople } from 'react-icons/md';
import { Height } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { MdWork } from 'react-icons/md';
import { MdList } from 'react-icons/md';
import { padding } from '@mui/system';


const chartSetting = {
  xAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value: number) => `${value}mm`;
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navdahboard />
      <Sidenav />
      <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding: '20px', backgroundColor: '#FAFAF9' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Card sx={{ maxWidth: 345, padding: '5px 20px' }}>
              
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                    <MdPeople size={35} color="#007FA9" />
                      <h1 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>Total client</h1>
                      <h2 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>200</h2>
                    </div>                
                  </div>


          
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
            <Card sx={{ maxWidth: 345, padding: '5px 20px' }}>

               
               
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                    <MdList size={35} color="#007FA9" />
                      <h1 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>Mes taches</h1>
                      <h2 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>200</h2>

                    </div>
                  
                  </div>
                  
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
            <Card sx={{ maxWidth: 345, padding: '5px 20px' }}>

               
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                    <MdWork style={{padding:'4px'}} size={35} color="#007FA9" />
                      <h1 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>Total projet</h1>
                      <h2 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>200</h2>

                    </div>
                 
                  </div>
              
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
            <Card sx={{ maxWidth: 345, padding: '5px 20px' }}>
              
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                    <MdPeople size={35} color="#007FA9" />
                      <h1 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>Total client</h1>
                      <h2 style={{fontSize: '1.3rem', marginRight: '15px', fontWeight: '300' }}>200</h2>

                    </div>
                  
                  </div>


              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <div style={{ height: '430px', backgroundColor: 'white', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' }}>
                <h2 style={{ marginLeft: '15px', fontWeight: '300' }}>Apercu de toute les Taches</h2>

                <div style={{ display: 'flex', alignItems: 'center', height: '80%' }}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: 'A faire', color: '#47EAD0' },
                          { id: 1, value: 15, label: 'En cours', color: '#7D4FFE' },
                          { id: 2, value: 20, label: 'Terminé', color: '#212E53' },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={6}>
              <div style={{ height: '430px', backgroundColor: 'white', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' }}>
                <h2 style={{ marginLeft: '15px', fontWeight: '300' }}>Apercu des demandes recus</h2>

                <BarChart
                  dataset={dataset}
                  yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[
                    {
                      dataKey: 'seoul',
                      label: 'Seoul rainfall',
                      valueFormatter,
                      color: '#007FA9',
                    },
                  ]}
                  layout="horizontal"
                  {...chartSetting}
                />


              </div>
            </Grid>
            {/* <Grid item xs={4} md={7}>
              <div style={{ backgroundColor: 'white' }}>
                <p>azeazeazeaz</p>
              </div>
            </Grid> */}
          </Grid>
        </Box>
      </div>


    </>

  );
}