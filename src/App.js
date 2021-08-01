import './App.css';
import { useState, useEffect, useMemo } from 'react';

import PokeTable from './components/PokeTable';
import SortingFields from './components/SortingFields';
import HeaderFilters from './components/HeaderFilters';
import GetDataGrahp from './components/GetDataGrahp';

const filtersList = {
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


  const [collections, setCollections] = useState(
    JSON.parse(localStorage.getItem('collection')) || []);
  
  const [value, setValue] = useState("");
  
  const selectCollection = (index) => {
    var newCollection = [...collections];
    var currentStatus = collections[index].selected;
    newCollection = newCollection.map(x => {
      let rObj = x
      rObj.selected = false
      return rObj
    });
    newCollection[index].selected = !currentStatus;
    setCollections(newCollection);
    setRe(re * -1);
  };

  const markCollection = (index, method) => {
    const newCollection = [...collections];
    newCollection[index][method] = !(collections[index][method]);
    setCollections(newCollection);
    setRe(re * -1);
  };

  const removeCollection = index => {
    const newCollection = [...collections];
    newCollection.splice(index, 1);
    setCollections(newCollection);
    setRe(re * -1);
  };


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
    }
    pl = pl.filter((p) => p.name.toLowerCase().indexOf(query) > -1);


      
    pl = pl.map((item) => {
      item.selected = false;
      return item;
    });

    collections.forEach((c) => {
      if(c.selected) {
        pl = pl.map((item) => {
          item.selected = c.pokemon.indexOf(item.id) > -1;
          return item;
        });
      }

      if(c.hide) {
        pl = pl.filter((p) => !c.pokemon.includes(p.id));
      }
      if(c.filter) {
        pl = pl.filter((p) => c.pokemon.includes(p.id));
      }
    });

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
    }

    localStorage.setItem('collection', JSON.stringify(collections));
    return pl;
  }, [pokemonData, sorting, query, filters, collection, re]);

  useEffect(() => {
    // console.log(collection, '999');
  }, [re]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    const nf = Object.assign({}, filters);
    nf[value] = !filters[value];
    setFilters(nf);
  };

  function getCurrentCollection(col) {
    var newCollection = col.filter(obj => {
      return obj.selected === true
    });
    return newCollection[0];
  }

  function addToCollection(id) {
    const newCollection = [...collections];
    var currentCollection = getCurrentCollection(newCollection);
    currentCollection = currentCollection.pokemon;
    var index = currentCollection.indexOf(id);

    if (index !== -1) currentCollection.splice(index, 1);
    else currentCollection.push(id);

    setCollections(newCollection);

    setRe(re * -1);
  }


  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addCollection(value);
    setValue("");
  };

  return (
    <div className='App'>
      <div className='TitleSection'>
        <h1>Pokemon</h1>

        <form onSubmit={handleSubmit}> 
          <div>
            <label><b>Add Collection</b></label>
            <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new collection" />
          </div>
          <button variant="primary mb-3" type="submit">
            Submit
          </button>
        </form>
        <div>
          {collections.map((col, index) => (
            <div>
                <span style={{ textDecoration: col.hide ? "line-through" : "" }}>{col.text}</span>
                <input type="checkbox" checked={col.hide} onClick={() => markCollection(index, 'hide')}/>hide{' '}
                <input type="checkbox" checked={col.filter} onClick={() => markCollection(index, 'filter')}/>filter{' '}
                <input type="checkbox" checked={col.selected} onClick={() => selectCollection(index)}/>selected{' '}
                <button variant="outline-danger" onClick={() => removeCollection(index)}>✕</button>
            </div>
          ))}
        </div>
        <div>
          <HeaderFilters filters={filters} change={(e) => handleOnChange(e)} />
        </div>

        <div>
          <SortingFields
            data={pokemonComp}
            onSorting={(field, order) => setSorting({ field, order })}
          />
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
