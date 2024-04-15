import { BookCheck } from 'lucide-react';
import { MapPinned } from 'lucide-react';
import { View } from 'lucide-react';

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" }
];

export const features = [
  {
    icon: <MapPinned />,
    text: "Blockchain-based Tracking",
    description:
      "Utilizes blockchain to track products, shipments, and inventory throughout the entire supply chain.",
  },
  {
    icon: <View />,
    text: "Transparent Traceability",
    description:
      "Enables end-to-end visibility and traceability of products from their origin to the final destination.",
  },
  {
    icon: <BookCheck />,
    text: "Document Safety",
    description:
      "enhance trust, security, and efficiency in various use cases such as identity verification, and supply chain documentation verification.",
  },
  
];

export const pricingOptions = [
  {
    title: "Non-Prime",
    features: [
      "Flexibility",
      "Cost-Effectiveness",
      "Customized Cargo Handling"
    ],
  },
  {
    title: "Prime",
    features: [
      "Direct Port Access",
      "Streamlined Customs Clearance",
      "Enhanced Port Security Measures"
    ],
  }
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" }
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Jobs" },
  { href: "#", text: "Hackathons" },
];

