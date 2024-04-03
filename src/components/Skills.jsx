// components/Skills.jsx
import { useSelector, useDispatch } from "react-redux";
import { changeSearchField } from "../slices/skills.js";

export default function Skills() {
  const { items, isLoading, error, search } = useSelector(
    (state) => state.skills
  );
  const dispatch = useDispatch();

  const handleSearch = (evt) => {
    const { value } = evt.target;
    dispatch(changeSearchField({ search: value }));
  };

  const hasQuery = search.trim() !== "";
  const hasNoResults = !isLoading && !error && hasQuery && items.length === 0;
  return (
    <>
      <div>
        <input type='search' value={search} onChange={handleSearch} />
      </div>
      {!hasQuery && <div>Type something to search</div>}
      {hasQuery && isLoading && <div>searching...</div>}
      {error && <div>Error occurred: {error}</div>}
      {hasNoResults && <div>No results found. try something else</div>}

      {!error && !isLoading && (
        <ul>
          {items.map((o) => (
            <li key={o.id}>{o.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
