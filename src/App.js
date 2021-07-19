import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

async function getData(dataList, pokeList) {
  return Promise.all(
    dataList.map(async (pokemon) => {
      await axios.get(pokemon.url).then(async (resp) => {
        var cp = getPokemonCP(resp.data.stats);
        var name = resp.data.name;
        var id = resp.data.id;
        var order = resp.data.order;
        var kind = 'normal';

        var sprite = resp.data.sprites.other['official-artwork'].front_default;
        if (!sprite || name.includes('castform-'))
          sprite = resp.data.sprites.front_default;

        await axios.get(resp.data.species.url).then((resp) => {
          if (resp.data.is_legendary) kind = 'legendary';
          if (resp.data.is_mythical) kind = 'mythical';
          if (resp.data.is_baby) kind = 'baby';

          if (order < 0 && resp.data.evolves_from_species) {
            var evUrl = resp.data.evolves_from_species.url;
            var evArr = evUrl.split('/');
            var evPoId = evArr[evArr.length - 2];

            var obj = pokeList.findIndex(function (pok, index) {
              if (pok && pok.id == evPoId) return true;
            });

            if (pokeList[obj] && obj > 0) {
              order = pokeList[obj].order + 0.5;
            }
          }
        });
        if (order < 0) {
          order = id + 900;
        }

        var forms = resp.data.forms;
        var formsCount = 0;
        if (forms) {
          formsCount = forms.length;
        }

        var gen;
        switch (true) {
          case id <= 151:
            gen = 1;
            break;
          case id <= 251:
            gen = 2;
            break;
          case id <= 386:
            gen = 3;
            break;
          case id <= 493:
            gen = 4;
            break;
          case id <= 649:
            gen = 5;
            break;
          case id <= 721:
            gen = 6;
            break;
          case id <= 809:
            gen = 7;
            break;
          case id <= 10000:
            gen = 8;
            break;
          case id <= 10026:
            gen = 10;
            break;
          case id <= 10003:
            gen = 3;
            break;
          case id <= 10015:
            gen = 4;
            break;
          case id <= 10024:
            gen = 5;
            break;
          case id <= 10090:
            gen = 6;
            break;
          case id <= 10115:
            gen = 7;
            break;
          case id <= 10185:
            gen = 8;
            break;
          default:
            gen = 10;
            break;
        }

        var pokemonData = {
          id: id,
          name: name,
          sprite: sprite,
          order: order,
          forms: formsCount,
          cp: cp,
          gen: gen,
          kind: kind,
        };

        if (formsCount > 1) {
          forms.map(async (pokemonF, index) => {
            await axios.get(pokemonF.url).then((resp) => {
              var pokemonDataF = Object.assign({}, pokemonData);
              var newSprite = resp.data.sprites.front_default;
              if (index > 0) {
                pokemonDataF.sprite = newSprite;
                pokemonDataF.name = resp.data.name;
              }
              if (pokemonDataF.sprite) {
                pokeList.push(pokemonDataF);
              }
            });
          });
        } else {
          pokeList.push(pokemonData);
        }
      });
    })
  );
}

function getPokemonCP(pStats) {
  var CP_Multiplier = 0.7903001;
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
      Math.pow(CP_Multiplier, 2)) /
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
  return cp;
}

function sortPokemonBy(pokeList, sortBy, order = 0) {
  if (pokeList) {
    if (order) return pokeList.sort((a, b) => -b[sortBy] + a[sortBy]);
    else return pokeList.sort((a, b) => b[sortBy] - a[sortBy]);
  }
}

async function fetchData(setpokemonList) {
  var pokeList = Array();
  const request = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/?offset=00&limit=2000'
  );
  var dataList = request.data.results;

  getData(dataList, pokeList, setpokemonList).then(() => {
    setpokemonList(pokeList);
    localStorage.setItem('pokeList', JSON.stringify(pokeList));
  });

  return dataList;
}

function App() {
  const [pokemonList, setpokemonList] = useState(
    JSON.parse(localStorage.getItem('pokeList')) || ''
  );

  useEffect(async () => {
    if (!pokemonList) fetchData(setpokemonList);
  }, []);

  var pokemonListSorted = sortPokemonBy(pokemonList, 'order', 1);
  // var pokemonListSorted = sortPokemonBy(pokemonList, 'cp');
  if (pokemonListSorted !== pokemonList) setpokemonList(pokemonListSorted);

  return (
    <div className='App'>
      <div className='TitleSection'>
        <h1>Pokemon Stats</h1>
      </div>
      <div className='PokemonList'>
        {pokemonList &&
          pokemonList
            .filter((pokemonf) => !pokemonf.name.includes('unown-'))
            .filter((pokemonf) => !pokemonf.name.includes('-gmax'))
            .filter((pokemonf) => !pokemonf.name.includes('-totem'))
            .filter((pokemonf) => !pokemonf.name.includes('-eternamax'))
            .filter((pokemonf) => !pokemonf.name.includes('-primal'))
            .filter((pokemonf) => !pokemonf.name.includes('pikachu-'))
            .filter((pokemonf) => !pokemonf.name.includes('arceus-'))
            .filter((pokemonf) => !pokemonf.name.includes('genesect-'))
            .filter((pokemonf) => !pokemonf.name.includes('vivillon-'))
            .filter((pokemonf) => !pokemonf.name.includes('flabebe-'))
            .filter((pokemonf) => !pokemonf.name.includes('floette-'))
            .filter((pokemonf) => !pokemonf.name.includes('florges-'))
            .filter((pokemonf) => !pokemonf.name.includes('furfrou-'))
            .filter((pokemonf) => !pokemonf.name.includes('pumpkaboo-'))
            .filter((pokemonf) => !pokemonf.name.includes('gourgeist-'))
            .filter((pokemonf) => !pokemonf.name.includes('zygarde-10'))
            .filter((pokemonf) => !pokemonf.name.includes('rockruff-own-tempo'))
            .filter((pokemonf) => !pokemonf.name.includes('silvally-'))
            .filter((pokemonf) => !pokemonf.name.includes('minior-'))
            .filter((pokemonf) => !pokemonf.name.includes('toxtricity-low-key'))
            .filter((pokemonf) => !pokemonf.name.includes('darmanitan-zen'))
            // .filter((pokemonf) => !pokemonf.name.includes('-busted'))
            // .filter((pokemonf) => pokemonf.cp < 2600)
            .map((pokemon) => (
              <div key={pokemon.id + pokemon.name} className='pokemonItem'>
                <div className='pokemonID'>#{pokemon.id}</div>
                <div className='pokemonGeneration'>G{pokemon.gen}</div>
                <div className='pokemonSpriteWrap'>
                  <img src={pokemon.sprite} alt='' className='pokemonSprite' />
                </div>
                <div className='pokemonName'>
                  {pokemon.name.split('-').join(' ')}
                </div>
                <div className='pokemonCP'>{pokemon.cp}</div>
                <div className='pokemonData'>
                  <div>kind: {pokemon.kind}</div>
                  <div>order: {pokemon.order}</div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
