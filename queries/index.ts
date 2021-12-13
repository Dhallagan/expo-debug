import { useMutation, useQuery } from "react-query";
import { request, gql } from "graphql-request";

const endpoint = "https://test.thatclass.co/api/"

function useClasses() {
    return useQuery("classes", async () => {
      alert("hit")
      const {
        classes: { data },
      } = await request(
        endpoint,
        gql`
        query {
            classes {
              pageInfo {
                startCursor
                endCursor
              }
              totalCount
              edges {
                node {
                  id
                  title
                  cover {
                    url
                  }
                }
              }
            }
          }
        `
      );
      alert(data)
      return data;
    });
  }

  function useSignIn(username, password) {
    return useMutation("signin", async () => {
      const {
        signin: { data },
      } = await request(
        endpoint,
        gql`
          mutation signIn {
            signIn(input: {username: "` + username + `", password: "` + password + `", accessToken: true}) {
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
        `
      );
      alert(data)
      return data;
    });
  }

  export { useClasses, useSignIn }