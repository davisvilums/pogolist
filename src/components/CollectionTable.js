import React from "react";

import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function CollectionTable({ collections, updateCollection }) {
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
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Collection</TableCell>
            <TableCell align="center">Hide</TableCell>
            <TableCell align="center">Filter</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collections.map((col, index) => (
            <TableRow key={col.text} className={col.selected && "activeRow"}>
              <TableCell
                className="rowHead"
                component="th"
                scope="row"
                onClick={() => selectCollection(index)}
              >
                {col.text}
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  checked={col.hide}
                  onChange={() => markCollection(index, "hide")}
                  name="checkedB"
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  checked={col.filter}
                  onChange={() => markCollection(index, "filter")}
                  name="checkedB"
                  color="primary"
                />
              </TableCell>
              <TableCell align="right">
                <DeleteIcon onClick={() => removeCollection(index)} className="DeleteIcon" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollectionTable;
