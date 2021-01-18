import StoredImages from 'components/StoredImages';
import UnsplashImages from 'components/UnsplashImages';

function App() {
  return (
    <div className='container mx-auto px-4 flex flex-col'>
      <header className='py-4'>
        <h2 className='text-2xl font-serif text-gray-800'>Inspiration Artboard</h2>
      </header>
      <hr />

      <h3 className='pt-4 font-serif text-lg text-gray-600'>Local Images</h3>
      <hr />
      <StoredImages />

      <h3 className='pt-4 font-serif text-lg text-gray-600'>Unsplash Images</h3>
      <hr />
      <UnsplashImages />

      <p className='text-xs text-gray-600 pt-5 pb-2'>Copyright &copy; Seun Soetan. 2021</p>
    </div>
  );
}

export default App;
