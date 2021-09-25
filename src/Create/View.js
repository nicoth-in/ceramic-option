
import React, { useState } from "react";
import styles from "./Styles.module.css";

import { ceramic, queryClient, raribleApi } from "../App";
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


export default function CreatePage() {

    return (
        <div>
            <input type="text" placeholder="Bundle name" />
            <div>
                <input type="number" placeholder="Price"  />
                <input type="text"  placeholder="Price" />
            </div>

        </div>
    )
}