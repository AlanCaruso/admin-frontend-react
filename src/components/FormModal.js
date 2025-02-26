import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const FormModal = ({
  itemIdToEdit,
  entity,
  fields,
  isNew,
  showModal,
  setShowModal,
  apiEndpoint,
  onItemCreated,
}) => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);

  const API = "http://192.168.1.10:5000";

  useEffect(() => {
    if (!isNew && itemIdToEdit) {
      axios
        .get(`${API}${apiEndpoint}/${itemIdToEdit}`)
        .then((response) => {
          setFormData({
            ...response.data,
            category: response.data.category ? response.data.category._id : "",
          });
        })
        .catch((error) => console.log(`"Error fetching ${entity}:"`, error));
    }
    if (entity === "item") {
      axios
        .get(`${API}/api/categories`)
        .then((response) => {
          setCategories(response.data);
        })

        .catch((error) => console.log("Error fetching categories:", error));
    }
  }, [isNew, itemIdToEdit, apiEndpoint, entity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isNew) {
        await axios.post(`${API}${apiEndpoint}`, formData);
      } else {
        await axios.put(`${API}${apiEndpoint}/${itemIdToEdit}`, formData);
      }
      onItemCreated();
      setShowModal(false);
    } catch (error) {
      console.error("Error submmiting form:", error);
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
        <h2>{isNew ? `Add New ${entity}` : `Edit ${entity}`}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name}>
              {field.label}:
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select a {field.label.toLowerCase()}</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
          <br />
          <button className="btn update-item" type="submit">
            {isNew ? `Add ${entity}` : `Update ${entity}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
