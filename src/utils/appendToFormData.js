/**
 *
 * @param {FormData} formData
 * @param {*} data
 * @param {String=} parentKey
 */
export default function appendToFormData(formData, data, parentKey) {

    const handleNestedObject = (nestedData, nestedParentKey) => {
      Object.keys(nestedData).forEach((key) => {
        const nestedKey = nestedParentKey ? `${nestedParentKey}[${key}]` : key;
        appendToFormData(formData, nestedData[key], nestedKey);
      });
    };
  
    const handleNestedArray = (nestedData, nestedParentKey) => {
      nestedData.forEach((item, index) => {
        const nestedKey = `${nestedParentKey}[${index}]`;
        if (Array.isArray(item)) {
          handleNestedArray(item, nestedKey);
        } else if (typeof item === 'object' && item !== null && !(item instanceof Date)) {
          handleNestedObject(item, nestedKey);
        } else {
          appendToFormData(formData, item, nestedKey);
        }
      });
    };
  
    if (data instanceof File) {
      formData.append(parentKey, data);
    } else if (data instanceof FileList) {
      // Handle file inputs
      data.forEach((value) => {
        formData.append(parentKey, value);
      });
    } else if (Array.isArray(data)) {
      // Handle arrays
      data.forEach((value, i) => {
        const key = parentKey ? `${parentKey}[${i}]` : `[${i}]`;
        if (value instanceof File) {
          formData.append(parentKey, value);
        } else if (Array.isArray(value)) {
          handleNestedArray(value, key);
        } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
          handleNestedObject(value, key);
        } else {
          appendToFormData(formData, value, key);
        }
      });
    } else if (typeof data === 'object' && data !== null && !(data instanceof Date)) {
      // Handle objects
      handleNestedObject(data, parentKey);
    } else {
      // Handle all other data types
      formData.append(parentKey, data);
    }

  }