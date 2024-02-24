import Image from "next/image";
import Gallary from "./components/Gallary";
import Loading from "./components/Loading"
import { Suspense } from "react";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Gallary />
      </Suspense>

    </>

  );
}
