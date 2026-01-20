/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ChevronDown, Linkedin, Mail, Phone, Youtube } from "react-feather";
import { locationsLinks, propertiesLinks, servicesLinks } from "../utils/menu";
import MenuIcon from "./widgets/MenuIcon";

import { attributes as data } from "../content/settings.md";
import TiktokIcon from "./widgets/TiktokIcon";
import Modal from "./widgets/Modal";
import LocationSelector from "./LocationSelector";

const Nav = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLocationDropDown, setShowLocationDropDown] = useState(false);

  useEffect(() => {
    setShowLocationDropDown(false);

    return () => {};
  }, [router.asPath]);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(!menuOpen);
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  useEffect(() => {
    setMenuOpen(false);
    return () => {};
  }, [router.asPath]);

  const linkStyles = (slug) =>
    slug === router.asPath ? `text-base text-primary` : "text-base";

  return (
    <>
      <nav className="w-full relative z-[100] bg-charcoal">
        <div className="bg-white/10 h-10 w-full hidden items-center">
          <div className="container flex flex-wrap justify-end w-full text-white">
            <a
              href={`tel:+${data.phone}`}
              className="flex ml-4 items-center hover:underline"
            >
              <Phone className="block p-[3px] bg-accent text-secondary mr-2 rounded-sm h-[20px] w-auto" />
              <span className="text-sm hidden lg:inline-block">
                {data.phone} {data.phone2}
              </span>
              <span className="text-sm lg:hidden">Call Us</span>
            </a>
            <a
              href={`mailto:${data.email}`}
              className="flex ml-4 items-center hover:underline"
            >
              <Mail className="block p-[3px] bg-accent text-secondary mr-2 rounded-sm h-[20px] w-auto" />
              <span className="hidden text-sm">{data.email}</span>
              <span className="inline-block text-sm">Send Email</span>
            </a>
            <ul className="hidden md:flex items-center space-x-3 ml-4">
              <li>
                <a
                  href={data.twitter}
                  title="twitter"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-transparent w-7 h-7 hover:text-gold"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href={data.facebook}
                  title="facebook"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-transparent w-7 h-7 hover:text-gold"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href={data.instagram}
                  title="instagram"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-transparent w-7 h-7 hover:text-gold"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href={data.tiktok}
                  title="tiktok"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-transparent w-7 h-7 hover:text-gold"
                >
                  <TiktokIcon className="w-4 h-4 fill-white" />
                </a>
              </li>
              <li>
                <a
                  href={data.youtube}
                  title="youtube"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-transparent w-7 h-7 hover:text-gold"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white h-[100px] w-full flex items-center">
          <div className="container h-full w-full flex justify-between items-center">
            <div className="h-full flex">
              <Link href="/" className="h-full flex items-center mr-6">
                <img
                  className="h-[80px] w-auto"
                  src="/logo.png"
                  alt={data.siteName}
                />
              </Link>
              {/* Links */}
              <div
                className={`fixed bg-gray-200 md:bg-inherit md:relative top-[100px] md:top-auto left-0 w-vw md:w-auto px-4 md:px-0 ${
                  menuOpen
                    ? "h-[calc(100vh-100px)] overflow-auto"
                    : "h-0 overflow-hidden"
                } md:h-auto md:overflow-visible flex flex-wrap items-center`}
              >
                <Link
                  href="/"
                  className="flex items-center w-full md:w-auto mx-0 my-4 md:my-0 md:mx-4 hover:text-gold"
                >
                  <span className={linkStyles("/")}>Home</span>
                </Link>

                <div className="group relative w-full md:w-auto">
                  <button
                    onClick={() =>
                      setShowLocationDropDown(!showLocationDropDown)
                    }
                    className="flex items-center mx-4 h-[100px] box-border md:group-hover:border-t-4 group-hover:border-t-gold group-hover:text-gold"
                  >
                    <span className="text-base ">Locations</span>
                  </button>
                </div>
                <div className="group relative w-full md:w-auto">
                  <Link
                    href="/properties"
                    className="flex items-center mx-4 h-[100px] box-border md:group-hover:border-t-4 group-hover:border-t-gold group-hover:text-gold"
                  >
                    <span className="text-base ">For Rent</span>
                    <ChevronDown className="ml-2 group-hover:rotate-180 duration-300" />
                  </Link>
                  <div className="block md:hidden group-hover:block md:absolute bg-white rounded w-full md:w-[280px] md:max-h-[450px] overflow-y-auto z-20 md:shadow-lg">
                    {propertiesLinks.map((i) => (
                      <Link
                        key={`${i.title}-rent`}
                        href={`/${i.slug}-for-rent`}
                        className="text-base p-4 flex items-center text-black hover:bg-primary hover:text-white"
                      >
                        <span>{i.title} for rent</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="group relative w-full md:w-auto">
                  <Link
                    href="/properties"
                    className="flex items-center mx-4 h-[100px] box-border md:group-hover:border-t-4 group-hover:border-t-gold group-hover:text-gold"
                  >
                    <span className="text-base ">For Sale</span>
                    <ChevronDown className="ml-2 group-hover:rotate-180 duration-300" />
                  </Link>
                  <div className="block md:hidden group-hover:block md:absolute bg-white rounded w-full md:w-[280px] md:max-h-[450px] overflow-y-auto z-20 md:shadow-lg">
                    {propertiesLinks.map((i) => (
                      <Link
                        key={`${i.title}-sale`}
                        href={`/${i.slug}-for-sale`}
                        className="text-base p-4 flex items-center text-black hover:bg-primary hover:text-white"
                      >
                        <span>{i.title} for sale</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="group relative w-full md:w-auto">
                  <Link
                    href="/"
                    className="flex items-center mx-4 h-[100px] box-border md:group-hover:border-t-4 group-hover:border-t-gold group-hover:text-gold"
                  >
                    <span className="text-base ">Services</span>
                    <ChevronDown className="ml-2 group-hover:rotate-180 duration-300" />
                  </Link>
                  <div className="block md:hidden group-hover:block md:absolute bg-white rounded w-full md:w-[280px] md:max-h-[450px] overflow-y-auto z-20 md:shadow-lg">
                    {servicesLinks.map((i) => (
                      <Link
                        key={i.title}
                        href={i.link}
                        className="text-base p-4 flex items-center text-black hover:bg-primary hover:text-white"
                      >
                        <span>{i.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="flex w-full md:w-auto mx-0 items-center my-4 md:my-0 md:mx-4 hover:text-gold"
                >
                  <span className={linkStyles("/blog")}>Blog</span>
                </Link>

                <Link
                  href="/about-us"
                  className="flex items-center w-full md:w-auto mx-0 my-4 md:my-0 md:mx-4 hover:text-gold"
                >
                  <span className={linkStyles("/about-us")}>About Us</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Link
                href="/contact-us"
                className="group px-6 py-2 bg-primary text-white hover:bg-secondary rounded-sm  rounded-tr-xl flex items-center h-12 hover:text-white"
              >
                Contact Us
              </Link>
            </div>
            <MenuIcon active={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </nav>
      <Modal
        isOpen={showLocationDropDown}
        onClose={() => setShowLocationDropDown(false)}
      >
        <LocationSelector />
      </Modal>
    </>
  );
};

export default Nav;
