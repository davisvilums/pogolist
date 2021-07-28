import './App.css';
import { useState, useEffect, useMemo } from 'react';

import PokeTable from './components/PokeTable';
import SortingFields from './components/SortingFields';
import GetDataGrahp from './components/GetDataGrahp';

function App() {
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem('pokelist')) || ''
  );
  const [q, setQ] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  useEffect(async () => {
    if (!pokemonData) {
      let newPokeList = await GetDataGrahp();
      setPokemonData(newPokeList);
      localStorage.setItem('pokelist', JSON.stringify(newPokeList));
    }
  }, []);

  const pokemonComp = useMemo(() => {
    let pokemonList = pokemonData;
    if (sorting.field) {
      console.log(sorting);
      const reversed = sorting.order === 'asc' ? 1 : -1;
      pokemonList.sort((a, b) => {
        var sort = a[sorting.field] > b[sorting.field] ? -1 : 1;
        return reversed * sort;
      });

      // ADD FILTERS HERE
    }
    return pokemonList;
  }, [pokemonData, sorting]);

  function search(rows) {
    return rows.filter((row) => row.name.toLowerCase().indexOf(q) > -1);
  }

  return (
    <div className='App'>
      <div className='TitleSection'>
        <h1>Pokemon</h1>

        <div>
          <SortingFields
            data={pokemonComp}
            onSorting={(field, order) => setSorting({ field, order })}
          />
        </div>
        <div>
          <input type='text' value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          {sorting.field} - {sorting.order}
        </div>
      </div>
      <PokeTable data={pokemonComp} />
    </div>
  );
}

export default App;
