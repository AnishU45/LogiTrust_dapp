// eslint-disable-next-line no-undef
const Role = artifacts.require("./contracts/Roles.sol");

module.exports = function(deployer){
    deployer.deploy(Role);
}