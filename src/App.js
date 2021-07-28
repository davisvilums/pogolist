import './App.css';
import { useState, useEffect } from 'react';

import GetDataGrahp from './components/GetDataGrahp';
import PokemonCard from './components/PokemonCard';

function sortPokemonBy(pokeList, sortBy, order = 0) {
  if (pokeList) {
    return pokeList.sort((a, b)=>{
      var sort = 0;
      if(a[sortBy] < b[sortBy]) { sort= -1; }
      if(a[sortBy] > b[sortBy]) { sort= 1; }
      if (order) sort = -sort;
      return sort;
    });
  }
}

function App() {
  const [pokemonList, setpokemonList] = useState(
    JSON.parse(localStorage.getItem('pokelist')) || ''
  );
  const [filteredList, setFilteredList] = useState(pokemonList);
  const [updateList, setUpdateList] = useState(1);
  const [sorting, setSorting] = useState({ order: 1, cat: 'cp' });
  const [filters, setfilters] = useState({
    gen: [],
  });
  var newPokeList;
  if (!pokemonList) {
  }


  useEffect(async () => {
    if (!pokemonList) {
      newPokeList = await GetDataGrahp();
      localStorage.setItem('pokelist', JSON.stringify(newPokeList));
      setpokemonList(newPokeList);
    }
  }, []);
  useEffect(() => {
    runFilter()
  }, [pokemonList]);

  function sortPokemon(by, newOrder) {
    var order = newOrder;
    if (!newOrder) order = sorting.order;
    if (by == sorting.cat) order = sorting.order ? 0 : 1;
    console.log(by);
    var pokemonListSorted = sortPokemonBy(filteredList, by, order);
    if (filteredList != pokemonListSorted) setFilteredList(pokemonListSorted);
    setSorting({ order: order, cat: by });
  }
  function removePokemon(id) {
    var index = filteredList.findIndex(function (o) {
      return o.id === id;
    });
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
      '-gmax',
      '-primal',
      '-mega',
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
          <button onClick={() => sortPokemon('name')}>Name</button>
        </div>
        <div>
          {sorting.order} - {sorting.cat} - {updateList}
        </div>
      </div>
      <div className='PokemonList'>
        {filteredList &&
          filteredList.map((pokemon, index) => (
            // <div>{pokemon.name}</div>
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
