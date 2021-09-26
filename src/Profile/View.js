
import React, { useEffect, useState } from "react";
import styles from "./Styles.module.css";

import { useCeramic } from "use-ceramic";
import { TileDocument } from "@ceramicnetwork/stream-tile";

import { api, queryClient, raribleApi } from "../App";

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


import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { Resolver } from 'did-resolver'




export default function Profile(props) {

    const history = useHistory();
    const ceramic = useCeramic();

    useEffect(() => {

        console.log(ceramic);
          
        // getResolver will return an object with a key/value pair of { 'safe': resolver }
        // where resolver is a function used by the generic did resolver.
        const threeIdResolver = ThreeIdResolver.getResolver(ceramic)
        const didResolver = new Resolver(threeIdResolver)

          
        didResolver.resolve(
            props.match.params.did
        ).then(r => {
            console.log(r, props.match.params.did);
        })

    }, []);

    return (
        <div>
            
        </div>
    )
}