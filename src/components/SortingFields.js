import { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export default function SortingFields({ sorting, onSorting }) {
  const [sf, setSortingField] = useState(sorting.field);
  const [so, setSetsortingOrder] = useState(sorting.order);

  const onSortingChange = (field) => {
    var order = field === sf && so === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSetsortingOrder(order);
    onSorting(field, order);
  };
  return (
    <ButtonGroup aria-label="small outlined button group" className="PokemonSort">
      <Button onClick={() => onSortingChange("cp")}>
        CP{" "}
        <span className="sortingArrow">
          {sf && sf === "cp" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
        </span>
      </Button>
      <Button onClick={() => onSortingChange("name")}>
        Name{" "}
        <span className="sortingArrow">
          {sf && sf === "name" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
        </span>
      </Button>
      <Button onClick={() => onSortingChange("order")}>
        Order{" "}
        <span className="sortingArrow">
          {sf && sf === "order" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
        </span>
      </Button>
      <Button onClick={() => onSortingChange("id")}>
        ID{" "}
        <span className="sortingArrow">
          {sf && sf === "id" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
        </span>
      </Button>
    </ButtonGroup>
  );
}
