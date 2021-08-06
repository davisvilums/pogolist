import React, { useState } from "react";
import CollectionTable from "./CollectionTable";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

export default function CollectionControl({ collections, updateCollection }) {
  const [addCollectionValue, setAddCollectionValue] = useState("");

  const addCollection = (col) => {
    var collectionList = collections;
    var newCol = {
      text: col,
      pokemon: [],
    };

    collectionList.push(newCol);
    updateCollection(collectionList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addCollectionValue) return;
    addCollection(addCollectionValue);
    setAddCollectionValue("");
  };
  return (
    <div>
      <CollectionTable collections={collections} updateCollection={updateCollection} />
      <form onSubmit={handleSubmit} className="CollectionForm">
        <TextField
          id="standard-basic"
          label="Add new collection"
          onChange={(e) => setAddCollectionValue(e.target.value)}
          value={addCollectionValue}
          size="small"
        />
        <Button
          // variant="contained"
          variant="outlined"
          color="primary"
          type="submit"
          size="small"
          className="AddCollectionButton"
        >
          <AddIcon />
        </Button>
      </form>
    </div>
  );
}
