import React from "react";
import { Button } from "../../components/ui/button";

import { Header } from "./sections/Header/Header";

import { FooterByAnima } from "./sections/FooterByAnima";
import { FooterWrapperByAnima } from "./sections/FooterWrapperByAnima/FooterWrapperByAnima";
import { MainByAnima } from "./sections/LandingPage";

export const ElementDefault = (): JSX.Element => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="relative w-full bg-white">
       <Header />
      <div className="w-full">
        <MainByAnima />
        {/* <Card className="flex items-center justify-center pt-[8.6px] pb-[9.4px] px-0 border-b-[0.8px] [border-bottom-style:solid] border-white w-full rounded-none shadow-none">
          <CardContent className="p-0">
            <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] font-elfrida-qodeinteractive-com-semantic-link font-[number:var(--elfrida-qodeinteractive-com-semantic-link-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-link-font-size)] text-center tracking-[var(--elfrida-qodeinteractive-com-semantic-link-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-link-line-height)] whitespace-nowrap [font-style:var(--elfrida-qodeinteractive-com-semantic-link-font-style)]">
                Step into our fashion boutique where elegance meets trendsetting
                style
              </p>
            </div>
          </CardContent>
        </Card> */}

      
      </div>

      <FooterByAnima />
      <FooterWrapperByAnima />
     

      <div className="flex flex-col w-[93px] h-[46px] items-start justify-center fixed bottom-[50px] right-[24px]">
        <Button
          className="relative flex-1 w-[93.28px] grow bg-wwwmacofalltradescommine-shaft border border-solid border-[#252525] rounded-none p-0 h-full"
          aria-label="Scroll to top"
          onClick={handleScrollToTop}
        >
          <img className="w-4 h-11" alt="Component" src="/component-1-5.svg" />
        </Button>
      </div>
    </div>
  );
};
