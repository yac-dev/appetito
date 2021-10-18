// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Appetito {
  struct ClaimType {
    string claimerName;
    string dreamJob;
    string materialTitle;
    string purpose;
    string urlSource;
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

  address public owner;

  mapping(address => bool) mappedParticipants; // 純粋に、このnetworkに参加している人をmappingで記録する。
  uint public population;

  ContributorType[] public contributors; // 純粋に、contributorだけをarrayで記録する。
  ClaimType[] public claims; // claimをarrayで記録する。

  struct MessageType {
    address sender;
    string description;
  }
  MessageType[] public messages;

  constructor(){
    owner = msg.sender;
    mappedParticipants[msg.sender] = true;
    population++;
  }

  modifier addList() {
    _;
    if(!mappedParticipants[msg.sender]){
      mappedParticipants[msg.sender] = true;
      population++;
    }
  }

  function contribute(string memory contributorName) public payable addList(){
    require(msg.value >= 0.0000000000000001 ether);
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


  function claim(string memory claimerName ,string memory dreamJob, string memory materialTitle, string memory urlSource, string memory purpose, uint value, address recipientAddress) public addList(){
    require(msg.sender != recipientAddress); // 自分で自分に送れちゃあだめだ。
    uint index = claims.length;
    claims.push();

    ClaimType storage claim = claims[index];
    claim.claimerName = claimerName;
    claim.dreamJob = dreamJob;
    claim.materialTitle = materialTitle;
    claim.urlSource = urlSource;
    claim.purpose = purpose;
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

  function approveClaim(uint index) public addList(){
    ClaimType storage claim = claims[index];

    require(!claim.approvers[msg.sender]);
    require(claim.claimerAddress != msg.sender);
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

  function makeMessage(string memory description) public {
    uint index = messages.length;
    messages.push();

    MessageType storage message = messages[index];
    message.sender = msg.sender;
    message.description = description;
  }

  function getMessages() public view returns(MessageType[] memory){
    return messages;
  }
}
