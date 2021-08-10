import { useState, useEffect, useMemo } from "react";

import PokeTable from "./components/PokeTable";
import HeaderFilters, { pokeFilter } from "./components/TagFilters";
import GetDataGrahp from "./components/GetDataGrahp";
import CollectionControl from "./components/CollectionControl";
import DataImportExport from "./components/DataImportExport";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function Pokedex({ sorting, query }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem("pokelist")) || ""
  );
  const [collections, setCollections] = useState(
    JSON.parse(localStorage.getItem("collection")) || []
  );

  const handleClose = () => {
    setOpen(false);
  };

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

    pl = pokeFilter(pl, filters);

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
    if (!currentCollection) {
      setOpen(true);
      return;
    }
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
        <DataImportExport updateCollection={setCollections} />
      </div>
      <PokeTable data={pokemonComp} select={addToCollection} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Please select or create a collection before."}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Pokedex;
