// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ContainerSC {

    enum ContainerState {
        Created,
        DocumentsVerified,
        ShipmentInProgress,
        ShipmentDelivered,
        Completed,
        Claim
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
        address transporter;
        bool Multimodal;
        ContainerState state;
        string IPFShash;
    }

    mapping(uint256 => Container) public containers;
    uint256 public containerCount;

    event ShipmentRequested(uint256 containerId, address sender);
    event ShipmentUpdated(uint256 contianerId);
    event DocumentsVerified(uint256 containerId);
    event ShipmentCreated(uint256 containerId);
    event ShipmentDelivered(uint256 containerId);
    event ShipmentCompleted(uint256 containerId);
    event ShipmentClaimed(uint256 containerId);
    event DocumentUploaded(uint256 containerId, string ipfsHash);

    function requestShipment(
        string memory _origin,
        string memory _destination,
        string memory _size,
        string memory _content,
        address _sender,
        address _receiver,
        address _receiverAgent,
        address _transporter
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
        newContainer.transporter = _transporter;
        newContainer.state = ContainerState.Created;
        
        emit ShipmentRequested(containerCount, msg.sender);
    }

    function updateShipment(
        uint256 _containerId,
        string memory _origin,
        string memory _destination,
        address _receiverAgent,
        address _transporter
    ) external {
        Container storage updateContainer = containers[_containerId];
        require(msg.sender == updateContainer.agent,"Invalid User");
        require(updateContainer.state == ContainerState.Completed,"Cannot Forward the package someone have stolen it");
        updateContainer.origin = _origin;
        updateContainer.destination = _destination;
        updateContainer.agent = msg.sender;
        updateContainer.receiverAgent = _receiverAgent;
        updateContainer.transporter = _transporter;
        updateContainer.state = ContainerState.Created;
        
        emit ShipmentUpdated(containerCount);
    }

    function verifyDocuments(uint256 _containerId) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.agent || msg.sender == container.receiverAgent, "Unauthorized");
        require(container.state == ContainerState.Created, "Invalid state");
        
        container.state = ContainerState.DocumentsVerified;
        emit DocumentsVerified(_containerId);
    }

    function createShipment(uint256 _containerId,bool _multimodal) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.agent, "Unauthorized");
        require(container.state == ContainerState.DocumentsVerified, "Invalid state");

        container.Multimodal = _multimodal;        
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

    function claimShipment(uint256 _containerId , address _receiver) external {
        Container storage container = containers[_containerId];
        require(container.state == ContainerState.Completed, "Shipment not reached yet");
        require(container.receiver == _receiver, "Invalid receiver");
        require(msg.sender == container.receiverAgent,"Claim Not allowed");

        container.state = ContainerState.Claim;
        emit ShipmentClaimed(_containerId);
        
    }

    function uploadDocumentToIPFS(uint256 _containerId, string memory _hashIPFS) external {
        Container storage container = containers[_containerId];
        require(msg.sender == container.agent, "Unauthorized");
        
        container.IPFShash = _hashIPFS;
        emit DocumentUploaded(_containerId, _hashIPFS);
    }

    function getDocumentFromIPFS(uint256 _containerId) external view returns (string memory) {
        return containers[_containerId].IPFShash;
    }

    function getAllContainers() external view returns (Container[] memory) {
        Container[] memory allContainers = new Container[](containerCount);
        for (uint256 i = 1; i <= containerCount; i++) {
            allContainers[i - 1] = containers[i];
        }
        return allContainers;
    }
}
