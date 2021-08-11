import { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

const ButtonGroupS = styled(ButtonGroup)`
  margin: 0 20px 0 auto;
`;
const ButtonS = styled(Button)`
  line-height: 1em;
  padding-left: 25px;
  color: rgb(255 255 255 / 80%);
  border-color: rgb(255 255 255 / 80%);
`;
const SortingArrow = styled.span`
  width: 20px;
`;

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
    <Tooltip title="Sort by:" placement="left" arrow>
      <ButtonGroupS aria-label="small outlined button group">
        <ButtonS onClick={() => onSortingChange("cp")}>
          CP{" "}
          <SortingArrow>
            {sf && sf === "cp" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
          </SortingArrow>
        </ButtonS>
        <ButtonS onClick={() => onSortingChange("name")}>
          Name{" "}
          <SortingArrow>
            {sf && sf === "name" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
          </SortingArrow>
        </ButtonS>
        <ButtonS onClick={() => onSortingChange("order")}>
          Order{" "}
          <SortingArrow>
            {sf && sf === "order" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
          </SortingArrow>
        </ButtonS>
        <ButtonS onClick={() => onSortingChange("id")}>
          ID{" "}
          <SortingArrow>
            {sf && sf === "id" && (so === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />)}
          </SortingArrow>
        </ButtonS>
      </ButtonGroupS>
    </Tooltip>
  );
}
