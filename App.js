import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import ImageDetail from './components/ImageDetail';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=ZGR__m4wL7IHrVfC2AUAM7OAS5Osx7470Znt4LgekbM`
      );
      const data = await response.json();

      setImages(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="ui container" style={{ marginTop: '10px' }}>
              <h1>Image Search App</h1>
              <SearchBar onSearch={handleSearch} />
              {loading ? <p>Loading...</p> : <ImageList images={images} />}
              {images.length === 0 && !loading && <p>No images found.</p>}
            </div>
          }
        />
        <Route path="/images/:id" element={<ImageDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
