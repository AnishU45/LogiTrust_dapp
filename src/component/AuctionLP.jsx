import Navbar from "./Auction/Navbar";
import HeroSection from "./Auction/HeroSection";
import Footer from "./Auction/Footer";
import Working from "./Auction/Working";
import Bidding from "./Auction/Bidding";

export const AuctionLP = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Working />
      <Footer />
      {/* <Bidding /> */}
    </div>
  );
};

export default AuctionLP;
