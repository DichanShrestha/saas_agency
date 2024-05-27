"use client";

import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "../ui/button";

export default function LandingPage() {
  return (
    <div className="relative">
      <Button className="absolute top-24 right-2 ">Login</Button>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                SwiftScribe
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
