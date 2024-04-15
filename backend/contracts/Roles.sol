// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Roles {
    struct User {
        string name;
        string role;
    }

    mapping(address => User) public users;

    event UserSignedUp(address indexed userAddress, string name, string role);

    function signUp(string memory _name, string memory _role) public {
        require(bytes(users[msg.sender].name).length  == 0, "User already exists");
        users[msg.sender] = User(_name, _role);
        emit UserSignedUp(msg.sender, _name, _role);
    }

    function login() public view returns (string memory, string memory) {
        require(bytes(users[msg.sender].name).length > 0, "User not found");
        return (users[msg.sender].name, users[msg.sender].role);
    }
}