import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_PATH } from 'utils';
import SearchBox from './SearchBox';
import UnsplashImage from './UnsplashImage';

function UnsplashImages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      axios.get(`${API_PATH}image?search=${searchQuery}`).then(response => {
        const { results } = response.data;
        setImages(results);
      });
    }
    return () => {
      setImages([]);
    };
  }, [searchQuery]);

  return (
    <div>
      <div className='block pb-4'>
        <SearchBox getSearchQuery={q => setSearchQuery(q)} />
      </div>
      <div className='grid grid-flow-col grid-cols-3 grid-rows-3 gap-6'>
        {images.length > 0 ? images.map(image => (
          <UnsplashImage key={image.id} imageData={image} />
        )): <p className='px-2 text-gray-500 italic'>Enter a query</p>}
      </div>
    </div>
  );
}

export default UnsplashImages;
