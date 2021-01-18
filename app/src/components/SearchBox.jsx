import { useState } from 'react';

function SearchBox({ getSearchQuery }) {
  const [query, setQuery] = useState('');

  const handleInputChange = e => setQuery(e.target.value);
  return (
    <div className="py-2">
      <input
        type="text"
        className="border border-transparent shadow px-4 py-2 leading-normal text-gray-700 bg-white rounded-md focus:outline-none focus:shadow-outline w-3/4"
        onChange={handleInputChange}
        onKeyDown={e => e.key === 'Enter' && getSearchQuery(e.target.value)}
      />
      <button className="ml-4 px-4 h-10 rounded focus:outline-none focus:shadow-outline inline-flex p-2 shadow text-white bg-gray-800" onClick={() => getSearchQuery(query)}>
        Search Unsplash
      </button>
    </div>
  );
}

export default SearchBox;
