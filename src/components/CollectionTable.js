import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function CollectionTable({ collections, updateCollection }) {
  const [open, setOpen] = React.useState(false);
  const [toDelete, setToDelete] = React.useState(null);

  const handleClickOpen = (item) => {
    setToDelete(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteActive = () => {
    removeCollection(toDelete);
    setOpen(false);
  };

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
                  <HighlightOffIcon
                    // onClick={() => removeCollection(index)}
                    onClick={() => handleClickOpen(index)}
                    className="DeleteIcon"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this collection?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={deleteActive} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CollectionTable;
