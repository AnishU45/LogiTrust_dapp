import React from "react";
import { CheckCircle2 } from "lucide-react";
import {  pricingOptions } from "../../constants";
const Pricing = () => {
    return (
        <div className="mt-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wider
      ">Plans</h2>
            <div className="flex flex-wrap justify-center gap-5">
                {pricingOptions.map((option, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                        <div className="p-10 border >border-neutral-700 rounded-xl">
                            <p className="text-4xl mb-8">
                                {option.title}
                                {option.title === "Prime" && (<span className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-xl mb-4 ml-2">(Most Popular)</span>)}
                            </p>
                           
                            <ul>{option.features.map((features, index) => (
                                <li key={index} className="mt-8 flex items-center"><CheckCircle2 />
                                    <span className="ml-2">{features}</span></li>
                            ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;