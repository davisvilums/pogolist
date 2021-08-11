import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import DragHandleIcon from "@material-ui/icons/DragHandle";
import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

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

  const onDrop = ({ removedIndex, addedIndex }) => {
    updateCollection((newCollection) => arrayMove(newCollection, removedIndex, addedIndex));
  };

  return (
    <div>
      <div className="listHead">
        <div>Collection</div>
        <div align="center">Hide</div>
        <div align="center">Filter</div>
      </div>
      <List>
        <Container onDrop={onDrop}>
          {collections.map((col, index) => (
            <Draggable key={col.text}>
              <ListItem className={`TableRow ${col.selected && "activeRow"}`}>
                <DragHandleIcon className="drag" />

                <Typography
                  className="rowHead"
                  // component="th"
                  scope="row"
                  onClick={() => selectCollection(index)}
                >
                  {col.text}
                </Typography>
                <Checkbox
                  checked={col.hide}
                  onChange={() => markCollection(index, "hide")}
                  name="checkedB"
                />
                <Checkbox
                  checked={col.filter}
                  onChange={() => markCollection(index, "filter")}
                  name="checkedB"
                  color="primary"
                />
                <HighlightOffIcon
                  // onClick={() => removeCollection(index)}
                  onClick={() => handleClickOpen(index)}
                  className="DeleteIcon"
                />
              </ListItem>
            </Draggable>
          ))}
        </Container>
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Do you really want to delete this collection?"}</DialogTitle>
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
