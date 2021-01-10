import { ApolloClient, split, createHttpLink, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';



export function createClient(endpoint: string) {

    const websocketLink = new WebSocketLink({
      uri: endpoint.replace('https://', 'wss://'),
      options: {
        reconnect: true
      }
    });

    const httpLink = createHttpLink({
        uri: endpoint,
    });

    return new ApolloClient({
        link: split(({query}) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        }, websocketLink as any, httpLink),
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

export async function isValidEndpoint(endpoint: string): Promise<boolean> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: "query info {__schema {types {name}}}"
        }),
    });

    if (response.status !== 200) {
        return false;
    }

    const content = await response.json();

    if (content["data"] && content["data"]["__schema"] && content["data"]["__schema"]["types"]) {
        return true;
    } else {
        return false;
    }
}
