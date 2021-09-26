// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;
import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";
contract newNFT is NFTokenMetadata, Ownable {
    using SafeMath for uint256;
struct data_rcvd{
     uint [] tokens;
     address [] token_addr;
     uint price;
     uint [] tokens_price;
     uint numTokens ;
     string eDateEnd;
     address buyer;
     address owner;
}
    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;
//  mapping(address => uint256) _tokens;
//  mapping(address => uint256) _price;
//  mapping(address => uint256) _tokens_price;
    uint [] _tokens;
    address [] _token_addr;
    uint  _price;
    uint [] _tokens_price;
    address _buyer;
    address _owner;
// data_rcvd _data_rcvd;
constructor() {
    nftName = "Synth NFT";
    nftSymbol = "SYN";
}

function setter(uint _user_id, string memory _name, string memory _symb, data_rcvd memory self ) public {
    nftName = _name;
    nftSymbol = _symb;
     _price  = self.price;
     _tokens_price [_user_id] = self.tokens_price[_user_id];
     _tokens [_user_id] = self.tokens[_user_id];
     _token_addr[_user_id] = self.token_addr[_user_id];
    // _buyer = self.selfAddr;
  //  return true;
}


    // function transfer(uint _user_id, address receiver, uint numTokens,string nftName , string nftSymbol,  data_rcvd memory self) public returns (bool) {
    //     require(numTokens <= balances[msg.sender]);
    //     balances[msg.sender] = balances[msg.sender].sub(numTokens);
    //     balances[receiver] = balances[receiver].add(numTokens);
    //     setter(_user_id , nftName, nftSymbol, self);
    //     emit Transfer(msg.sender, receiver, numTokens);
    //     return true;
    // }
  function transferFrom(uint _user_id,  data_rcvd memory self , uint numTokens,string memory nftName , string memory nftSymbol  ) public returns (bool) {
        require(numTokens <= balances[owner]);    
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[self.buyer] = balances[self.buyer].add(self.numTokens);
        setter(_user_id , nftName, nftSymbol,self);
        
        emit Transfer(self.owner, self.buyer, numTokens);
        return true;
    }
    

function burn_and_transfer(uint _user_id,  data_rcvd memory self , uint numTokens,string memory nftName , string memory nftSymbol, address _from, uint256 _tokenId) public {
    address buff = self.owner;
    self.owner=self.buyer;
    self.buyer=buff;
    transferFrom(_user_id, self ,numTokens, nftName , nftSymbol);
    _removeNFToken(_from, _tokenId);
}

// function _removeToken(address _from, uint256 _tokenId) private {
//     require(owner(_tokenId) == _from);

//     uint256 tokenIndex = ownedTokensIndex[_tokenId];
//     uint256 lastTokenIndex = balanceOf(_from).sub(1);
//     uint256 lastToken = ownedTokens[_from][lastTokenIndex];

//     tokenOwner[_tokenId] = 0;
//     ownedTokens[_from][tokenIndex] = lastToken;
//     ownedTokens[_from][lastTokenIndex] = 0;
//     ownedTokens[_from].length--;
//     ownedTokensIndex[_tokenId] = 0;
//     ownedTokensIndex[lastToken] = tokenIndex;
//     totalTokens = totalTokens.sub(1);
//   }
    // function approve(address delegate, uint numTokens) public returns (bool) {
    //     allowed[msg.sender][delegate] = numTokens;
    //     bool rslt;
    //   // rslt = emit Approval(msg.sender, delegate, numTokens)
    //     return true;
    // }

    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }
function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
    super._mint(_to, _tokenId);
    super._setTokenUri(_tokenId, _uri);
}

}
library SafeMath { 
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}



