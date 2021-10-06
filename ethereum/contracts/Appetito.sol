// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Appetito {

  struct ClaimType {
    string dreamJob;
    string purpose;
    string description;
    uint value;
    address claimer;
    address recipient;
    bool done;
    mapping(address => bool) approvers;
    uint approvedCounts;
  }

  struct ContibutorType {
    string nickName;
    address place;
    uint latitude;
    uint longitude;
  }

  ClaimType public claiming;

  address public owner;
  // mapping(address => bool) public contributors;
  ContibutorType[] public contributors;
  uint public population;
  ClaimType[] public claims;

  constructor(){
    owner = msg.sender;
    population++;
  }

  function contribute(string memory nickName, uint latitude, uint longitude) public payable {
    require(msg.value >= 1);
    // contributors[msg.sender] = true;
    ContibutorType memory contributor = ContibutorType({
      nickName: nickName,
      place: msg.sender,
      latitude: latitude,
      longitude: longitude
    });

    contributors.push(contributor);
    population++;
  }

  function getContributors() public view returns(ContibutorType[] memory){
    return contributors;
  }

  function getContributorsNum() public view returns(uint){
    return contributors.length;
  }

  // function getClaims() public view returns(ClaimType[] memory){
  //     return claims; // mapping含んだtypeを返すことはできないか。。。。
  // }

  function claim(string memory dreamJob, string memory purpose, string memory description, uint value, address recipient) public {
    uint index = claims.length;
    claims.push();

    ClaimType storage claim = claims[index];
    claim.dreamJob = dreamJob;
    claim.purpose = purpose;
    claim.description = description;
    claim.value = value;
    claim.claimer = msg.sender;
    claim.recipient = recipient;
    claim.done = false;
    claim.approvedCounts = 0;

    population++;
  }

  function approveClaim(uint index) public {
    require(!claims[index].approvers[msg.sender]);
    claims[index].approvers[msg.sender] = true;
    claims[index].approvedCounts++;
  }

  function startStudy(uint index) public payable {
    require(msg.sender == claims[index].claimer);
    require(claims[index].approvedCounts > (population / 2));
    require(!claims[index].done);

    payable (claims[index].recipient).transfer(claims[index].value);
  }
}
