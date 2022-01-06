import { GraphQLClient } from "graphql-request";
import { useTokenStore } from "../store/useTokenStore";

export function QueryClient() {
    const {token} = useTokenStore();

    const endpoint = "https://test.thatclass.co/api/";
    return new GraphQLClient(endpoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

}