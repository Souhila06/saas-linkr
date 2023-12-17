import React, { useState } from 'react';
import "../style/SplitPage.css"
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputBase, alpha, styled } from '@mui/material';
import SearchBar from '@mkyy/mui-search-bar';
import TextField from '@mui/material/TextField';




export default function SplitPage() {
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleSearch = (labelOptionValue: any) => {
        //...
        console.log(labelOptionValue);
      };

    return (
      <section className='sectionSplit'>
        <div>
            <h1>Bienvenue sur notre Plateforme de Services Collaboratifs ! </h1>
            <p>Découvrez une nouvelle dimension de l'échange de services entre donneurs et offreurs sur notre plateforme dédiée à la collaboration et à la réalisation de vos projets.  </p>
          <div className='div-search'>
          <SearchBar className='searchbar'
          width={'85%'}
            value={textFieldValue}
            onChange={newValue => setTextFieldValue(newValue)}
            onSearch={handleSearch}
            />

            <div>
            <div className='div-double-btn'>
                <a className='abutton1' href=""> Devenir un Offreur &rarr;</a>
                <a className='abutton2' href=""> Devenir un Demandeur &rarr;</a>

         


            </div>
            
            </div>
          </div>
        </div>
        <img src="image/fleur.png" alt="" />
        
            
      </section>
    );
  }