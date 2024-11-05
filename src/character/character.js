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
  const [showLoader, setShowLoader] = useState(true);
  const [name, setName] = useState(null);
  const [itemLevel, setItemLevel] = useState(null);
  const [raidProgress, setRaidProgress] = useState(null);
  const [mythicPlusScore, setMythicPlusScore] = useState(null);
  const [currentTalents, setCurrentTalents] = useState(null);
  const [popularTalents, setPopularTalents] = useState([])
  const mostPopularTalents = [];
  let isLoadoutPresent = false;

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
        let specName = data.rankings.rankedCharacters[i].character.spec.name;
        let talentLoadoutText = data.rankings.rankedCharacters[i].character.talentLoadoutText;
        let talentPopularity = 1;
        let currentLoadOut = {};
        isLoadoutPresent = false;

        if(specName === "Feral" && talentLoadoutText !== undefined) {
          if(mostPopularTalents.length === 0) {
            currentLoadOut = {talentPopularity: talentPopularity, loadout: talentLoadoutText};
          } else {
            for(let k = 0; k < mostPopularTalents.length; k++) {
              if(mostPopularTalents[k].loadout === talentLoadoutText) {
                isLoadoutPresent = true;
                mostPopularTalents[k].talentPopularity++;
              }
            }

            if(!isLoadoutPresent) {
              currentLoadOut = {talentPopularity: talentPopularity, loadout: talentLoadoutText};
            }
          }

            
          if(!isLoadoutPresent) {
            mostPopularTalents.push(currentLoadOut);
          }

          talentPopularity = 1;
        }
      }
      mostPopularTalents.sort((a, b) => (a.talentPopularity < b.talentPopularity) ? 1 : -1)
      setPopularTalents(mostPopularTalents);
    };
    fetchBestCharactersBySpec();
  }, []);

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
              <p><b><a href={"https://www.wowhead.com/talent-calc/blizzard/" + currentTalents} target="_blank">Current talents</a></b></p>
              {popularTalents.length > 0 ? (
                <p><b><a href={"https://www.wowhead.com/talent-calc/blizzard/" + popularTalents[0].loadout} target="_blank">Most popular talents</a></b></p>
              ) : <p>Loading most popular talents...</p>}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Box>
    </ThemeProvider>
  );
}
