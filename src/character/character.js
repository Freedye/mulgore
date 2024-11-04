import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Character.css";
import Character from "../img/character.png";
import Loader from "../loader/Loader";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#272727",
    },
  },
});

export default function CharacterPanel() {
  let talentCount = 0;
  let isLoadoutPresent = false;
  const [showLoader, setShowLoader] = useState(true);
  const [name, setName] = useState(null);
  const [itemLevel, setItemLevel] = useState(null);
  const [raidProgress, setRaidProgress] = useState(null);
  const [mythicPlusScore, setMythicPlusScore] = useState(null);
  const [currentTalents, setCurrentTalents] = useState(null);
  let [mostPopularTalents, setMostPopularTalents] = useState([]);


  // need to set queryStrings by user needs
  useEffect(() => {
    const fetchRioData = async () => {
      const response = await fetch(
        "https://raider.io/api/v1/characters/profile?region=eu&realm=Silvermoon&name=Freedye&fields=gear%2Ctalents%2Cguild%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent"
      );
      const data = await response.json();
      setName(data.name)
      setItemLevel(data.gear.item_level_equipped);
      setRaidProgress(data.raid_progression["nerubar-palace"].summary);
      setMythicPlusScore(data.mythic_plus_scores_by_season[0].scores.all);
      setCurrentTalents(data.talentLoadout.loadout_text);
      setShowLoader(false);
    };
    fetchRioData();
  }, []);

  useEffect(() => {
    const fetchBestCharactersBySpec = async () => {
      const response = await fetch(
        "https://raider.io/api/mythic-plus/rankings/specs?region=world&season=season-tww-1&class=druid&spec=feral&page=0"
      );
      const data = await response.json();

      for(let i = 0; i < data.rankings.rankedCharacters.length; i++) {
        if(data.rankings.rankedCharacters[i].character.spec.name === "Feral" && data.rankings.rankedCharacters[i].character.talentLoadoutText != undefined) {
          for(let k = 0; k < mostPopularTalents.length; k++) {
            if(mostPopularTalents[k].loadout === data.rankings.rankedCharacters[i].character.talentLoadoutText) {
              isLoadoutPresent = true;
              break;
            } else {
              isLoadoutPresent = false;
            }
          }

          if(!isLoadoutPresent) {
            setMostPopularTalents([...mostPopularTalents, {id: talentCount, loadout: data.rankings.rankedCharacters[i].character.talentLoadoutText}]);
            talentCount++;
          }
        }
      }
      console.log(mostPopularTalents);
    };
    fetchBestCharactersBySpec();
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        className="characterBody"
        sx={{
          width: 1000,
          height: 500,
          borderRadius: 1,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        {!showLoader ? (
          <div className="characterBox">
            <div className="characterPhoto">
              <b>{name}</b>
              <img
                src={Character}
                className="characterRender"
                alt="character"
              />
            </div>
            <div className="characterData">
              <p><b>Item level:</b> {itemLevel}</p>
              <p><b>Raid progress:</b> {raidProgress}</p>
              <p><b>Mythic+ score:</b> {mythicPlusScore}</p>
              <p><b><a href={"https://www.wowhead.com/talent-calc/blizzard/" + currentTalents}>Current talents</a></b></p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Box>
    </ThemeProvider>
  );
}
