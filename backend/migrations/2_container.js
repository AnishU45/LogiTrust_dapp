/* eslint-disable no-undef */
const Container = artifacts.require("./ContainerSC.sol");

module.exports = function(deployer){
    deployer.deploy(Container);
}