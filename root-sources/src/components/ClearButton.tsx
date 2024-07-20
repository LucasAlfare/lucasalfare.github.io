import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ClearButton: React.FC = () => {
  const handleClear = async () => {
    try {
      const response = await axios.delete("https://fl-refs.onrender.com/clear", {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      if (response.status === 200) {
        alert("Todos os itens foram excluídos do banco de dados.");
      }
    } catch (error) {
      console.error("Failed to clear items:", error);
      alert("Failed to clear items. Please try again.");
    }
  };

  return (
    <button
      type="button"
      className="bg-red-500 text-white py-2 rounded"
      onClick={handleClear}
    >
      Limpar tudo
    </button>
  );
};

export default ClearButton;