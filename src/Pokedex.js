import { useState, useEffect, useMemo } from "react";

import PokeTable from "./components/PokeTable";
import HeaderFilters from "./components/HeaderFilters";
import GetDataGrahp from "./components/GetDataGrahp";
import CollectionControl from "./components/CollectionControl";

function Pokedex({ sorting, query }) {
  const [filters, setFilters] = useState([]);
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem("pokelist")) || ""
  );
  const [collections, setCollections] = useState(
    JSON.parse(localStorage.getItem("collection")) || []
  );

  useEffect(async () => {
    if (!pokemonData) {
      let newPokeList = await GetDataGrahp();
      setPokemonData(newPokeList);
      localStorage.setItem("pokelist", JSON.stringify(newPokeList));
    }
  }, []);

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
      if (!filters["g1"]) pl = pl.filter((p) => p.gen != 1);
      if (!filters["g2"]) pl = pl.filter((p) => p.gen != 2);
      if (!filters["g3"]) pl = pl.filter((p) => p.gen != 3);
      if (!filters["g4"]) pl = pl.filter((p) => p.gen != 4);
      if (!filters["g5"]) pl = pl.filter((p) => p.gen != 5);
      if (!filters["g6"]) pl = pl.filter((p) => p.gen != 6);
      if (!filters["g7"]) pl = pl.filter((p) => p.gen != 7);
      if (!filters["g8"]) pl = pl.filter((p) => p.gen != 8);
    }

    localStorage.setItem("collection", JSON.stringify(collections));
    return pl;
  }, [pokemonData, sorting, query, filters, collections]);

  function getCurrentCollection(col) {
    var newCollection = col.filter((obj) => {
      return obj.selected === true;
    });
    return newCollection[0];
  }

  function addToCollection(id) {
    const newCollection = [...collections];
    var currentCollection = getCurrentCollection(newCollection);
    if (!currentCollection) return;
    currentCollection = currentCollection.pokemon;
    var index = currentCollection.indexOf(id);

    if (index !== -1) currentCollection.splice(index, 1);
    else currentCollection.push(id);

    setCollections(newCollection);
  }

  return (
    <div className="PokedexArea">
      <div className="TitleSection">
        <CollectionControl collections={collections} updateCollection={setCollections} />
        <HeaderFilters filters={filters} setFilters={setFilters} />
      </div>
      <PokeTable data={pokemonComp} select={addToCollection} />
    </div>
  );
}

export default Pokedex;
