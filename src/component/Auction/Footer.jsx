import { quickLinks, helpCenter, contactUs } from "../../constants";

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700 ">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4 ml-20">Resources</h3>
          <ul className="space-y-2 ml-20">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a
                  className="text-neutral-300 hover:text-white"
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4 ml-20">Platform</h3>
          <ul className="space-y-2 ml-20">
            {helpCenter.map((link, index) => (
              <li key={index}>
                <a
                  className="text-neutral-300 hover:text-white"
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4 ml-10">Community</h3>
          <ul className="space-y-2 ml-10">
            {contactUs.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-neutral-300 hover:text-white">
                  {item.icon}
                </span>
                <a
                  className="text-neutral-300 hover:text-white ml-2"
                  href={item.href}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
