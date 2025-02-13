import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.1.10:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log("error fetching categories", error));
  });
  return (
    <div className="about-page">
      {/* Create New Category button in production */}
      {/* {isLoggedIn && (
        <button className="btn add-item">
          {" "}
          <i className="fas fa-plus"></i> Add New Category
        </button>
      )} */}
      <h2>Available Categories:</h2>
      {categories.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
    </div>
  );
};

export default Categories;
