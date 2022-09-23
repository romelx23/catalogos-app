export const CatalogReducer = (state, action) => {
  switch (action.type) {
    case "[CATALOG] - LOAD_CATALOG":
      return {
        ...state,
        catalogs: action.payload,
      };
    case "[CATALOG] - ADD_CATALOG":
      return {
        ...state,
        catalogs: [...state.catalogs, action.payload],
      };
    case "[CATALOG] - UPDATE_CATALOG":
      return {
        ...state,
        catalogs: state.catalogs.map((catalog) =>
          catalog.id === action.payload.id ? action.payload.catalog : catalog
        ),
      };
    case "[CATALOG] - DELETE_CATALOG":
      return {
        ...state,
        catalogs: state.catalogs.filter(
          (catalog) => catalog.id !== action.payload
        ),
      };
    case "[CATALOG] - SEARCH_CATALOG":
      return {
        ...state,
        catalogsSearch: state.catalogs.filter((catalog) =>
          catalog.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    default:
      return state;
  }
};
