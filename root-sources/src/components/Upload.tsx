import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Upload: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = Array.from(new Int8Array(arrayBuffer));
        
        const payload = {
          title,
          description,
          category,
          name: file.name,
          data: byteArray
        };

        const storedToken = Cookies.get('token');

        await axios.post('https://fl-refs.onrender.com/uploads', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          }
        });

        setUploadSuccess(true);
        setError('');
      };

      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
        setUploadSuccess(false);
      };

    } catch (error) {
      setError('Failed to upload. Please check your inputs and try again.');
      setUploadSuccess(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Enviar nova imagem</h2>
      <h5 className="text-1xl italic mb-5">Apenas para autenticados.</h5>
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Descrição:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Categoria:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Arquivo:</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Upload</button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {uploadSuccess && <p className="mt-4 text-green-500">Upload successful!</p>}
    </div>
  );
};

export default Upload;