// hooks.ts
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
// import { data } from "./data";
// import { validateUser } from "./validation";
// import { IClient } from "../types/devs";
import { data } from "../lib/data";
import { IClient } from "../types/client";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: IClient) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo: IClient) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as IClient[]
      );
    },
  });
}

export function useGetUsers() {
  return useQuery<IClient[]>({
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
    mutationFn: async (user: IClient) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo: IClient) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          prevUsers?.map((prevUser: IClient) =>
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
          prevUsers?.filter((user: IClient) => user.email !== userId)
      );
    },
  });
}
