import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const taxAdaptor=createEntityAdapter({})

const initialState=taxAdaptor.initialState()


export const allowancesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTax: builder.query({
            query: () => '/tax',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadTaxes = responseData.map(tax => {
                    tax.id = tax._id
                    return tax
                });
                return taxAdaptor.setAll(initialState, loadedTaxes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Tax Type', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Tax Type', id }))
                    ]
                } else return [{ type: 'Tax Type', id: 'LIST' }]
            }
        }),
        Taxes
    }),
})





export const {
    useGetTaxesQuery,
    useAddNewTaxesMutation,
    useUpdateTaxesMutation,
    useDeleteTaxesMutation,
} = taxesApiSlice

// returns the query result object
export const selectTaxesResult = allowancesApiSlice.endpoints.getAllowances.select()

// creates memoized selector
const selectAllowancesData = createSelector(
    selectAllowancesResult,
    allowancesResult => allowancesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTaxes,
    selectById: selectTaxesById,
    selectIds: selectTaxesIds
    // Pass in a selector that returns the allowances slice of state
} = taxAdapter.getSelectors(state => selectTaxesData(state) ?? initialState)