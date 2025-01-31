import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ItemForm.css";

const ItemForm = ({
  isNew,
  showModal,
  setShowModal,
  itemIdToEdit,
  onItemUpdated,
}) => {
  const API = "http://192.168.1.10:5000";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (!isNew && itemIdToEdit) {
      axios
        .get(`${API}/api/items/${itemIdToEdit}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error("Error fetching item:", error));
    }
  }, [isNew, itemIdToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await axios.post(`${API}/api/items`, formData);
      } else {
        await axios.put(`${API}/api/items/${itemIdToEdit}`, formData);
      }
      onItemUpdated(); // Notificar a la lista de ítems que se ha actualizado un ítem
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`modal ${showModal ? "show" : "hide"}`}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowModal(false)}>
          &times;
        </span>
        <h2>{isNew ? "Add New Item" : "Edit Item"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>
          <br />
          <button className="btn update-item" type="submit">
            {isNew ? "Add Item" : "Update Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
