import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function HeaderFilters({ filters, change }) {
  const check = filters;

  return (
    <div className="PokemonFilters">
      {filters &&
        Object.keys(check).map((f) => (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  value={f}
                  checked={check[f]}
                  onChange={(e) => change(e)}
                  color="primary"
                />
              }
              label={f}
            />
          </div>
        ))}
    </div>
  );
}
