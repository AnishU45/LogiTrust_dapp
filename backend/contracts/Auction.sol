// SPDX-License-Identifier: MIT
pragma solidity >0.8.0 <=0.9.0;

contract Auction{

    enum ShipmentStatus {
        Unclaimed,
        AuctionReqApproved,
        ClaimApproved
    }
    
    struct Shipment {
        uint shipmentId;
        address owner;
        address portOfficer;
        uint price;
        ShipmentStatus sState;
    }

    struct AuctionData {
        address highestBidder;
        uint highestBid;
        bool started;
        bool ended;
    }

    mapping(uint => AuctionData) public auctions;
    mapping(uint => Shipment) public shipments;

    
    event ShipmentCreated(uint shipmentId, address owner);
    event ClaimCargo(uint shipmentId);
    event AuctionApprovedAndCargoAssignedToAuctionSC(uint shipmentId);
    event AuctionStarted(uint shipmentId);
    event Bid(uint shipmentId, address bidder, uint amount);
    event AuctionEnded(uint shipmentId);

    function createShipment(address _owner,address _portOfficer,uint _price) external {
        uint _shipmentId = block.timestamp;
        Shipment memory sp;
        sp.shipmentId = _shipmentId;
        sp.owner = _owner;
        sp.portOfficer = _portOfficer;
        sp.price = _price;
        sp.sState = ShipmentStatus.Unclaimed;
        shipments[_shipmentId] = sp;

        emit ShipmentCreated(_shipmentId, _owner);
    }
    

    function claimCargoRequest(uint _shipmentId, address _owner) external {
        require(msg.sender == shipments[_shipmentId].portOfficer, "Only officer and approve the claim request");

        if(shipments[_shipmentId].owner == _owner){
            shipments[_shipmentId].sState = ShipmentStatus.ClaimApproved;
            emit ClaimCargo(_shipmentId);
        }
    }

    function auctionCargo(uint _shipmentId) external {
        require(msg.sender == shipments[_shipmentId].portOfficer, "Not the owner of the shipment");
        require(
            shipments[_shipmentId].sState == ShipmentStatus.Unclaimed,
            "The shipment is not in the Auctioned status"
        );

        shipments[_shipmentId].sState = ShipmentStatus.AuctionReqApproved;
        emit AuctionApprovedAndCargoAssignedToAuctionSC(_shipmentId);
    }

    function start(uint _shipmentId) external {
        require(msg.sender == shipments[_shipmentId].portOfficer, "Only agents can start an auction");
        require(
            shipments[_shipmentId].sState == ShipmentStatus.AuctionReqApproved,
            "The shipment is not in the AuctionApproved status"
        );

        auctions[_shipmentId].started = true;
        emit AuctionStarted(_shipmentId);
    }

    function bid(uint _shipmentId, uint amount) external {
        require(!auctions[_shipmentId].started, "The auction is already started");

        if (amount > shipments[_shipmentId].price) {
            shipments[_shipmentId].price = amount;
            auctions[_shipmentId].highestBid = amount;
            auctions[_shipmentId].highestBidder = msg.sender;
            emit Bid(_shipmentId, msg.sender, amount);
        }
    }

    function end(uint _shipmentId) external {
        require(msg.sender == shipments[_shipmentId].portOfficer, "Only agents can start an auction");
        require(!auctions[_shipmentId].ended, "The auction is already ended");

        if (auctions[_shipmentId].highestBidder != shipments[_shipmentId].owner) {
            // Transfer ownership of the cargo to the highest bidder
            shipments[_shipmentId].owner = auctions[_shipmentId].highestBidder;
        }

        auctions[_shipmentId].ended = true;
        emit AuctionEnded(_shipmentId);
    }

}