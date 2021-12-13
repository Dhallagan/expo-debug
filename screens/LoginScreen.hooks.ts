import * as React from "react";
import { useMutation } from 'urql';

type SignInInput = {
  username?: string | null | undefined;
  password?: string | null | undefined;
};

const LOGIN_MUTATION = `
  mutation LoginMutation($input: SignInInput!) {
    signIn(input: $input) {
      user {
        id
        email
        username
        firstName
        lastName
        picture {
          url
        }
        timeZone
        locale
      }
    }
  }
`;

const initialState = {
    input: {
      username: "",
      password: "",
    },
    errors: {},
    loading: false,
  };

  export function useSignIn(props) {
      const { data, loading, error } = useMutation(LOGIN_MUTATION);

      [null, state.input]
    )
    // const [state, executeMutation] = useMutation(loginMutation);

    return [{ ...state }, handleSubmit];
}