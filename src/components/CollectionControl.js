import React from "react";

import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function CollectionControl({ collections, updateCollection }) {
  const selectCollection = (index) => {
    var newCollection = [...collections];
    var currentStatus = collections[index].selected;
    newCollection = newCollection.map((x) => {
      let rObj = x;
      rObj.selected = false;
      return rObj;
    });
    newCollection[index].selected = !currentStatus;
    updateCollection(newCollection);
  };

  const markCollection = (index, method) => {
    const newCollection = [...collections];
    newCollection[index][method] = !collections[index][method];
    updateCollection(newCollection);
  };

  const removeCollection = (index) => {
    const newCollection = [...collections];
    newCollection.splice(index, 1);
    updateCollection(newCollection);
  };

  return (
    <div>
      {collections.map((col, index) => (
        <div key={index}>
          <FormControlLabel
            control={<Radio checked={col.selected} onChange={() => selectCollection(index)} />}
            label={col.text}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={col.hide}
                onChange={() => markCollection(index, "hide")}
                name="checkedB"
              />
            }
            label="Hide"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={col.filter}
                onChange={() => markCollection(index, "filter")}
                name="checkedB"
                color="primary"
              />
            }
            label="Filter"
          />
          <button variant="outline-danger" onClick={() => removeCollection(index)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default CollectionControl;
