import './App.css';
import { useState, useEffect } from 'react';

import { fetchPokemonData } from './components/GetData';
import GetDataGrahp from './components/GetDataGrahp';
import PokemonCard from './components/PokemonCard';

function sortPokemonBy(pokeList, sortBy, order = 0) {
  if (pokeList) {
    if (order) return pokeList.sort((a, b) => -b[sortBy] + a[sortBy]);
    else return pokeList.sort((a, b) => b[sortBy] - a[sortBy]);
  }
}

function App() {
  const newPokeList = GetDataGrahp();
  console.log('newPokeList', newPokeList);
  // return <div>my return div</div>;
  const [pokemonList, setpokemonList] = useState(
    JSON.parse(localStorage.getItem('pokelist')) || ''
  );
  const [filteredList, setFilteredList] = useState(pokemonList);
  const [updateList, setUpdateList] = useState(1);
  const [sorting, setSorting] = useState({ order: 1, cat: 'cp' });
  const [filters, setfilters] = useState({
    gen: [],
  });

  useEffect(() => {
    if (!pokemonList) {
      fetchPokemonData(callBackAfter);
    }
  }, []);

  useEffect(() => {
    runFilter();
  }, [pokemonList]);

  useEffect(() => {
    if (filteredList) {
      sortPokemon('cp', 1);
    }
  }, [filteredList]);

  function callBackAfter(pl) {
    localStorage.setItem('pokelist', JSON.stringify(pl));
    setpokemonList(pl);
    setUpdateList(updateList + 1);
  }

  function sortPokemon(by, newOrder) {
    var order = newOrder;
    if (!newOrder) order = sorting.order;
    if (by == sorting.cat) order = sorting.order ? 0 : 1;
    var pokemonListSorted = sortPokemonBy(filteredList, by, order);
    if (filteredList != pokemonListSorted) setFilteredList(pokemonListSorted);
    setSorting({ order: order, cat: by });
  }
  function removePokemon(id) {
    console.log(id);
    var index = filteredList.findIndex(function (o) {
      return o.id === id;
    });
    console.log(index);
    if (index !== -1) filteredList.splice(index, 1);

    // pokemonList
    setFilteredList(filteredList);
    setUpdateList(updateList + 1);
  }

  function runFilter() {
    if (!pokemonList) return;
    var pl = pokemonList;
    var gens = [1, 2, 3, 4, 5, 6, 7, 8];
    var plarr = [
      // 'unown-',
      // '-gmax',
      // '-totem',
      // '-eternamax',
      // '-primal',
      // 'pikachu-',
      // 'arceus-',
      // 'genesect-',
      // 'vivillon-',
      // 'flabebe-',
      // 'floette-',
      // 'florges-',
      // 'furfrou-',
      // 'pumpkaboo-',
      // 'gourgeist-',
      // 'zygarde-10',
      // 'rockruff-own-tempo',
      // 'silvally-',
      // 'minior-',
      // 'toxtricity-low-key',
      // 'darmanitan-zen',
      // '-ash',
      // '-busted',
      // '-mega',
    ];

    for (const filterName of plarr) {
      pl = pl.filter((p) => !p.name.includes(filterName));
    }

    pl = pl.filter((p) => !p.kind.includes('legendary'));
    pl = pl.filter((p) => !p.kind.includes('mythical'));
    // pl = pl.filter((p) => !p.kind.includes('normal'));

    pl = pl.filter((p) => gens.includes(p.gen));

    // pl = pl.filter((p) => p.released);
    // pl.map((p, index) => {
    // });

    setFilteredList(pl);
  }

  return (
    <div className='App'>
      <div className='TitleSection'>
        <h1>Pokemon Stats</h1>
        {/* <div>
          <ul>
            <li>
              <input type='checkbox' />
              G1
            </li>
          </ul>
        </div> */}
        <div className='Sorting'>
          <button onClick={() => sortPokemon('cp')}>CP</button>
          <button onClick={() => sortPokemon('id')}>ID</button>
          <button onClick={() => sortPokemon('order')}>Family</button>
          <button onClick={() => sortPokemon('gen')}>Gen</button>
        </div>
        <div>
          {sorting.order} - {sorting.cat} - {updateList}
        </div>
      </div>
      <div className='PokemonList'>
        {filteredList &&
          filteredList.map((pokemon, index) => (
            <PokemonCard
              pokemon={pokemon}
              key={index}
              removePokemon={removePokemon}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
