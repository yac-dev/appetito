// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Appetito {

  struct ClaimType {
    string claimerName;
    string dreamJob;
    string purpose;
    string description;
    uint value;
    address claimerAddress;
    address recipientAddress;
    bool done;
    mapping(address => bool) approvers;
    uint approvedCounts;
  }

  struct ContributorType {
    string contributorName;
    address contributorAddress;
  }

  struct CoordsType{
    int lat;
    int lng;
  }

  address public owner;

  CoordsType[] public participantsCoordsList; // このblockchainに参加した人のlatitude, longitudeの組み合わせをarrayで記録する。ownerもcontributorもclaimerの場所がlistで記録される。
  mapping(address => bool) mappedParticipants; // 純粋に、このblockchainに参加している人をmappingで記録する。
  uint public population;

  // address[] public contributors; // 純粋に、contributorだけをarrayで記録する。
  ContributorType[] public contributors;
  ClaimType[] public claims; // claimをarrayで記録する。

  constructor(int latitude, int longitude){
    owner = msg.sender;
    CoordsType memory coords = CoordsType({
      lat: latitude,
      lng: longitude
    });
    participantsCoordsList.push(coords);

    mappedParticipants[msg.sender] = true;
    population++;
  }

  modifier addList(int latitude, int longitude) {
    _;
    if(!mappedParticipants[msg.sender]){
      CoordsType memory coords = CoordsType({
        lat: latitude,
        lng: longitude
      });
      participantsCoordsList.push(coords);

      mappedParticipants[msg.sender] = true;
      population++;
    }
  }

  function contribute(string memory contributorName, int latitude, int longitude) public payable addList(latitude, longitude){
    require(msg.value >= 0.01 ether);
    ContributorType memory contributor = ContributorType({
      contributorName: contributorName,
      contributorAddress: msg.sender
    });
    contributors.push(contributor);


      // if(!mappedParticipants[msg.sender]){
      //     CoordsType memory coords = CoordsType({
      //       lat: latitude,
      //       lng: longitude
      //     });
      //     participantsCoordsList.push(coords);

      //     mappedParticipants[msg.sender] = true;
      //     population++;
      // }
      // 一人が何回もcontributeしてもいいようにする。
  }

  function getContributors() public view returns(ContributorType[] memory){
    return contributors;
  }

  function getParticipantsCoordsList() public view returns(CoordsType[] memory){
    return participantsCoordsList;
  }

  // function getClaims() public view returns(ClaimType[] memory){
  //     return claims; // mapping含んだtypeを返すことはできないか。。。。
  // }

  function claim(string memory claimerName ,string memory dreamJob, string memory purpose, string memory description, uint value, address recipientAddress, int latitude, int longitude) public addList(latitude, longitude){
    require(msg.sender != recipientAddress); // 自分で自分に送れちゃあだめだ。
    uint index = claims.length;
    claims.push();

    ClaimType storage claim = claims[index];
    claim.claimerName = claimerName;
    claim.dreamJob = dreamJob;
    claim.purpose = purpose;
    claim.description = description;
    claim.value = value;
    claim.claimerAddress = msg.sender;
    claim.recipientAddress = recipientAddress;
    claim.done = false;
    claim.approvedCounts = 0;


      // if(!mappedParticipants[msg.sender]){
      //     CoordsType memory coords = CoordsType({
      //       lat: latitude,
      //       lng: longitude
      //     });
      //     participantsCoordsList.push(coords);

      //     mappedParticipants[msg.sender] = true;
      //     population++;
      // }
  }

  function approveClaim(uint index, int latitude, int longitude) public addList(latitude, longitude){
    ClaimType storage claim = claims[index];

    require(!claim.approvers[msg.sender]);
    claim.approvers[msg.sender] = true;
    claim.approvedCounts++;

    // if(!mappedParticipants[msg.sender]){
    //     CoordsType memory coords = CoordsType({
    //       lat: latitude,
    //       lng: longitude
    //     });

    //     participantsCoordsList.push(coords);
    //     mappedParticipants[msg.sender] = true;
    //     population++;
    // }
  }

  function startStudy(uint index) public payable {
    ClaimType storage claim = claims[index];

    require(msg.sender == claim.claimerAddress);
    require(claim.approvedCounts >= (population / 2));
    require(!claim.done);
    claim.done = true;

    payable (claim.recipientAddress).transfer(claim.value); // wei baseであることに注意。
  }
}


// pragma solidity ^0.8.9;

// contract Appetito {

//   struct ClaimType {
//     string dreamJob;
//     string purpose;
//     string description;
//     uint value;
//     address claimer;
//     address recipient;
//     bool done;
//     mapping(address => bool) approvers;
//     uint approvedCounts;
//   }

//   struct ContibutorType {
//     string nickName;
//     address place;
//     uint latitude;
//     uint longitude;
//   }

//   ClaimType public claiming;

//   address public owner;
//   // mapping(address => bool) public contributors;
//   ContibutorType[] public contributors;
//   uint public population;
//   ClaimType[] public claims;

//   constructor(){
//     owner = msg.sender;
//     population++;
//   }

//   function contribute(string memory nickName, uint latitude, uint longitude) public payable {
//     require(msg.value >= 0.01 ether);
//     // contributors[msg.sender] = true;
//     ContibutorType memory contributor = ContibutorType({
//       nickName: nickName,
//       place: msg.sender,
//       latitude: latitude,
//       longitude: longitude
//     });

//     contributors.push(contributor);
//     population++;
//   }

//   function getContributors() public view returns(ContibutorType[] memory){
//     return contributors;
//   }

//   function getContributorsNum() public view returns(uint){
//     return contributors.length;
//   }

//   // function getClaims() public view returns(ClaimType[] memory){
//   //     return claims; // mapping含んだtypeを返すことはできないか。。。。
//   // }

//   function claim(string memory dreamJob, string memory purpose, string memory description, uint value, address recipient) public {
//     uint index = claims.length;
//     claims.push();

//     ClaimType storage claim = claims[index];
//     claim.dreamJob = dreamJob;
//     claim.purpose = purpose;
//     claim.description = description;
//     claim.value = value;
//     claim.claimer = msg.sender;
//     claim.recipient = recipient;
//     claim.done = false;
//     claim.approvedCounts = 0;

//     population++;
//   }

//   function approveClaim(uint index) public {
//     require(!claims[index].approvers[msg.sender]);
//     claims[index].approvers[msg.sender] = true;
//     claims[index].approvedCounts++;
//   }

//   function startStudy(uint index) public payable {
//     require(msg.sender == claims[index].claimer);
//     require(claims[index].approvedCounts > (population / 2));
//     require(!claims[index].done);

//     payable (claims[index].recipient).transfer(claims[index].value);
//   }
// }
