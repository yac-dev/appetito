// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Appetito {

  struct ClaimType {
    string dreamJob;
    string purpose;
    string description;
    uint value;
    address claimer;
    address to;
    bool done;
    mapping(address => bool) approvers;
    uint approvedCounts;
  }

  address public owner;
  mapping(address => bool) public contributors;
  uint public population;
  // RequestType[] public requests;

  uint public requestIndex;
  mapping(uint => ClaimType) public claims; // not array

  constructor(){
    owner = msg.sender;
  }

  function contribute() public payable {
    require(msg.value >= 1);
    contributors[msg.sender] = true;
    population++;
  }

  function claim(string memory dreamJob, string memory purpose, string memory description, uint value, address to) public {
    // RequestType storage newRequest = RequestType({
    //     dreamJob: dreamJob,
    //     purpose: purpose,
    //     description: description,
    //     value: value,
    //     recipient: recipient,
    //     done: false,
    //     approvedCount: 0
    // });
    ClaimType storage newClaim = claims[requestIndex];
    requestIndex++;
    newClaim.dreamJob = dreamJob;
    newClaim.purpose = purpose;
    newClaim.description = description;
    newClaim.value = value;
    newClaim.claimer = msg.sender;
    newClaim.to = to;
    newClaim.done = false;
    newClaim.approvedCounts = 0;

    population++;
  }

  function approveClaim(uint index) public {
    require(!claims[index].approvers[msg.sender]);
    claims[index].approvers[msg.sender];
    claims[index].approvedCounts++;
  }

  function startStudy(uint index) public payable {
    require(msg.sender == claims[index].claimer);
    require(claims[index].approvedCounts > (population / 2));
    require(!claims[index].done);

    payable (claims[index].to).transfer(claims[index].value);
  }
}
