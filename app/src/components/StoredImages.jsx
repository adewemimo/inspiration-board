import axios from 'axios';
import { useEffect, useState } from 'react';

import { API_PATH } from 'utils';

function StoredImages() {
  const [localImages, setLocalImages] = useState([]);

  useEffect(() => {
    axios.get(`${API_PATH}store`).then(response => {
      setLocalImages(response.data);
    });
  }, []);

  const deleteStoredImage = id => {
    axios
      .delete(`${API_PATH}store/${id}`)
      .then(response => {
        if (response.status >= 300) {
          console.log('An error occurred while deleting image');
        }
        const newLocalImages = localImages.filter(image => image.id !== id);
        setLocalImages(newLocalImages);
      })
      .catch(err => console.log('err', err));
  };

  return (
    <div className="my-2 inline-flex flex-wrap">
      {localImages.length > 0 ? (
        localImages.map(image => (
          <div id={image.id} className="flex flex-col w-48 m-2">
            <img src={image.thumbnail} alt="" className='rounded shadow my-2 object-cover h-48 w-48' />
            <button type="button" className='text-sm rounded focus:outline-none focus:shadow-outline py-1 px-2 shadow text-gray-300 bg-gray-700 hover:bg-gray-900' onClick={() => deleteStoredImage(image.id)}>
              Delete stored images
            </button>
          </div>
        ))
      ) : (
        <p className='px-2 text-gray-500 italic'>No stored images</p>
      )}
    </div>
  );
}

export default StoredImages;
