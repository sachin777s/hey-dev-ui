import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/heydev192x192.png";
import { Button } from "@nextui-org/react";
import NET_EFFECT from "vanta/dist/vanta.net.min";
import { IoLogInOutline } from "react-icons/io5";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Authentication() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET_EFFECT({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3a842b,
          backgroundColor: 0x0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <main
      ref={myRef}
      className="flex items-center sm:justify-center flex-col min-h-screen gap-4"
    >
      <div className="w-full sm:w-[500px] p-6 bg-black border border-color sm:rounded-2xl shadow-lg flex flex-col z-20">
        <img className="mx-auto w-[200px]" src={Logo} alt="..." />
        <h1
          h1
          className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-white to-[var(--main-color)] bg-clip-text text-transparent"
        >
          Welcome to Hey Dev
        </h1>
        <p className="text-lg text-center mb-6 opacity-70 bg-gradient-to-l from-white to-[var(--main-color)] bg-clip-text text-transparent">
          A platform to connect, create, and collaborate with developers
          worldwide.
        </p>
        <div className="flex flex-col gap-4">
          <SignedOut>
            <SignInButton>
              <Button className="w-full bg-[var(--main-color)] text-black">
                <IoLogInOutline />
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
      <ul className="px-2 w-full flex flex-col items-center gap-3 z-20 bg-black">
        <li className="px-4 py-2 w-full sm:max-w-[500px] rounded-xl border border-[var(--main-color)] opacity-70 bg-gradient-to-l from-white to-[var(--main-color)] bg-clip-text text-transparent">
          Create your space in the dev universe! Meet fellow coders, brainstorm
          ideas, and team up to build the next big thing.
        </li>
        <li className="px-4 py-2 w-full sm:max-w-[500px] rounded-xl border border-[var(--main-color)] opacity-70 bg-gradient-to-l from-white to-[var(--main-color)] bg-clip-text text-transparent">
          Where developers and companies vibe together! Collaborate, create, and
          make magic happen in the world of code.
        </li>
        <li className="px-4 py-2 w-full sm:max-w-[500px] rounded-xl border border-[var(--main-color)] opacity-70 bg-gradient-to-l from-white to-[var(--main-color)] bg-clip-text text-transparent">
          Build your dream team! Companies can create accounts on Hey Dev to
          uncover fresh talent and connect with innovators.
        </li>
      </ul>
    </main>
  );
}

export default Authentication;
