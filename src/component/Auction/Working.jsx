import step1 from "../../assets/step1.jpeg";
import step2 from "../../assets/step2.jpeg";
import step3 from "../../assets/step3.jpeg";
import step4 from "../../assets/step4.jpeg";
import { Undo } from "lucide-react";

export const Working = () => {
  return (
    <body className="text-white font-sans mx-10">
      <div className="container mx-auto my-16 px-4 py-12">
        <h2 className="text-5xl font-bold text-center mb-6">How it works?</h2>
        <p className="text-center mb-12">
          Follow these simple steps and make profits!
        </p>
        <div className="flex flex-nowrap justify-center">
          <div className="w-full sm:w-1/2 md:w-1/4 text-center">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto mb-2 relative">
                {/* <div className="absolute inset-0 m-auto rounded-full bg-blue-800 w-16 h-16"></div> */}
                <img src={step1} alt="step1" className="relative z-10 " />
              </div>
              <span className="text-sm font-semibold bg-blue-700 rounded-full px-3 py-1">
                01
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Register for free</h3>
            <p>
              To start using our auction, you’ll need to register. It’s
              completely free and requires just a few clicks!
            </p>
          </div>
          <div>
            <Undo className="mt-6 w-14 h-14 rotate-180 " />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 text-center">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto mb-2 relative">
                {/* <div className="absolute inset-0 m-auto rounded-full bg-blue-950 w-16 h-16"></div> */}
                <img src={step2} alt="step2" className="relative z-10" />
              </div>
              <span className="text-sm font-semibold bg-blue-700 rounded-full px-3 py-1">
                02
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Buy or Bid</h3>
            <p>
              To start using our auction, you’ll need to register. It’s
              completely free and requires just a few clicks!
            </p>
          </div>
          <div>
            <Undo className="mt-6 w-14 h-14 rotate-180 " />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 text-center">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto mb-2 relative">
                {/* <div className="absolute inset-0 m-auto rounded-full bg-blue-950 w-16 h-16"></div> */}
                <img src={step3} alt="step3" className="relative z-10" />
              </div>
              <span className="text-sm font-semibold bg-blue-700 rounded-full px-3 py-1">
                03
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Submit a Bid</h3>
            <p>
              To start using our auction, you’ll need to register. It’s
              completely free and requires just a few clicks!
            </p>
          </div>
          <div>
            <Undo className="mt-6 w-14 h-14 rotate-180 " />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 text-center">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto mb-2 relative">
                {/* <div className="absolute inset-0 m-auto rounded-full bg-blue-950 w-16 h-16"></div> */}
                <img src={step4} alt="step4" className="relative z-10" />
              </div>
              <span className="text-sm font-semibold bg-blue-700 rounded-full px-3 py-1">
                04
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Win</h3>
            <p>
              To start using our auction, you’ll need to register. It’s
              completely free and requires just a few clicks!
            </p>
          </div>
        </div>
      </div>
    </body>
  );
};
export default Working;
