import React from "react";

export const FooterByAnima = (): JSX.Element => {
  // Data for the footer features
  const footerFeatures = [
    "Free Standard Delivery",
    "100% SECURE PAYMENTS",
    "CUSTOMER SUPPORT",
    "free & easy returns",
  ];

  return (
    <footer className="flex flex-col items-center gap-[26px] pt-[67px] pb-px w-full bg-elfridaqodeinteractivecomcod-gray">
      {/* Logo */}
      <div className="inline-flex items-start">
        <div className="relative w-[107.16px] h-[100px] bg-[url(/newlogo.png)] bg-cover bg-[50%_50%]" />
      </div>

      {/* Heading */}
      <div className="items-center w-full flex flex-col">
        <h2 className="font-elfrida-qodeinteractive-com-semantic-heading-6-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-6-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-6-upper-font-size)] text-center tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-6-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-6-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-6-upper-font-style)]">
          USER INTERFACE DESIGN, INTERACTION, DESIGN SYSTEMS
          <br />
          &amp; ART DIRECTION.
        </h2>
      </div>

      {/* Feature boxes */}
      {/* <div className="flex w-full px-4 pt-[49px]">
        <div className="grid grid-cols-4 w-full">
          {footerFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex border border-solid border-[#636363]"
            >
              <div className="flex items-center justify-center px-5 py-[43px] w-full">
                <span className="tracking-[var(--elfrida-qodeinteractive-com-outfit-regular-upper-letter-spacing)] font-elfrida-qodeinteractive-com-outfit-regular-upper [font-style:var(--elfrida-qodeinteractive-com-outfit-regular-upper-font-style)] font-[number:var(--elfrida-qodeinteractive-com-outfit-regular-upper-font-weight)] leading-[var(--elfrida-qodeinteractive-com-outfit-regular-upper-line-height)] text-[length:var(--elfrida-qodeinteractive-com-outfit-regular-upper-font-size)] text-wwwmacofalltradescomwhite text-center">
                  {feature}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </footer>
  );
};
