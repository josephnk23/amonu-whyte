
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

export const HeaderSection = (): JSX.Element => {
  return (
    
    <nav className="w-full mt-20 py-5 px-5 bg-white border-b border-[#cccccc]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              className="font-normal text-[15px] mx-5  text-[#4c4c4c] font-['DM_Sans',Helvetica] leading-[27px]"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-[15px] text-[#4c4c4c] font-['DM_Sans',Helvetica] leading-[27px]" />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-normal text-[15px] text-[#18191a] font-['DM_Sans',Helvetica] leading-[27px]">
              Shop 
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};
