import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../character/character.css';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });


export default function CharacterPanel() {

    const [data, setData] = useState(null);

    function getData() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://raider.io/api/v1/characters/profile?region=eu&realm=Silvermoon&name=Freedye&fields=gear%2Ctalents%2Cguild%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent');
      xhr.onload = function() {
        if (xhr.status === 200) {
          setData(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();
    }

  return (
    <Box className = 'characterBox'>
        <ThemeProvider theme={darkTheme}>
            {getData()}

            {data ? (
                <div>   
                <img src={data.thumbnail_url} className="appBarLogo" alt='logo'/>         
                <p>{data.name}</p>
                <p>{data.gear.item_level_equipped}</p>
                <p>{data.raid_progression['nerubar-palace'].summary}</p>
                <p>{data.mythic_plus_scores_by_season[0].scores.all}</p>
                </div>) : (<p>loading</p>)
            }
        </ThemeProvider>
    </Box>
  );
}
