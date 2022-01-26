import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";

export function HomeScreen(props: Props) {
  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={(props) => (
              <Text {...props}>Error loading list items</Text>
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<Loading />}>
              <HomeScreen {...props} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
