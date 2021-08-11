import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

const PokemonFilters = styled.div`
  border-top: 1px solid rgb(224 224 224 / 70%);
  padding-top: 10px;
  & > div {
    margin: 0 0.2em;
  }
`;

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

export function pokeFilter(pl) {
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

export default function TagFilters({ setFilters }) {
  const handleOnChange = (value) => {
    filters[value] = !filters[value];
    setFilters(filters);
  };
  return (
    <Tooltip title="Filter by criteria" placement="right" arrow>
      <PokemonFilters>
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
      </PokemonFilters>
    </Tooltip>
  );
}
