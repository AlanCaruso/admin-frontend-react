import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";

const CategoriesList = (isLoggedIn) => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const API_URL = "http://192.168.1.10:5000/api/categories";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log("error fetching categories", error));
  }, [categories]);

  const handleAddNewCategory = () => {
    setIsNew(true);
    setShowModal(true);
  };
  const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);

  const handleDelete = (id) => {
    deleteItem(id);
  };

  return (
    <div className="about-page">
      {isLoggedIn && (
        <button className="btn add-item" onClick={handleAddNewCategory}>
          {" "}
          <i className="fas fa-plus"></i> Add New Category
        </button>
      )}
      <h2>Available Categories:</h2>
      <div className="items-list-container">
        <ul className="items-list">
          {categories.map((category) => (
            <li key={categories._id} className="item">
              <div className="item-content">
                <p>{category.name}</p>
              </div>
              {isLoggedIn && (
                <div className="item-actions">
                  <button
                    className="btn delete-item"
                    onClick={() => handleDelete(category._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <CategoryForm
          showModal={showModal}
          setShowModal={setShowModal}
          isNew={isNew}
          entity="category"
          onItemCreated={() =>
            console.log(`${isNew ? "Created" : "Updated"} category`)
          }
        />
      )}
    </div>
  );
};

export default CategoriesList;
