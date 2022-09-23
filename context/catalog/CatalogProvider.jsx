import { useEffect, useReducer } from "react";
import { useFiles } from "../../hooks/useFiles";
import { CatalogContext } from "./CatalogContext";
import { CatalogReducer } from "./CatalogReducer";

export const CATALOG_INITIAL_STATE = {
    catalogs: [],
    catalogsSearch: [],
};

export const CatalogProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CatalogReducer, CATALOG_INITIAL_STATE);

    const { files, loading } = useFiles();

    const loadCatalog = (catalogs) => {
        dispatch({ type: "[CATALOG] - LOAD_CATALOG", payload: catalogs });
    };

    const addCatalog = (catalog) => {
        dispatch({ type: "[CATALOG] - ADD_CATALOG", payload: catalog });
    };

    const updateCatalog = (id, catalog) => {
        console.log(id, catalog);
        dispatch({
            type: "[CATALOG] - UPDATE_CATALOG", payload: {
                id,
                catalog
            }
        });
    };

    const deleteCatalog = (id) => {
        dispatch({ type: "[CATALOG] - DELETE_CATALOG", payload: id });
    };

    const searchCatalog = (search) => {
        console.log(search);
        dispatch({ type: "[CATALOG] - SEARCH_CATALOG", payload: search });
    };

    useEffect(() => {
        !loading && loadCatalog(files);
    }, [loading, files]);


    return (
        <CatalogContext.Provider
            value={{
                ...state,
                loadCatalog,
                addCatalog,
                updateCatalog,
                deleteCatalog,
                searchCatalog
            }}
        >
            {children}
        </CatalogContext.Provider>
    );
};
