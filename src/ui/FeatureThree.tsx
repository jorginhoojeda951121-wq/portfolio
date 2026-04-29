"use client";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import Image from "next/image";

/* eslint-disable react/no-unescaped-entities */

const imageLink = {
  frontend: (
    <Image
      src="/frontend.png"
      alt="frontend"
      className="max-h-[250px] w-full h-full object-cover"
      width={500}
      height={250}
    />
  ),
  backend: (
    <Image
      src="/backend.jpg"
      alt="backend"
      className="max-h-[250px] w-full h-full object-cover"
      width={500}
      height={250}
    />
  ),

  ai: (
    <Image
      src="/AI.png"
      alt="ai"
      className="max-h-[250px] w-full h-full object-cover"
      width={500}
      height={250}
    />
  ),

  blockchain: (
    <Image
      src="/blockchain.jpg"
      alt="blockchain"
      className="max-h-[250px] w-full h-full object-cover"
      width={500}
      height={250}
    />
  ),
};

export function FeatureThree() {
  const { theme, resolvedTheme } = useTheme();

  const effectiveTheme = theme === "system" ? resolvedTheme : theme;

  const skills = [
    {
      key: "frontend",
      image: imageLink.frontend,
      title: "Frontend",
      description: (
        <div>
          <p className="mb-2">Building beautiful, interactive UIs:</p>
          <div className="flex flex-wrap gap-1 justify-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">React.js</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">Next.js</span>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">Vue.js</span>
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">Angular</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">TypeScript</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            <span className="bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded text-xs">Tailwind CSS</span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs">Material-UI</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">Bootstrap</span>
          </div>
        </div>
      ),
      borderBeamSize: 120,
    },
    {
      key: "backend",
      image: imageLink.backend,
      title: "Backend",
      description: (
        <div>
          <p className="mb-2">Robust APIs & scalable systems:</p>
          <div className="flex flex-wrap gap-1 justify-center">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Go</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Python</span>
            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded text-xs">Ruby</span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs">PHP</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs">C#</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">Node.js</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">Express.js</span>
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">Nest.js</span>
            <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded text-xs">Django</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">Flask</span>
            <span className="bg-pink-200 text-pink-900 px-2 py-0.5 rounded text-xs">Ruby on Rails</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">Laravel</span>
            <span className="bg-gray-300 text-gray-900 px-2 py-0.5 rounded text-xs">.NET</span>
          </div>
          <p className="mt-2 text-xs italic text-slate-500">Favorite stack: Node.js + Express.js + TypeScript</p>
        </div>
      ),
      borderBeamSize: 120,
    },
    {
      key: "blockchain",
      image: imageLink.blockchain,
      title: "Blockchain & Web3",
      description: (
        <div>
          <p className="mb-2">Smart contracts & decentralized apps:</p>
          <div className="flex flex-wrap gap-1 justify-center">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Solidity</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs">Hardhat</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Ethers.js</span>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">Web3.js</span>
            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded text-xs">Smart Contracts</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">Solana</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">Rust</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">Polygon</span>
          </div>
          <p className="mt-2 text-xs italic text-slate-500">Specialty: NFT & DeFi dApps</p>
        </div>
      ),
      borderBeamSize: 120,
    },
    {
      key: "ai",
      image: imageLink.ai,
      title: "AI & Machine Learning",
      description: (
        <div>
          <p className="mb-2">AI-powered solutions & automation:</p>
          <div className="flex flex-wrap gap-1 justify-center">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Python</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">TensorFlow</span>
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">PyTorch</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">OpenAI API</span>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">LangChain</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">NLP</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">Chatbots</span>
            <span className="bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded text-xs">AI Automation</span>
          </div>
          <p className="mt-2 text-xs italic text-slate-500">Love building: Chatbots & AI-powered apps</p>
        </div>
      ),
      borderBeamSize: 100,
    },
  ];

  return (
    <div className="w-full py-20 dark:bg-slate-900/30 bg-gray-100/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
        <div className="mx-auto max-w-xl text-center">
          <h2 className=" text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 from-10% via-violet-500 via-30% to-sky-500 to-90%">
            Skills & Services
          </h2>
          <p className="mt-4 text-base leading-relaxed ">
            These are my working Skills & Services I have done.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8 lg:px-0 px-6 text-center sm:gap-12 justify-center items-center w-full">
          {skills.map((skill) => (
            <MagicCard
              key={skill.key}
              gradientColor={effectiveTheme === "dark" ? "#334155" : "#e0e7ff"}
            >
              <div className="rounded-lg p-5 w-full">
                <div className="flex h-full w-full items-center justify-center rounded-full ">
                  {skill.image}
                </div>
                <h3 className="mt-8 text-lg font-semibold ">{skill.title}</h3>
                <div className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{skill.description}</div>
              </div>
              <BorderBeam
                className="rounded-xl"
                size={skill.borderBeamSize}
                duration={12}
                delay={9}
              />
            </MagicCard>
          ))}
        </div>
      </div>
    </div>
  );
}
