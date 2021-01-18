const PROJECT_ID = 'wemo-image-repository';
const LOCATION = 'us-central1';

// export const API_PATH = `http://localhost:5001/${PROJECT_ID}/${LOCATION}/api/`

export const API_PATH = `https://${LOCATION}-${PROJECT_ID}.cloudfunctions.net/api/`;
