

export const getPropertyById = (state, id) => {
    const propertyInfo = state.propertyData.propertyInfo;
    return propertyInfo.find(item => item.id === id) || {};
  };
  