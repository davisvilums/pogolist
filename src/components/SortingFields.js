import { useState } from "react";

export default function SortingFields({ sorting, onSorting }) {
  const [sortingField, setSortingField] = useState(sorting.field);
  const [sortingOrder, setSetsortingOrder] = useState(sorting.order);

  const onSortingChange = (field) => {
    var order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSetsortingOrder(order);
    onSorting(field, order);
  };
  return (
    <div className="PokemonSort">
      <strong onClick={() => onSortingChange("cp")} key={"cp"}>
        {"CP"}
        {sortingField && sortingField === "cp" && (sortingOrder === "asc" ? ">" : "<")}
      </strong>
      <strong onClick={() => onSortingChange("name")} key={"name"}>
        {"Name"}
        {sortingField && sortingField === "name" && (sortingOrder === "asc" ? ">" : "<")}
      </strong>
      <strong onClick={() => onSortingChange("order")} key={"order"}>
        {"Order"}
        {sortingField && sortingField === "order" && (sortingOrder === "asc" ? ">" : "<")}
      </strong>
      <strong onClick={() => onSortingChange("id")} key={"id"}>
        {"ID"}
        {sortingField && sortingField === "id" && (sortingOrder === "asc" ? ">" : "<")}
      </strong>
    </div>
  );
}
