

export const getPropertyById = (state, id) => {
    const propertyInfo = state.propertyData.propertyInfo;
    return propertyInfo.find(item => item.id === id) || {};
  };

export const getSelectedPropertyById = (state, id) => {
    const propertyInfo = state.fetchData.propertyData;
    return propertyInfo.find(item => item.id === id) || {};
  };
  
export const adminGetSelectedPropertyById = (state, id) => {
    const adminPropertyInfo = state.adminFetchData.propertyData;
    return adminPropertyInfo.find(item => item.id === id) || {};
  };
  