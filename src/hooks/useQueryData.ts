import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useQueryData = (key: QueryKey) => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(key);
}