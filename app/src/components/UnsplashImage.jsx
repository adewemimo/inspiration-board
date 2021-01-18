import axios from 'axios';
import { useState } from 'react';
import { API_PATH } from 'utils';

function UnsplashImage({ imageData }) {
  const [disableSave, setDisableSave] = useState(false);

  const { alt_description, urls, links, user } = imageData;

  const saveForLater = () => {
    axios
      .post(`${API_PATH}store`, { id: imageData.id, thumbnail: urls.small })
      .then(response => {
        if (response.status < 300) {
          setDisableSave(true);
        } else {
          console.log('An error occurred while saving for later');
        }
      })
      .catch(err => console.log('err', err));
  };

  return (
    <div className="flex flex-col bg-gray-600 shadow-lg rounded-lg">
      <img
        src={urls.small}
        alt={alt_description}
        className="h-48 object-cover w-100 rounded-lg"
      />
      <div className='inline-flex my-2 mx-1'>
        <img
          src={user.profile_image.small}
          alt={user.bio}
          className="rounded shadow"
        />
        <a
          href={user.links.html}
          target="_blank"
          rel="noreferrer"
          className="px-4 text-gray-300 hover:text-gray-100 py-1"
        >
          {user.name}
        </a>
      </div>
      <div className="inline-block mx-1 my-2">
        <a
          href={links.download}
          target="_blank"
          rel="noreferrer"
          download
          className="text-blue-200 hover:text-blue-400"
        >
          Download
        </a>
        <button
          type="button"
          onClick={saveForLater}
          disabled={disableSave}
          className="ml-4 px-4 h-10 rounded focus:outline-none focus:shadow-outline inline-flex p-2 shadow text-gray-300 bg-gray-700 hover:bg-gray-900"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
}

export default UnsplashImage;
