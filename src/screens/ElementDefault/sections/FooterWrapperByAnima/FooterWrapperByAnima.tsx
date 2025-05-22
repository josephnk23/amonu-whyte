import { ArrowRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";

// Define footer link data for reusability
const aboutUsLinks = [
  "About Us",
  "Contact us",
  "Get In Touch",
  "Gift Card",
  "Our Store",
];

const helpLinks = ["Shop", "Cart", "Wishlist", "My Account", "Checkout"];

const legalLinks = ["Shop", "Cart", "Wishlist", "My Account", "Checkout"];

export const FooterWrapperByAnima = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start">
      <div className="relative w-full bg-elfridaqodeinteractivecomcod-gray py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter Section */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-elfrida-qodeinteractive-com-semantic-heading-4-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-style)]">
              BE THE FIRST TO KNOW ABOUT EVENTS,
              <br />
              NEW PRODUCTS &amp; OFFERS.
            </h4>

            <p className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular font-[number:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-style)]">
              *Subscribe to our Newsletter and get 15% off
            </p>

            <div className="relative flex w-full">
              <Input
                className="bg-transparent rounded-none border border-neutral-500 text-wwwmacofalltradescomwhite font-elfrida-qodeinteractive-com-semantic-input font-[number:var(--elfrida-qodeinteractive-com-semantic-input-font-weight)] text-[length:var(--elfrida-qodeinteractive-com-semantic-input-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-input-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-input-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-input-font-style)] h-14 pl-5"
                placeholder="Enter your email"
              />
              <Button
                
                className="absolute right-0 hover:bg-transparent rounded-none bg-transparent hover:text-black hover:text-wwwmacofalltradescomwhite h-14 w-14 flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRightIcon className="w-4 h-4 hover:text-black text-wwwmacofalltradescomwhite" />
              </Button>
            </div>
          </div>

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
              HELP
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
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full bg-elfridaqodeinteractivecomcod-gray py-3 px-4 md:px-8 lg:px-16 relative">
        <Separator className="absolute top-0 left-0 w-full bg-[#636363]" />

        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)]">
              © 2024
            </span>
            <span className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)]">
              Qode Interactive
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
            <a
              href="#"
              className="font-elfrida-qodeinteractive-com-outfit-regular font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-font-weight)] text-elfridaqodeinteractivecomsilver text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-font-style)] hover:text-wwwmacofalltradescomwhite transition-colors"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
