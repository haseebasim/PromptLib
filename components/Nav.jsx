"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  });
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          className="object-contain"
          alt="promptopia-log"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={"/assets/images/logo.svg"}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <SignInButton providers={providers} />
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={"/assets/images/logo.svg"}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => setToggle((prev) => !prev)}
            />
            {toggle && (
              <div className="dropdown">
                <DropDownLink text={"My Profile"} href={"/profile"} />
                <DropDownLink text={"Create Prompt"} href={"/create-prompt"} />
                <button
                  type="button"
                  onClick={() => {
                    setToggle(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <SignInButton providers={providers} />
        )}
      </div>
    </nav>
  );
};

const DropDownLink = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="dropdown_link"
      onClick={() => setToggle(false)}
    >
      {text}
    </Link>
  );
};

const SignInButton = ({ providers }) => {
  return (
    providers &&
    Object.values(providers).map((provider) => {
      return (
        <button
          type="button"
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className="black_btn"
        >
          Sign In
        </button>
      );
    })
  );
};

export default Nav;
