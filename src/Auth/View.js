
import React, { useState } from "react";
import styles from "./Styles.module.css";

import { ceramic, queryClient } from "../App";

import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { Resolver } from 'did-resolver';
import CeramicClient from '@ceramicnetwork/http-client';
import { DID } from 'dids';

import {
    useHistory
  } from "react-router-dom";

  
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

    const auth = async () => {

        const addresses = await window.ethereum.enable();
        const threeIdConnect = new ThreeIdConnect();
      
        const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
        await threeIdConnect.connect(authProvider); 
      
        const provider = await threeIdConnect.getDidProvider()
        ceramic.did.setProvider(provider);

        await ceramic.did.authenticate();

    };

    const authMutation  = useMutation(auth, {
        onMutate: async newTodo => {
            setText("Authentithicating...");
        },
        onSuccess: async () => {
            const stream = await ceramic.loadStream("k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio");
            console.log(stream);
            //history.push("/profile/" + ceramic.did.id);
        },
        onError: (err, newTodo, context) => {
        },
        onSettled: () => {
            setText("Auth");
        },
    });

    const handleClick = () => {
        authMutation.mutate();
    };

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    )
}