import PokemonCard from "./PokemonCard";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function PokeTable({ data, select }) {
  return (
    <div className="PokeTable">
      {!data[0] && (
        <div className="PokeTableLoading">
          <CircularProgress />
        </div>
      )}
      {data[0] && data.map((row) => <PokemonCard pokemon={row} key={row.name} select={select} />)}
    </div>
  );
}
