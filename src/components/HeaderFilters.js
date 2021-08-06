import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

const filtersList = {
  released: true,
  unreleased: false,
  legendary: false,
  mythical: false,
  mega: false,
  baby: true,
  gmax: false,
  g1: true,
  g2: true,
  g3: true,
  g4: true,
  g5: true,
  g6: true,
  g7: true,
  g8: true,
};

export default function HeaderFilters({ filters, setFilters }) {
  useEffect(() => {
    setFilters(filtersList);
  }, []);

  const handleOnChange = (value) => {
    // const value = e.target.value;
    const nf = Object.assign({}, filters);
    nf[value] = !filters[value];
    setFilters(nf);
  };

  return (
    <div className="PokemonFilters">
      {filters &&
        Object.keys(filters).map((f) => (
          <Chip
            label={f}
            clickable
            color="primary"
            deleteIcon={<DoneIcon />}
            color={filters[f] ? "primary" : ""}
            onClick={() => handleOnChange(f)}
          />
        ))}
    </div>
  );
}
