import { useState } from 'react';

export default function SortingFields({ data, onSorting }) {
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSetsortingOrder] = useState('asc');
  const columns = data[0] && Object.keys(data[0]);

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';
    setSortingField(field);
    setSetsortingOrder(order);
    onSorting(field, order);
  };
  return (
    <div className='PokemonSort'>
      {data[0] &&
        columns.map((heading) => (
          <strong onClick={() => onSortingChange(heading)} key={heading}>
            {heading}
            {sortingField &&
              sortingField === heading &&
              (sortingOrder === 'asc' ? '<' : '>')}
          </strong>
        ))}
    </div>
  );
}
