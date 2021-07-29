export default function HeaderFilters({ filters, change }) {
    const check = filters;

  return (
    <div className='PokemonFilters'>
      {filters && (Object.keys(check)).map((f)=><label key={f}><input
            type="checkbox"
            value={f}
            checked={check[f]}
            onChange={(e)=>change(e)}
          />{f}</label>)}
    </div>
  );
}
