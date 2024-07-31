import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServerUrl from '../ServerUrl';

interface Image {
  id: number;
  title: string;
  description: string;
  category: string;
  name: string;
  originalUrl: string;
  thumbnailUrl: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [term, setTerm] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchImages();
  }, [page, term]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${ServerUrl.ROOT_URL}/images`, {
        params: {
          page: page - 1, // Backend usually expects zero-indexed page numbers
          num_items: 10, // Number of items per page, adjust as necessary
          term: term
        }
      });

      setImages(response.data); // Assuming the response contains a list of items
      setError('');
    } catch (error) {
      setError('Failed to fetch images.');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchImages();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h2 className="text-2xl font-bold mb-5">Imagens</h2>
      <form onSubmit={handleSearch} className="mb-5">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Buscar por termo:</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Search</button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map(image => (
            <div key={image.id} className="border p-2 rounded shadow">
              <img src={image.thumbnailUrl} alt={image.title} className="w-full h-48 object-cover mb-2 rounded" />
              <p className="text-center font-semibold">{image.title}</p>
              <p className="text-center">{image.description}</p>
              <a
                href={image.originalUrl}
                download
                className="block bg-blue-500 text-white text-center py-2 mt-2 rounded"
              >
                Download Original
              </a>
            </div>
          ))
        ) : (
          !error && <p className="text-center">Nenhuma imagem foi encontrada.</p>
        )}
      </div>
      <div className="mt-5 flex justify-between">
        {page > 1 && (
          <button onClick={() => setPage(page - 1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Previous</button>
        )}
        {images.length === 10 && (
          <button onClick={() => setPage(page + 1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Next</button>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;