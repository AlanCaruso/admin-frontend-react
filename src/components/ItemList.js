import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/itemService';
import ItemForm from './ItemForm';
import "../components/style.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [itemIdToEdit, setItemIdToEdit] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    getItems().then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  };

  const handleDelete = (id) => {
    deleteItem(id).then(() => fetchItems())
      .catch(error => console.error('Error deleting item:', error));
  };

  const handleAddNewItem = () => {
    setIsNew(true);
    setItemIdToEdit(null);
    setShowModal(true);
  };

  const handleEditItem = (id) => {
    setIsNew(false);
    setItemIdToEdit(id);
    setShowModal(true);
  };

  const handleItemUpdated = () => {
    fetchItems();
    setShowModal(false);
  };

  return (
    <div>
      <div className="add-item-container"> 
        <h1>Items</h1>
        <button onClick={handleAddNewItem}>Add Item</button>
      </div>
      <div className="items-container">
        <ul>
          {items.map(item => (
            <li key={item._id}>
              <span onClick={() => handleEditItem(item._id)}>{item.name}</span>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
        {showModal && (
          <ItemForm 
            isNew={isNew} 
            showModal={showModal} 
            setShowModal={setShowModal} 
            itemIdToEdit={itemIdToEdit} 
            onItemUpdated={handleItemUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default ItemList;
