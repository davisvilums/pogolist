import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pokemonList, setpokemonList] = useState('');

  useEffect(async () => {
    var pokeList = Array();
    async function fetchData() {
      const request = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?offset=00&limit=2000'
      );
      var dataList = request.data.results;

      getData(dataList).then(() => {
        // pokeList.
        // setpokemonList(pokeList);
        var pokeListSorted = pokeList.sort((a, b) => b.cp - a.cp);
        // var pokeListSorted = pokeList.sort((a, b) => b.id - a.id);
        setpokemonList(pokeListSorted);
      });

      return dataList;
    }
    fetchData();

    const getData = async (dataList) => {
      return Promise.all(
        dataList.map(async (pokemon) => {
          await axios.get(pokemon.url).then((resp) => {
            console.log(resp.data);
            var pStats = resp.data.stats;
            var CP_Multiplier = 0.7903001;
            var cp =
              ((pStats[1].base_stat * pStats[2].base_stat) ^
                (0.5 * pStats[0].base_stat) ^
                (0.5 * CP_Multiplier) ^
                2) /
              10;
            var BAttack = pStats[1].base_stat;
            var BDefense = pStats[2].base_stat;
            var BStamina = pStats[0].base_stat;
            var SAttack = pStats[3].base_stat;
            var SDefense = pStats[4].base_stat;
            var BSpeed = pStats[5].base_stat;

            var SeedMod = 1 + (BSpeed - 75) / 500;

            var Base_Attack = Math.round(
              ((1 / 4) * Math.min(BAttack, SAttack) +
                (7 / 4) * Math.max(BAttack, SAttack)) *
                SeedMod
            );

            var Base_Defense = Math.round(
              ((3 / 4) * Math.min(BDefense, SDefense) +
                (5 / 4) * Math.max(BDefense, SDefense)) *
                SeedMod
            );

            var Base_HP = Math.floor(BStamina * 1.75 + 50);

            var cp = Math.round(
              ((Base_Attack + 15) *
                Math.pow(Base_Defense + 15, 0.5) *
                Math.pow(Base_HP + 15, 0.5) *
                Math.pow(0.7903001, 2)) /
                10
            );

            if (cp > 4200)
              cp = Math.round(
                ((Base_Attack * 0.91 + 15) *
                  Math.pow(Base_Defense * 0.91 + 15, 0.5) *
                  Math.pow(Base_HP * 0.91 + 15, 0.5) *
                  Math.pow(0.7903001, 2)) /
                  10
              );

            var sprite =
              resp.data.sprites.other['official-artwork'].front_default;
            if (!sprite) sprite = resp.data.sprites.front_default;
            pokeList[resp.data.id] = {
              id: resp.data.id,
              name: resp.data.name,
              sprite: sprite,
              // sprite: resp.data.sprites.other['official-artwork'].front_default,
              // base_experience: resp.data.base_experience,
              cp: cp,
            };
          });
        })
      );
    };
  }, []);

  return (
    <div className='App'>
      <div className='TitleSection'>
        <h1>Pokemon Stats</h1>
      </div>
      <div className='PokemonList'>
        {pokemonList &&
          pokemonList.map((pokemon) => (
            <div key={pokemon.id} className='pokemonItem'>
              <img src={pokemon.sprite} alt='' className='pokemonSprite' />
              {/* <div className='pokemonName'>{pokemon.sprite}</div> */}
              <div className='pokemonName'>{pokemon.name}</div>
              <div className='pokemonName'>{pokemon.id}</div>
              <div className='pokemonCP'>{pokemon.cp}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
