import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

export default function HeaderFilters({ filters, change }) {
  const check = filters;

  return (
    <div className="PokemonFilters">
      {filters &&
        Object.keys(check).map((f) => (
          <Chip
            label={f}
            clickable
            color="primary"
            deleteIcon={<DoneIcon />}
            color={check[f] ? "primary" : ""}
            onClick={() => change(f)}
          />
        ))}
    </div>
  );
}
