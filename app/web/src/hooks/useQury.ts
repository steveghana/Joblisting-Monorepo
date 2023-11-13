// hooks.ts
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
// import { data } from "./data";
// import { validateUser } from "./validation";
import { IDev } from "../types/client";
import { data } from "../lib/data";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: IDev) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo: IDev) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as IDev[]
      );
    },
  });
}

export function useGetUsers() {
  return useQuery<IDev[]>({
    queryKey: ["users"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve(data);
    },
    refetchOnWindowFocus: false,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: IDev) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo: IDev) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          prevUsers?.map((prevUser: IDev) =>
            prevUser.email === newUserInfo.email ? newUserInfo : prevUser
          )
      );
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          prevUsers?.filter((user: IDev) => user.email !== userId)
      );
    },
  });
}
