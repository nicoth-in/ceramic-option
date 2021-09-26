
import React, { useState, useEffect } from "react";
import styles from "./Styles.module.css";
import { useCeramic } from "use-ceramic";

import { queryClient, raribleApi, api } from "../App";
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { Resolver } from 'did-resolver';
import CeramicClient from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import {useHistory} from "react-router-dom";
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query';



export default function Auth() {

    const history = useHistory();

    const [buttonText, setText] = useState("Auth");
    const [authenticated, setAuthenticated] = useState(api.ceramic.isAuthenticated);
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        const subscription = api.ceramic.isAuthenticated$.subscribe(
          (isAuthenticated) => {
            setAuthenticated(isAuthenticated);
          }
        );
    
        return () => {
          subscription.unsubscribe();
        };
      });

    const handleLogin = async () => {
        try {
            await api.connect();
            // await api.ceramic.authenticate(authProvider);
        } catch (e) {
            console.error(e);
        }
    };

    const authMutation  = useMutation(handleLogin, {
        onMutate: async newTodo => {
            setText("Authentithicating...");
        },
        onSuccess: async () => {
            
        },
        onError: (err, newTodo, context) => {},
        onSettled: () => {
            setText("Auth");
        },
    });

    const handleClick = () => {
        authMutation.mutate();
    };

    if (authenticated) {
        history.push("/profile/" + api.ceramic.did.id);
    }

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    )
}