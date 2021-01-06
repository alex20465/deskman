import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";

const { REACT_APP_BACKEND_URI = `http://localhost:3000` } = process.env;

const link = createHttpLink({
    uri: `${REACT_APP_BACKEND_URI}/graphql`,
});

export function createClient(link: ApolloLink) {
    return new ApolloClient({
        link,
        defaultOptions: {
            mutate: {
                errorPolicy: "ignore",
            },
            query: {
                errorPolicy: "ignore",
            },
        },
        cache: new InMemoryCache({}),

    });
}

export const client = createClient(
    ApolloLink.from([ link ])
);
