import React from "react";
import FormModal from "./FormModal";
import "./ItemForm.css";

const ItemForm = (props) => {
  return (
    <FormModal
      {...props}
      entity={props.entity}
      apiEndpoint="/api/items"
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "category", label: "Category", type: "select" },
      ]}
    />
  );
};

export default ItemForm;
