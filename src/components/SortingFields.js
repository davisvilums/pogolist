import { useState } from "react";

export default function SortingFields({ data, onSorting }) {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSetsortingOrder] = useState("asc");
  const columns = data[0] && Object.keys(data[0]);

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSetsortingOrder(order);
    onSorting(field, order);
  };
  return (
    <div className="PokemonSort">
      <strong onClick={() => onSortingChange("cp")} key={"cp"}>
        {"CP"}
        {sortingField &&
          sortingField === "cp" &&
          (sortingOrder === "asc" ? ">" : "<")}
      </strong>
      <strong onClick={() => onSortingChange("name")} key={"name"}>
        {"Name"}
        {sortingField &&
          sortingField === "name" &&
          (sortingOrder === "asc" ? ">" : "<")}
      </strong>
      <strong onClick={() => onSortingChange("order")} key={"order"}>
        {"Order"}
        {sortingField &&
          sortingField === "order" &&
          (sortingOrder === "asc" ? ">" : "<")}
      </strong>
      <strong onClick={() => onSortingChange("id")} key={"id"}>
        {"ID"}
        {sortingField &&
          sortingField === "id" &&
          (sortingOrder === "asc" ? ">" : "<")}
      </strong>

      {/* {data[0] &&
        columns.map((heading) => (
          <strong onClick={() => onSortingChange(heading)} key={heading}>
            {heading}
            {sortingField &&
              sortingField === heading &&
              (sortingOrder === 'asc' ? '>' : '<')}
          </strong>
        ))} */}
    </div>
  );
}
