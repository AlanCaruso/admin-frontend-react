import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/itemService";
import ItemForm from "./ItemForm";
import "../components/style.css";

const ItemList = ({ isLoggedIn }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [itemIdToEdit, setItemIdToEdit] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    getItems()
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  const handleDelete = (id) => {
    deleteItem(id)
      .then(() => fetchItems())
      .catch((error) => console.error("Error deleting item:", error));
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
    <div className="items-container">
      <div className="add-item-container">
        <h1>Items</h1>
        {isLoggedIn && (
          <button className="btn add-item" onClick={handleAddNewItem}>
            {" "}
            <i className="fas fa-plus"></i> Add Item
          </button>
        )}
      </div>
      <div className="items-list-container">
        <ul className="items-list">
          {items.map((item) => (
            <li key={item._id} className="item">
              <div className="item-content">
                <span>{item.name}</span>
                <p className="item-category">{item.category}</p>
              </div>
              {isLoggedIn && (
                <div className="item-actions">
                  <button
                    className="btn edit-item"
                    onClick={() => handleEditItem(item._id)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn delete-item"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              )}
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
