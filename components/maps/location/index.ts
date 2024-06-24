import dynamic from "next/dynamic";

const Maps = dynamic(() => import("./Maping"), {
  ssr: false,
});

export default Maps;
