import './App.css';
import { useState, useEffect, useMemo } from 'react';

import PokeTable from './components/PokeTable';
import SortingFields from './components/SortingFields';
import HeaderFilters from './components/HeaderFilters';
import GetDataGrahp from './components/GetDataGrahp';

const filtersList = {
  selected: true,
  baby: true,
  legendary: false,
  mythical: false,
  mega: false,
  gmax: false,
  released: true,
  unreleased: false,
};

function App() {
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem('pokelist')) || ''
  );
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState({ field: 'cp', order: 'asc' });
  // const [sorting, setSorting] = useState({ field: '', order: '' });

  const [filters, setFilters] = useState(filtersList);
  const [collection, setCollection] = useState(
    JSON.parse(localStorage.getItem('collection')) || []
  );

  const [collections, setCollections] = useState([]);

  const [re, setRe] = useState(1);

  const addCollection = (col) => {
    var collectionList = collections;
    var newCol = {
      name: col.name,
      data: [],
    };

    collectionList.push(newCol);
    setCollections(collectionList);
  };

  useEffect(async () => {
    if (!pokemonData) {
      let newPokeList = await GetDataGrahp();
      setPokemonData(newPokeList);
      localStorage.setItem('pokelist', JSON.stringify(newPokeList));
    }
  }, []);

  const pokemonComp = useMemo(() => {
    if (!pokemonData) return '';
    let pl = pokemonData;

    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      pl.sort((a, b) => {
        var sort = a[sorting.field] > b[sorting.field] ? -1 : 1;
        return reversed * sort;
      });

      // ADD FILTERS HERE
    }
    pl = pl.filter((p) => p.name.toLowerCase().indexOf(query) > -1);

    pl = pl.map((item) => {
      item.selected = collection.indexOf(item.id) > -1 ? 1 : 0;
      return item;
    });
    // pl = pl.filter((p) => !p.selected);
    // console.log(collection, ' 0');

    if (filters) {
      if (!filters['mega']) pl = pl.filter((p) => !p.tags.includes('mega'));
      if (!filters['gmax']) pl = pl.filter((p) => !p.tags.includes('gmax'));
      if (!filters['legendary'])
        pl = pl.filter((p) => !p.tags.includes('legendary'));
      if (!filters['mythical'])
        pl = pl.filter((p) => !p.tags.includes('mythical'));
      if (!filters['baby']) pl = pl.filter((p) => !p.tags.includes('baby'));
      if (!filters['unreleased']) pl = pl.filter((p) => p.released);
      if (!filters['released']) pl = pl.filter((p) => !p.released);
      if (!filters['selected']) pl = pl.filter((p) => p.selected == 0);
    }

    return pl;
  }, [pokemonData, sorting, query, filters, collection, re]);

  useEffect(() => {
    // console.log(collection, '999');
  }, [re]);

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
    if (index !== -1) nc.splice(index, 1);
    else nc.push(id);
    setCollection(nc);
    console.log(nc);
    setRe(re * -1);
    localStorage.setItem('collection', JSON.stringify(nc));
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
          <HeaderFilters filters={filters} change={(e) => handleOnChange(e)} />
        </div>
        <div>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
