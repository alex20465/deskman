import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type DiscoveredDevice = {
  __typename?: 'DiscoveredDevice';
  name: Scalars['String'];
  address: Scalars['String'];
};

export type DeskModelItem = {
  __typename?: 'DeskModelItem';
  name: Scalars['String'];
  services: Array<Scalars['String']>;
  cls: Scalars['String'];
};

export type DeskState = {
  __typename?: 'DeskState';
  cm: Scalars['Float'];
  inch: Scalars['Float'];
  value: Scalars['Float'];
  speed: Scalars['Float'];
};

export type Desk = {
  __typename?: 'Desk';
  profile: Scalars['ID'];
  name: Scalars['String'];
  address: Scalars['String'];
  state: DeskState;
};

export type Query = {
  __typename?: 'Query';
  desk: Desk;
  models: Array<DeskModelItem>;
  discoveredDevices: Array<DiscoveredDevice>;
};


export type QueryDeskArgs = {
  profile: Scalars['String'];
};


export type QueryDiscoveredDevicesArgs = {
  model: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  connectDevice: Scalars['Boolean'];
  up: DeskState;
  down: DeskState;
  to: Scalars['Boolean'];
};


export type MutationConnectDeviceArgs = {
  address: Scalars['String'];
  modelName: Scalars['String'];
  profile: Scalars['String'];
};


export type MutationUpArgs = {
  profile: Scalars['String'];
};


export type MutationDownArgs = {
  profile: Scalars['String'];
};


export type MutationToArgs = {
  input: DeskMoverInput;
  profile: Scalars['String'];
};

export type DeskMoverInput = {
  position: Scalars['Float'];
  unit: Length_Units;
};

export enum Length_Units {
  Cm = 'CM',
  Desk = 'DESK',
  Inc = 'INC'
}

export type Subscription = {
  __typename?: 'Subscription';
  stateChange: DeskState;
};


export type SubscriptionStateChangeArgs = {
  profile: Scalars['String'];
};

export type GetDefaultDeskQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultDeskQuery = (
  { __typename?: 'Query' }
  & { desk: (
    { __typename?: 'Desk' }
    & Pick<Desk, 'name' | 'profile'>
    & { state: (
      { __typename?: 'DeskState' }
      & Pick<DeskState, 'cm' | 'inch' | 'value' | 'speed'>
    ) }
  ) }
);

export type MoveUpMutationVariables = Exact<{ [key: string]: never; }>;


export type MoveUpMutation = (
  { __typename?: 'Mutation' }
  & { up: (
    { __typename?: 'DeskState' }
    & Pick<DeskState, 'speed'>
  ) }
);

export type MoveDownMutationVariables = Exact<{ [key: string]: never; }>;


export type MoveDownMutation = (
  { __typename?: 'Mutation' }
  & { down: (
    { __typename?: 'DeskState' }
    & Pick<DeskState, 'speed'>
  ) }
);

export type StateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type StateSubscription = (
  { __typename?: 'Subscription' }
  & { stateChange: (
    { __typename?: 'DeskState' }
    & Pick<DeskState, 'cm' | 'inch' | 'value' | 'speed'>
  ) }
);


export const GetDefaultDeskDocument = gql`
    query getDefaultDesk {
  desk(profile: "default") {
    name
    profile
    state {
      cm
      inch
      value
      speed
    }
  }
}
    `;
export type GetDefaultDeskProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDefaultDeskQuery, GetDefaultDeskQueryVariables>
    } & TChildProps;
export function withGetDefaultDesk<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDefaultDeskQuery,
  GetDefaultDeskQueryVariables,
  GetDefaultDeskProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDefaultDeskQuery, GetDefaultDeskQueryVariables, GetDefaultDeskProps<TChildProps, TDataName>>(GetDefaultDeskDocument, {
      alias: 'getDefaultDesk',
      ...operationOptions
    });
};

/**
 * __useGetDefaultDeskQuery__
 *
 * To run a query within a React component, call `useGetDefaultDeskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDefaultDeskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDefaultDeskQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDefaultDeskQuery(baseOptions?: Apollo.QueryHookOptions<GetDefaultDeskQuery, GetDefaultDeskQueryVariables>) {
        return Apollo.useQuery<GetDefaultDeskQuery, GetDefaultDeskQueryVariables>(GetDefaultDeskDocument, baseOptions);
      }
export function useGetDefaultDeskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDefaultDeskQuery, GetDefaultDeskQueryVariables>) {
          return Apollo.useLazyQuery<GetDefaultDeskQuery, GetDefaultDeskQueryVariables>(GetDefaultDeskDocument, baseOptions);
        }
export type GetDefaultDeskQueryHookResult = ReturnType<typeof useGetDefaultDeskQuery>;
export type GetDefaultDeskLazyQueryHookResult = ReturnType<typeof useGetDefaultDeskLazyQuery>;
export type GetDefaultDeskQueryResult = Apollo.QueryResult<GetDefaultDeskQuery, GetDefaultDeskQueryVariables>;
export const MoveUpDocument = gql`
    mutation moveUp {
  up(profile: "default") {
    speed
  }
}
    `;
export type MoveUpMutationFn = Apollo.MutationFunction<MoveUpMutation, MoveUpMutationVariables>;
export type MoveUpProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<MoveUpMutation, MoveUpMutationVariables>
    } & TChildProps;
export function withMoveUp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MoveUpMutation,
  MoveUpMutationVariables,
  MoveUpProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, MoveUpMutation, MoveUpMutationVariables, MoveUpProps<TChildProps, TDataName>>(MoveUpDocument, {
      alias: 'moveUp',
      ...operationOptions
    });
};

/**
 * __useMoveUpMutation__
 *
 * To run a mutation, you first call `useMoveUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveUpMutation, { data, loading, error }] = useMoveUpMutation({
 *   variables: {
 *   },
 * });
 */
export function useMoveUpMutation(baseOptions?: Apollo.MutationHookOptions<MoveUpMutation, MoveUpMutationVariables>) {
        return Apollo.useMutation<MoveUpMutation, MoveUpMutationVariables>(MoveUpDocument, baseOptions);
      }
export type MoveUpMutationHookResult = ReturnType<typeof useMoveUpMutation>;
export type MoveUpMutationResult = Apollo.MutationResult<MoveUpMutation>;
export type MoveUpMutationOptions = Apollo.BaseMutationOptions<MoveUpMutation, MoveUpMutationVariables>;
export const MoveDownDocument = gql`
    mutation moveDown {
  down(profile: "default") {
    speed
  }
}
    `;
export type MoveDownMutationFn = Apollo.MutationFunction<MoveDownMutation, MoveDownMutationVariables>;
export type MoveDownProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<MoveDownMutation, MoveDownMutationVariables>
    } & TChildProps;
export function withMoveDown<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MoveDownMutation,
  MoveDownMutationVariables,
  MoveDownProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, MoveDownMutation, MoveDownMutationVariables, MoveDownProps<TChildProps, TDataName>>(MoveDownDocument, {
      alias: 'moveDown',
      ...operationOptions
    });
};

/**
 * __useMoveDownMutation__
 *
 * To run a mutation, you first call `useMoveDownMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveDownMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveDownMutation, { data, loading, error }] = useMoveDownMutation({
 *   variables: {
 *   },
 * });
 */
export function useMoveDownMutation(baseOptions?: Apollo.MutationHookOptions<MoveDownMutation, MoveDownMutationVariables>) {
        return Apollo.useMutation<MoveDownMutation, MoveDownMutationVariables>(MoveDownDocument, baseOptions);
      }
export type MoveDownMutationHookResult = ReturnType<typeof useMoveDownMutation>;
export type MoveDownMutationResult = Apollo.MutationResult<MoveDownMutation>;
export type MoveDownMutationOptions = Apollo.BaseMutationOptions<MoveDownMutation, MoveDownMutationVariables>;
export const StateDocument = gql`
    subscription state {
  stateChange(profile: "default") {
    cm
    inch
    value
    speed
  }
}
    `;
export type StateProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<StateSubscription, StateSubscriptionVariables>
    } & TChildProps;
export function withState<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  StateSubscription,
  StateSubscriptionVariables,
  StateProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withSubscription<TProps, StateSubscription, StateSubscriptionVariables, StateProps<TChildProps, TDataName>>(StateDocument, {
      alias: 'state',
      ...operationOptions
    });
};

/**
 * __useStateSubscription__
 *
 * To run a query within a React component, call `useStateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useStateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useStateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<StateSubscription, StateSubscriptionVariables>) {
        return Apollo.useSubscription<StateSubscription, StateSubscriptionVariables>(StateDocument, baseOptions);
      }
export type StateSubscriptionHookResult = ReturnType<typeof useStateSubscription>;
export type StateSubscriptionResult = Apollo.SubscriptionResult<StateSubscription>;