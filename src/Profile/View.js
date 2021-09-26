
import React, { useState } from "react";
import styles from "./Styles.module.css";

import { useCeramic } from "use-ceramic";
import { TileDocument } from "@ceramicnetwork/stream-tile";

import { ceramic, queryClient, raribleApi } from "../App";

import {
    useHistory
} from "react-router-dom";


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

            // const profile = await ceramic.createDocument('tile', {
            //     metadata: {
            //       schema: "k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",
            //     //   family: "<definition-DocID>"
            //     },
            //     content: {
            //       name: "Samantha Smith",
            //       image: {
            //         original: {
            //           src: "ipfs://bafy...",
            //           mimeType: "image/png",
            //           width: 500,
            //           height: 200
            //         }
            //       },
            //       description: "This is my funny description.",
            //       emoji: "🚀",
            //       url: "http://ceramic.network"
            //     }
            //   });

            // console.log(profile);
            //raribleApi.getTransactions();
            // const doc = await TileDocument.load(ceramic, "k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio");
            console.log(ceramic.did);
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