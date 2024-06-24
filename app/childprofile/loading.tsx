import Image from "next/image";
import React from "react";
import loadingState from "@/public/images/loadingstate.gif"
const loading = () => {
  return <div className='flex items-center justify-center p-4'>
    <Image src={loadingState} alt="loading state" width={150} />
  </div>
};

export default loading;
