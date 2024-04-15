import bidding from "../../assets/bidding.jpeg";

export const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src={bidding}
        alt="bidding"
        className="w-full bg-black opacity-20 absolute inset-0 pointer-events-none"
      />
      <div className="flex flex-col items-center mt-6 lg:mt-0 relative z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center mt-40 tracking-wide w-8/12">
          Discovering Gems,
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            {" "}
            One Bid Away.
          </span>
        </h1>
        <p className="mt-24 text-lg text-center text-neutral-400 max-w-4xl">
          Enter the opportunity arena, where each bet sparks an exciting world
          of possibilities. Together, collectors, enthusiasts, and seekers of
          the remarkable will come together in our final search for unmatched
          treasures. Your next valuable item is waiting for its proper owner in
          a world where passion and uniqueness collide with every bid you place.
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="mt-20 bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
          >
            Get Started
          </a>
          {/* <a href="#" className="py-3 px-4 mx-3 rounded-md border">
                    Documentation
                </a> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
