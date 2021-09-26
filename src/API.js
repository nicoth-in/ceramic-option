import { ICoreOptions } from "web3modal";
import Web3 from "web3";
import Web3Modal from "web3modal";
import React, { useContext } from "react";



const RARIBLE_ENDPOINT = "https://api-dev.rarible.com";


export class API {

    _web3 = undefined;
    _provider;
    _account = undefined;
    _chainId = undefined;
    networkName = "ropsten";

    async connect() {
        const web3Modal = new Web3Modal(this.options);
        this._provider = await web3Modal.connect();
        this._web3 = new Web3(this._provider);
        const accounts = await this._web3.eth.getAccounts();
        this._chainId = await this._web3.eth.getChainId();
        this._account = accounts[0];
    }

    get chainId() {
        if (this._chainId) {
            return this._chainId;
        } else {
            throw new Error(`connect first`);
        }
    }

    get account() {
        if (this._account) {
            return this._account;
        } else {
            throw new Error(`connect first`);
        }
    }

    get provider() {
        if (this._provider) {
            return this._provider;
        } else {
            throw new Error(`connect first`);
        }
    }

    get web3() {
        if (this._web3) {
            return this._web3;
        } else {
            throw new Error(`connect first`);
        }
    }

    async raribleTokens() {
        let response = await fetch(
            `${RARIBLE_ENDPOINT}/protocol/v0.1/ethereum/nft/items/byOwner?owner=${this.account}&includeMeta=true`
        );
        return await response.json();
    }

}