import axios, { AxiosError, AxiosRequestConfig } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { CreateProfile, Profile, SelectorData, Technology } from "../../types";
import { SearchTechnologiesResponse } from "./types";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";

export const apiUrls = {
  specialist: (id: number) => `/admin/generator/specialist/${id}/change/`,
};

const http = applyCaseMiddleware(
  axios.create({ headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }, baseURL: "/api" })
);

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    {
      status: number | undefined;
      message: any;
    }
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await http({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          message: err.message,
        },
      };
    }
  };

export default class ApiService {
  static searchTechnologies(word: string): Promise<SearchTechnologiesResponse> {
    return http.get(`/technology/?search=${word}`);
  }
}

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, number>({
      query: (id) => ({ url: `/profile/${id}/`, method: "GET" }),
    }),
    getProfiles: builder.query<SelectorData[], void>({
      query: () => ({ url: `/profile/`, method: "GET" }),
      transformResponse: (res: SelectorData[]) => res.sort((a: SelectorData, b: SelectorData) => a.id - b.id),
    }),
    createProfile: builder.mutation<CreateProfile, CreateProfile>({
      query: (data) => {
        return { url: `/profile/`, method: "POST", data };
      },
    }),
    updateProfile: builder.mutation<CreateProfile, { data: CreateProfile; id: number }>({
      query: ({ id, data }) => {
        return { url: `/profile/${id}/`, method: "PUT", data };
      },
    }),
    searchTechnologies: builder.query<{ value: string; label: string }[], string>({
      query: (word) => {
        return { url: `/technology/?search=${word}`, method: "GET" };
      },
      transformResponse: (res: Technology[]) => res.map((el) => ({ value: el.name, label: el.name })),
    }),
  }),
});

export const { useGetProfileQuery, useGetProfilesQuery, useCreateProfileMutation, useUpdateProfileMutation, useSearchTechnologiesQuery } = appApi;
