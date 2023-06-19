export const setCategory = (index) => (
    {
        type: 'SET_CATEGORY',
        payload: index
    }
)

export const setAllCategory = (items) => (
    {
        type: 'SET_ALL_CATEGORY',
        payload: items
    }
)

export const setSort = (items) => (
    {
        type: 'SET_SORT',
        payload: items
    }
)

export const setOrderBy = (items) => (
    {
        type: 'SET_ORDER_BY',
        payload: items
    }
)