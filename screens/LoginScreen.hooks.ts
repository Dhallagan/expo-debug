import * as React from "react";
import { useMutation } from 'urql';


const loginMutation = `
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
    const [state, setState] = React.useState(initialState);

    const handleSubmit = React.useCallback((event: React.FormEvent): void => {
          event.preventDefault();

          // Execute Mutation
        },
        [null, state.input]
    )
    // const [state, executeMutation] = useMutation(loginMutation);

    return [{ ...state }, handleSubmit];
}