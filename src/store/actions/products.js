export const setProducts = (items) => ({type: 'SET_PRODUCTS', payload: items})
export const setProductsByCompany = (items) => ({type: 'SET_PRODUCTS_BY_COMPANY', payload: items})
export const createProduct = (items) => ({type: 'CREATE_PRODUCTS', payload: items})
export const deleteProducts = (items) => ({type: 'REMOVE_PRODUCT', payload: items})
export const clearMyProducts = (items) => ({type: 'CLEAR_MY_PRODUCTS', payload: items})
export const updateProducts = (items) => ({type: 'UPDATE_PRODUCT', payload: items})
export const setLoaded = (val) => ({type: 'SET_LOADED', payload: val})

