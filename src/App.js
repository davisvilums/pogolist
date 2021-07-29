import './App.css';
import { useState, useEffect, useMemo } from 'react';

import PokeTable from './components/PokeTable';
import SortingFields from './components/SortingFields';
import HeaderFilters from './components/HeaderFilters';
import GetDataGrahp from './components/GetDataGrahp';

const filtersList = {selected:true,baby:true,legendary:false,mythical:false,mega:false,gmax:false,released:true,unreleased:false};

function App() {
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem('pokelist')) || ''
  );
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState({ field: 'cp', order: 'asc' });

  const [filters, setFilters] = useState(filtersList);
  const [collection, setCollection] = useState([]);

  const [re, setRe] = useState(1);

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

    pokemonList = pokemonList.map((item) => {
      item.selected = (collection.indexOf(item.id) > -1) ? 1 : 0;
      return item;
    });
    // pokemonList = pokemonList.filter((row) => !row.selected);
    // console.log(collection, ' 0');

    if(filters){
      if(!filters['mega']) pokemonList = pokemonList.filter((row) => !row.tags.includes('mega'));
      if(!filters['gmax']) pokemonList = pokemonList.filter((row) => !row.tags.includes('gmax'));
      if(!filters['legendary']) pokemonList = pokemonList.filter((row) => !row.tags.includes('legendary'));
      if(!filters['mythical']) pokemonList = pokemonList.filter((row) => !row.tags.includes('mythical'));
      if(!filters['baby']) pokemonList = pokemonList.filter((row) => !row.tags.includes('baby'));
      if(!filters['unreleased']) pokemonList = pokemonList.filter((row) => row.released);
      if(!filters['released']) pokemonList = pokemonList.filter((row) => !row.released);
      if(!filters['selected']) pokemonList = pokemonList.filter((row) => row.selected == 0);
    }

    return pokemonList;
  }, [pokemonData, sorting,query,filters,collection,re]);

  useEffect(()=>{
    console.log(collection,'999')
  },[re])

  const handleOnChange = (e) => {
    const value = e.target.value;
    const nf = Object.assign({}, filters);
    // const nf = filters;
    nf[value] = !filters[value];
    setFilters(nf);
  };

  function addToCollection(id) {
    var nc = collection;
    var index = collection.indexOf(id);
    if(index !== -1) nc.splice(index, 1);
    else nc.push(id);
    setCollection(nc);
    console.log(nc);
    setRe(re * -1);
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
          <HeaderFilters filters={filters} change={(e)=>handleOnChange(e)}/>
        </div>
        <div>
          <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)}/>
        </div>
        <div>
          {sorting.field} - {sorting.order}
        </div>
      </div>
      <PokeTable data={pokemonComp} select={addToCollection} re={re} />
    </div>
  );
}

export default App;
