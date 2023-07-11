import React, { useState } from "react";

const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [currentField, setCurrentField] = useState({});
  const [formPreview, setFormPreview] = useState(false);

  const handleAddField = () => {
    setFormFields([...formFields, currentField]);
    setCurrentField({});
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCurrentField((prevField) => ({ ...prevField, [name]: value }));
  };

  const handleFormPreview = () => {
    setFormPreview(!formPreview);
  };

  const renderFieldOptions = () => {
    return (
      <div>
        <label htmlFor="fieldType">Field Type:</label>
        <select name="fieldType" onChange={handleFieldChange}>
          <option value="">Select Field Type</option>
          <option value="text">Text Input</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio Button</option>
        </select>
      </div>
    );
  };

  const renderFormPreview = () => {
    return (
      <div>
        <h3>Form Preview</h3>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            {field.fieldType === "text" && <input type="text" />}
            {field.fieldType === "dropdown" && (
              <select>
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex}>{option}</option>
                ))}
              </select>
            )}
            {field.fieldType === "checkbox" && <input type="checkbox" />}
            {field.fieldType === "radio" && <input type="radio" />}
            <button onClick={() => handleRemoveField(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleFormPreview}>Close Preview</button>
      </div>
    );
  };

  return (
    <div>
      <h2>Form Generator</h2>
      {!formPreview && (
        <div>
          <h3>Add Field</h3>
          {renderFieldOptions()}
          {currentField.fieldType && (
            <div>
              <label htmlFor="label">Label:</label>
              <input
                type="text"
                name="label"
                value={currentField.label || ""}
                onChange={handleFieldChange}
              />
              {currentField.fieldType === "dropdown" && (
                <div>
                  <label htmlFor="options">Options:</label>
                  <input
                    type="text"
                    name="options"
                    value={currentField.options || ""}
                    onChange={handleFieldChange}
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}
              <button onClick={handleAddField}>Add Field</button>
            </div>
          )}
          {formFields.length > 0 && (
            <div>
              <h3>Form Fields</h3>
              {formFields.map((field, index) => (
                <div key={index}>
                  <span>{field.label}</span>
                  <button onClick={() => handleRemoveField(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={handleFormPreview}>Preview Form</button>
            </div>
          )}
        </div>
      )}
      {formPreview && renderFormPreview()}
    </div>
  );
};

export default FormGenerator;
