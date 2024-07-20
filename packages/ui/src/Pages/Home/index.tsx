import { useEffect } from "react";
import { useAxiosPrivate } from "../../hooks/usePrivateAxios";
import { endpointsV1 } from "../../environent/api-config";


function Home() {
  // const axiosPrivate = useAxiosPrivate()

  // useEffect(()=> {
  //   axiosPrivate.get(endpointsV1.wallet)
  //   .then(res => console.log)
  //   .catch(err => console.log)

  // }, [])
  return (
    <div className="flex w-full flex-wrap justify-center items-center ">
    </div>
  );
}

export default Home;