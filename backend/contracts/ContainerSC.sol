// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ContainerSC {

    enum ContainerState {
        Created,
        DocumentsVerified,
        ShipmentInProgress,
        ShipmentDelivered,
        Completed
    }

    struct Container {
        string origin;
        string destination;
        string size;
        string content;
        address sender;
        address receiver;
        address agent;
        address receiverAgent;
        bool Multimodal;
        ContainerState state;
        string[] IPFShash;
    }

    mapping(uint256 => Container) public containers;
    uint256 public containerCount;

    event ShipmentRequested(uint256 containerId, address sender);
    event DocumentsVerified(uint256 containerId);
    event ShipmentCreated(uint256 containerId);
    event ShipmentDelivered(uint256 containerId);
    event ShipmentCompleted(uint256 containerId);
    event DocumentUploaded(uint256 containerId, string ipfsHash);

    function requestShipment(
        string memory _origin,
        string memory _destination,
        string memory _size,
        string memory _content,
        address _sender,
        address _receiver,
        address _receiverAgent,
        bool _Multimodal
    ) external {
        containerCount++;
        Container storage newContainer = containers[containerCount];
        newContainer.origin = _origin;
        newContainer.destination = _destination;
        newContainer.size = _size;
        newContainer.content = _content;
        newContainer.sender = _sender;
        newContainer.receiver = _receiver;
        newContainer.agent = msg.sender;
        newContainer.receiverAgent = _receiverAgent;
        newContainer.Multimodal = _Multimodal;
        newContainer.state = ContainerState.Created;
        
        emit ShipmentRequested(containerCount, msg.sender);
    }

    function verifyDocuments(uint256 _containerId) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.agent || msg.sender == container.receiverAgent, "Unauthorized");
        require(container.state == ContainerState.Created, "Invalid state");
        
        container.state = ContainerState.DocumentsVerified;
        emit DocumentsVerified(_containerId);
    }

    function createShipment(uint256 _containerId) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.agent, "Unauthorized");
        require(container.state == ContainerState.DocumentsVerified, "Invalid state");
        
        container.state = ContainerState.ShipmentInProgress;
        emit ShipmentCreated(_containerId);
    }

    function deliverShipment(uint256 _containerId) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.receiverAgent, "Unauthorized");
        require(container.state == ContainerState.ShipmentInProgress, "Invalid state");
        
        container.state = ContainerState.ShipmentDelivered;
        emit ShipmentDelivered(_containerId);
    }

    function completeShipment(uint256 _containerId) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.agent || msg.sender == container.receiverAgent, "Unauthorized");
        require(container.state == ContainerState.ShipmentDelivered, "Invalid state");
        
        container.state = ContainerState.Completed;
        emit ShipmentCompleted(_containerId);
    }

    function uploadDocumentToIPFS(uint256 _containerId, string memory _hashIPFS) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.agent, "Unauthorized");
        
        container.IPFShash.push(_hashIPFS);
        emit DocumentUploaded(_containerId, _hashIPFS);
    }

    function getDocumentFromIPFS(uint256 _containerId, uint256 _index) external view returns (string memory) {
        return containers[_containerId].IPFShash[_index];
    }

    function getAllContainers() external view returns (Container[] memory) {
        Container[] memory allContainers = new Container[](containerCount);
        for (uint256 i = 1; i <= containerCount; i++) {
            allContainers[i - 1] = containers[i];
        }
        return allContainers;
    }
}
