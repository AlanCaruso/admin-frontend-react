import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`/api/items/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error('Error fetching item:', error));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default ItemDetail;
