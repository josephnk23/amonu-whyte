import { ArrowRightIcon, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";

// Define footer link data for reusability
const aboutUsLinks = [
  "About Us",
  "Contact us",
  
];

const helpLinks = [ "Shipping Info","Returns"];

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/amonuwhyte", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/amonuwhyte", icon: Instagram },
  { name: "Twitter", href: "https://twitter.com/amonuwhyte", icon: Twitter },
];

const legalLinks = ["Terms & Conditions", "Privacy Policy"];

export const FooterWrapperByAnima = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start">
      <div className="relative w-full bg-elfridaqodeinteractivecomcod-gray py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter Section */}
        
          {/* About Us Column */}
          <div className="flex flex-col space-y-4">
            <h5 className="font-elfrida-qodeinteractive-com-semantic-heading-5-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-style)]">
              ABOUT US
            </h5>
            <nav className="flex flex-col gap-1.5">
              {aboutUsLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular font-[number:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-style)] hover:text-wwwmacofalltradescomwhite transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Help Column */}
          <div className="flex flex-col space-y-4">
            <h5 className="font-elfrida-qodeinteractive-com-semantic-heading-5-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-style)]">
              SUPPORT
            </h5>
            <nav className="flex flex-col gap-1.5">
              {helpLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular font-[number:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-style)] hover:text-wwwmacofalltradescomwhite transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col space-y-4">
            <h5 className="font-elfrida-qodeinteractive-com-semantic-heading-5-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-style)]">
              LEGAL
            </h5>
            <nav className="flex flex-col gap-1.5">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular font-[number:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-style)] hover:text-wwwmacofalltradescomwhite transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

         <div className="flex flex-col md:flex-col items-start gap-4">
            <h5 className="font-elfrida-qodeinteractive-com-semantic-heading-5-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-style)]">
              FOLLOW US
            </h5>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Contact Info - Added here for better use of space */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-elfridaqodeinteractivecomsilver" />
                <span className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular text-elfridaqodeinteractivecomsilver text-sm">
                  +233 540279797
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-elfridaqodeinteractivecomsilver" />
                <span className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular text-elfridaqodeinteractivecomsilver text-sm">
                  amonuwhyte@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-elfridaqodeinteractivecomsilver" />
                <span className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular text-elfridaqodeinteractivecomsilver text-sm">
                  71 Gbolibor Street Labadi, Accra, Ghana
                </span>
              </div>
            </div>
          </div>
       
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full bg-elfridaqodeinteractivecomcod-gray py-3 px-4 md:px-8 lg:px-16 relative">
        <Separator className="absolute top-0 left-0 w-full bg-[#636363]" />

        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)]">
              © 2025
            </span>
            <span className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)]">
              Amonu Whyte
            </span>
            <span className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)]">
              , All Rights Reserved
            </span>
          </div>

          <div className="flex items-center gap-7">
            <a
              href="#"
              className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)] hover:text-wwwmacofalltradescomwhite transition-colors"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)] hover:text-wwwmacofalltradescomwhite transition-colors"
            >
              Privacy Policy
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};
