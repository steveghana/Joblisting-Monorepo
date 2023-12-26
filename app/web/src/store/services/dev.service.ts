import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import _api_url from '../../api/_api_url';
import { IDev } from '../../types/devs';
import { fetchingError, fetchingSuccess, startFetching } from '../slices/dev.slice';
import { DEV_API_KEY } from '../constant';

const authToken = sessionStorage.getItem('authToken');

export const devApi = createApi({
  reducerPath: DEV_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }),
  tagTypes: ['devs'],
  endpoints: (builder) => ({
    updateDev: builder.mutation<IDev, { id: string; data: Partial<IDev> }>({
      query: (body) => ({
        url: `developers/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['devs'],
    }),
    deletDev: builder.mutation<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `developers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['devs'],
    }),
    unassignDev: builder.mutation<number, { id: string; roleId: string }>({
      query: ({ id }) => ({
        url: `developers/unassign/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['devs'],
    }),
    bulkdeletDev: builder.mutation<IDev, { id: string[] }>({
      query: ({ id }) => ({
        url: `developers`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['devs'],
    }),

    addDev: builder.mutation<IDev, IDev>({
      query: (dev) => ({
        url: 'developers',
        method: 'POST',
        body: dev,
      }),
      invalidatesTags: ['devs'],
    }),
    getDevs: builder.query<IDev[], void>({
      query: () => ({
        url: 'developers',
        method: 'GET',
      }),

      transformResponse: (response: IDev[]) => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(startFetching());
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(fetchingSuccess(data));
        } catch (err: any) {
          dispatch(fetchingError(err.message));
          // `onError` side-effect
        }
      },
      providesTags: (result, error) =>
        result ? [...result.map(({ id }) => ({ type: 'devs' as const, id })), 'devs'] : ['devs'],
    }),
    getDev: builder.query<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `developers/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: IDev) => {
        // const dispatch = useTypedDispatch();
        // dispatch({ type: SET_DEV, payload: response });
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
  }),
});

export const {
  useUpdateDevMutation,
  useUnassignDevMutation,
  useAddDevMutation,
  useDeletDevMutation,
  useGetDevQuery,
  useBulkdeletDevMutation,
  useGetDevsQuery,
} = devApi;
