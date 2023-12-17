import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardInfo from './CardInfo';
import "../style/SectionChoice.css";
import "../style/SectionPopulaire.css"; 

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function SectionPopulaire() {
  return (
    <section className='sectionPopulaire'>
      <h1>Nos services Populaire</h1>
      <div>
        <Grid container>
          {[lightTheme].map((theme, index) => (
            <Grid item xs={12} key={index}>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Ajustez cette propriété
                    gap: 2,
                  }}
                >
                  {[0, 1,2,3,5].map((elevation) => (
                    <CardInfo key={elevation} urlImage={''} title={'salut'} description={'Lorem aze azeknlaz ealznk zealkenaze ealnzlae'} />
                  ))}
                </Box>
              </ThemeProvider>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
}
