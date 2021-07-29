import './App.css';
import { useState, useEffect, useMemo } from 'react';

import PokeTable from './components/PokeTable';
import SortingFields from './components/SortingFields';
import HeaderFilters from './components/HeaderFilters';
import GetDataGrahp from './components/GetDataGrahp';

const filtersList = {baby:true,legendary:true,mythical:true,mega:true,gmax:true,released:true,unreleased:true};

function App() {
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem('pokelist')) || ''
  );
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const [filters, setFilters] = useState(filtersList);
  const [collection, setCollection] = useState([]);

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
    pokemonList = pokemonList.filter((row) => row.name.toLowerCase().indexOf(query) > -1);

    if(filters){
      if(!filters['mega']) pokemonList = pokemonList.filter((row) => !row.tags.includes('mega'));
      if(!filters['gmax']) pokemonList = pokemonList.filter((row) => !row.tags.includes('gmax'));
      if(!filters['legendary']) pokemonList = pokemonList.filter((row) => !row.tags.includes('legendary'));
      if(!filters['mythical']) pokemonList = pokemonList.filter((row) => !row.tags.includes('mythical'));
      if(!filters['baby']) pokemonList = pokemonList.filter((row) => !row.tags.includes('baby'));
      if(!filters['unreleased']) pokemonList = pokemonList.filter((row) => row.released);
      if(!filters['released']) pokemonList = pokemonList.filter((row) => !row.released);
    }

    return pokemonList;
  }, [pokemonData, sorting,query,filters]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    const nf = Object.assign({}, filters);
    nf[value] = !filters[value];
    setFilters(nf);
  };

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
          <HeaderFilters filters={filters} change={(e)=>handleOnChange(e)}/>
        </div>
        <div>
          <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)}/>
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
