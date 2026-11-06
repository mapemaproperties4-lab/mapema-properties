import React from "react";
import { attributes as data } from "../content/home.md";
import Link from "next/link";
import { ChevronRight } from "react-feather";

const HomeServices = () => {
  return (
    <>
      <section id="services" className="w-full relative mb-10">
        <div className="md:absolute md:inset-0">
          <div className="container w-full flex md:justify-start">
            <div className="md:w-1/2">
              <div className="px-2 md:px-10 py-14">
                <h2 className="font-bold font-serif mb-6">
                  <span className="text-5xl md:text-6xl text-black block mb-2">
                    Our Services
                  </span>
                </h2>
                <p className="text-lg text-slate-700 mb-4">
                  {data.servicesIntro}
                </p>
                <div>
                  {data.services.map((i) => (
                    <Link
                      key={i.title}
                      href={i.link}
                      className="hover:text-primary py-4 border-t last:border-b flex w-full justify-between items-center"
                    >
                      <span>{i.title}</span>
                      <ChevronRight />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:ml-[50%]">
          <img
            src="/img/land-2.jpg"
            alt="Ann Properties team"
            className="w-full h-[400px] lg:h-[500px] object-cover object-top rounded-bl-3xl"
          />
        </div>
      </section>
    </>
  );
};

export default HomeServices;
