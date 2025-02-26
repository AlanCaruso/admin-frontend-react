import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/itemService";
import axios from "axios";
import ItemForm from "./ItemForm";
import "../components/style.css";

const ItemList = ({ isLoggedIn }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [itemIdToEdit, setItemIdToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const API_URL = "http://192.168.1.10:5000/api/categories";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log("error fetching categories", error));
  }, []);

  useEffect(() => {
    fetchItems();
  }, [showModal]);

  useEffect(() => {
    setFilteredItems(
      items
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((item) =>
          selectedCategory
            ? item.category?._id === selectedCategory ||
              item.category === selectedCategory
            : true
        )
    );
  }, [searchTerm, selectedCategory, items]);

  useEffect(() => {
    console.log("Filtered items updated:", filteredItems);
  }, [filteredItems]);

  const fetchItems = () => {
    getItems()
      .then((response) => {
        setItems(response.data);
      })

      .catch((error) => console.error("Error fetching items:", error));
  };

  const handleDelete = (id) => {
    deleteItem(id)
      .then(() => fetchItems())
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleAddNewItem = () => {
    setIsNew(true);
    setShowModal(true);
  };

  const handleEditItem = (id) => {
    setIsNew(false);
    setItemIdToEdit(id);
    setShowModal(true);
  };

  return (
    <div className="items-container">
      <div className="search-filters">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
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
          {filteredItems.map((item) => (
            <li key={item._id} item={item} className="item">
              <div className="item-content">
                <span>{item.name}</span>
                <p className="item-category">
                  {item.category ? item.category.name : "No category"}
                </p>
              </div>
              {isLoggedIn && (
                <div className="item-actions">
                  <button
                    className="btn edit-item"
                    onClick={() => handleEditItem(item._id)}
                  >
                    <i className="far fa-edit"></i>
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
            entity="item"
            onItemCreated={() =>
              console.log(`${isNew ? "Created" : "Updated"} item`)
            }
          />
        )}
      </div>
    </div>
  );
};

export default ItemList;
