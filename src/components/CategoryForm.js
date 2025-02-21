import React from "react";
import FormModal from "./FormModal";
import "./ItemForm.css";

const CategoryForm = (props) => {
  return (
    <FormModal
      {...props}
      entity={props.entity}
      apiEndpoint="/api/categories"
      fields={[{ name: "name", label: "Category Name", type: "text" }]}
    />
  );
};

export default CategoryForm;
