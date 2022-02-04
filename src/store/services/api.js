import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const baseEndpoint = "https://mayfair-backend.com"; // http://ec2-3-239-84-10.compute-1.amazonaws.com:9000

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, withCredentials, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        withCredentials,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: baseEndpoint,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/users/login",
          method: "post",
          data: credentials,
          withCredentials: true,
        };
      },
    }),
    register: builder.mutation({
      query: (credentials) => {
        return {
          url: "/users/register",
          method: "post",
          data: credentials,
          withCredentials: true,
        };
      },
    }),
    checkAuthed: builder.query({
      query: () => {
        return { method: "get", url: "/authed-user", withCredentials: true };
      },
    }),
    vehicles: builder.query({
      query: () => {
        return { method: "get", url: "/vehicles", withCredentials: true };
      },
    }),
    vehicle: builder.query({
      query: (id) => {
        return { method: "get", url: `/vehicles/${id}`, withCredentials: true };
      },
    }),
    vehicleUploads: builder.mutation({
      query: (fd) => {
        return {
          url: "/vehicles/upload",
          method: "post",
          data: fd,
          withCredentials: true,
        };
      },
    }),
    vehicleUpdate: builder.mutation({
      query: (update) => {
        return {
          url: `/vehicles/${update.vehicleId}`,
          method: "patch",
          data: update.fd,
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
      async onQueryStarted({ vehicleId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedVehicle } = await queryFulfilled;
          const newUpdate = api.util.updateQueryData(
            "vehicle",
            vehicleId,
            (draft) => {
              Object.assign(draft, updatedVehicle);
            }
          );

          dispatch(newUpdate);
        } catch {}
      },
    }),
    pic: builder.query({
      query: (id) => {
        return {
          method: "get",
          url: `/vehicles/pics/${id}`,
          withCredentials: true,
        };
      },
    }),
    deletePic: builder.mutation({
      query: (data) => {
        return {
          method: "delete",
          url: `/vehicles/pics/${data.picId}`,
          withCredentials: true,
          data: { vehicleId: data.vehicleId },
        };
      },
    }),
    uploadAsset: builder.mutation({
      query: (asset) => {
        return {
          url: "/assets/upload",
          method: "post",
          data: asset,
          withCredentials: true,
        };
      },
    }),
    assets: builder.query({
      query: () => {
        return {
          method: "get",
          url: `/assets`,
          withCredentials: true,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useCheckAuthedQuery,
  useVehiclesQuery,
  useVehicleQuery,
  useVehicleUploadsMutation,
  useVehicleUpdateMutation,
  usePicQuery,
  useDeletePicMutation,
  useUploadAssetMutation,
  useAssetsQuery,
} = api;
