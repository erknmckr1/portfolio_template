import { MessageCircle } from "lucide-react";
import React from "react";
type ServiceData = {
  description: string;
  title: string;
  id:number
};
function ServiceCard({ description, title,id }: ServiceData) {
  return (
    <div className={`${id % 2 === 0 ? "mr-20" : "ml-20"} max-w-2xl relative mx-auto bg-gray-200 p-10 shadow-lg`}>
      <div className="absolute -top-8 right-0 w-30 h-16 shadow-lg bg-yellow-400 ">
        <div className="w-full h-full flex justify-center items-center">
          <MessageCircle className="" size={40} />
        </div>
      </div>
      <div className="relative  space-y-2 after:content-[''] after:h-1 after:w-full after:absolute after:-bottom-10 after:left-0 after:bg-black">
        <h2 className="font-semibold tracking-wide text-2xl">{title}</h2>
        <p className="text-gray-600 text-lg ">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
