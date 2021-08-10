import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";

const filters = {
  released: true,
  unreleased: false,
  normal: true,
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

export function pokeFilter(pl, filters) {
  if (!filters["normal"]) pl = pl.filter((p) => p.tags.length);
  if (!filters["mega"]) pl = pl.filter((p) => !p.tags.includes("mega"));
  if (!filters["gmax"]) pl = pl.filter((p) => !p.tags.includes("gmax"));
  if (!filters["legendary"]) pl = pl.filter((p) => !p.tags.includes("legendary"));
  if (!filters["mythical"]) pl = pl.filter((p) => !p.tags.includes("mythical"));
  if (!filters["baby"]) pl = pl.filter((p) => !p.tags.includes("baby"));
  if (!filters["unreleased"]) pl = pl.filter((p) => p.released);
  if (!filters["released"]) pl = pl.filter((p) => !p.released);
  if (!filters["g1"]) pl = pl.filter((p) => p.gen !== 1);
  if (!filters["g2"]) pl = pl.filter((p) => p.gen !== 2);
  if (!filters["g3"]) pl = pl.filter((p) => p.gen !== 3);
  if (!filters["g4"]) pl = pl.filter((p) => p.gen !== 4);
  if (!filters["g5"]) pl = pl.filter((p) => p.gen !== 5);
  if (!filters["g6"]) pl = pl.filter((p) => p.gen !== 6);
  if (!filters["g7"]) pl = pl.filter((p) => p.gen !== 7);
  if (!filters["g8"]) pl = pl.filter((p) => p.gen !== 8);
  return pl;
}

export default function TagFilters() {
  return (
    <Tooltip title="Filter by criteria" placement="right" arrow>
      <div className="PokemonFilters">
        {filters &&
          Object.keys(filters).map((f) => (
            <Chip
              label={f}
              clickable
              color="primary"
              deleteIcon={<DoneIcon />}
              color={filters[f] ? "primary" : ""}
              onClick={() => {
                filters[f] = !filters[f];
              }}
            />
          ))}
      </div>
    </Tooltip>
  );
}
