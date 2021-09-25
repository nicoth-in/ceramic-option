
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {

  useQuery,

  useMutation,

  useQueryClient,

  QueryClient,

  QueryClientProvider,

} from 'react-query';

import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';

import { Resolver } from 'did-resolver';
import CeramicClient from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import Auth from "./Auth/View";

// import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';


// const config = {
//   ceramic,
//   chains: {
//     'eip155:1': {
//       blocks: 'https://api.thegraph.com/subgraphs/name/yyong1010/ethereumblocks',
//       skew: 15000,
//       assets: {
//         erc721: 'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc721-subgraph',
//         erc1155: 'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc1155-subgraph',
//       },
//     },
//     'eip155:4': {
//       blocks: 'https://api.thegraph.com/subgraphs/name/mul53/rinkeby-blocks',
//       skew: 15000,
//       assets: {
//         erc721: 'https://api.thegraph.com/subgraphs/name/sunguru98/erc721-rinkeby-subgraph',
//         erc1155: 'https://api.thegraph.com/subgraphs/name/sunguru98/erc1155-rinkeby-subgraph',
//       },
//     },
//   },
// }


const API_URL = 'https://gateway-clay.ceramic.network';
export const ceramic = new CeramicClient(API_URL)

const threeIdResolver = ThreeIdResolver.getResolver(ceramic);
const didResolver = new Resolver(threeIdResolver);


const did = new DID({ resolver: didResolver })
ceramic.did = did;

// const test = async () => {

//   // const erc721result = await didResolver.resolve(
//   //   'did:nft:eip155:1_erc721:0x60f80121c31a0d46b5279700f9df786054aa5ee5_1342228'
//   // )
  
//   // console.log(erc721result)

//   const addresses = await window.ethereum.enable();
//   const threeIdConnect = new ThreeIdConnect();


//   const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
//   await threeIdConnect.connect(authProvider); 

//   const provider = await threeIdConnect.getDidProvider()
//   ceramic.did.setProvider(provider);
//   await ceramic.did.authenticate();


// };

// test().then(_ => {});

export const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Route exact path="/" component={Auth} />
          <Route exact path="/profile/:did" component={Auth} />
          {/* <Link to="/dashboard/" /> */}
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
