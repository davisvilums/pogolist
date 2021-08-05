import { useState, useEffect, useMemo } from "react";

import PokeTable from "./components/PokeTable";
import HeaderFilters from "./components/HeaderFilters";
import GetDataGrahp from "./components/GetDataGrahp";
import CollectionControl from "./components/CollectionControl";

const filtersList = {
  baby: true,
  legendary: false,
  mythical: false,
  mega: false,
  gmax: false,
  released: true,
  unreleased: false,
};

function Pokedex({ sorting, query }) {
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem("pokelist")) || ""
  );

  const [filters, setFilters] = useState(filtersList);
  const [collection, setCollection] = useState(
    JSON.parse(localStorage.getItem("collection")) || []
  );

  const [collections, setCollections] = useState(
    JSON.parse(localStorage.getItem("collection")) || []
  );

  const [addCollectionValue, setAddCollectionValue] = useState("");

  const [re, setRe] = useState(1);

  const addCollection = (col) => {
    var collectionList = collections;
    var newCol = {
      text: col,
      pokemon: [],
    };

    collectionList.push(newCol);
    setCollections(collectionList);
  };

  useEffect(async () => {
    if (!pokemonData) {
      let newPokeList = await GetDataGrahp();
      setPokemonData(newPokeList);
      localStorage.setItem("pokelist", JSON.stringify(newPokeList));
    }
  }, []);

  //   useEffect(() => {}, [collection]);

  const pokemonComp = useMemo(() => {
    if (!pokemonData) return "";
    let pl = pokemonData;

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
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
      if (c.selected) {
        pl = pl.map((item) => {
          item.selected = c.pokemon.indexOf(item.id) > -1;
          return item;
        });
      }

      if (c.hide) {
        pl = pl.filter((p) => !c.pokemon.includes(p.id));
      }
      if (c.filter) {
        pl = pl.filter((p) => c.pokemon.includes(p.id));
      }
    });

    if (filters) {
      if (!filters["mega"]) pl = pl.filter((p) => !p.tags.includes("mega"));
      if (!filters["gmax"]) pl = pl.filter((p) => !p.tags.includes("gmax"));
      if (!filters["legendary"]) pl = pl.filter((p) => !p.tags.includes("legendary"));
      if (!filters["mythical"]) pl = pl.filter((p) => !p.tags.includes("mythical"));
      if (!filters["baby"]) pl = pl.filter((p) => !p.tags.includes("baby"));
      if (!filters["unreleased"]) pl = pl.filter((p) => p.released);
      if (!filters["released"]) pl = pl.filter((p) => !p.released);
    }

    localStorage.setItem("collection", JSON.stringify(collections));
    return pl;
  }, [pokemonData, sorting, query, filters, collection, re]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    const nf = Object.assign({}, filters);
    nf[value] = !filters[value];
    setFilters(nf);
  };

  function getCurrentCollection(col) {
    var newCollection = col.filter((obj) => {
      return obj.selected === true;
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

    updateCollection(newCollection);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addCollectionValue) return;
    addCollection(addCollectionValue);
    setAddCollectionValue("");
  };

  function updateCollection(newCollection) {
    setCollections(newCollection);
    setRe(re * -1);
  }

  return (
    <div className="App">
      <div className="TitleSection">
        <CollectionControl collections={collections} updateCollection={updateCollection} />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="input"
              value={addCollectionValue}
              onChange={(e) => setAddCollectionValue(e.target.value)}
              placeholder="Add new collection"
            />
          </div>
          <button variant="primary mb-3" type="submit">
            Submit
          </button>
        </form>
        <div>
          <HeaderFilters filters={filters} change={(e) => handleOnChange(e)} />
        </div>
        {/* <div>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div> */}
      </div>
      <PokeTable data={pokemonComp} select={addToCollection} re={re} />
    </div>
  );
}

export default Pokedex;
