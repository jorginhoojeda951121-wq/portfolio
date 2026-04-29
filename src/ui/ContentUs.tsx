import BoxReveal from "@/components/ui/box-reveal";
import myPhoto from "../../public/myphoto.jpg";
import ShinyButton from "@/components/ui/shiny-button";
import Image from "next/image";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";

/* eslint-disable react/no-unescaped-entities */
export const ContentUs = () => {
  return (
    <div className="relative flex flex-col-reverse rounded-xl py-16 my-20 pt-20 lg:dark:bg-slate-900 lg:bg-slate-100 lg:pt-0 lg:flex-col lg:pb-0">
      <BackgroundBeams />
      <div className="inset-y-0 top-0 right-0 z-0 w-full  rounded-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full w-24 z-10 dark:text-slate-900 text-slate-100 transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <rect width="100" height="100" />
        </svg>

        <Image
          width={300}
          height={300}
          className="object-cover z-50 overflow-hidden w-full h-56 rounded-xl shadow-lg lg:shadow-none md:h-96 lg:h-full"
          placeholder="blur"
          src={myPhoto}
          alt="Maxwell Carter Images"
        />
      </div>

      <div className="relative flex flex-col items-start w-full z-10  mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5 z-10">
          <BoxReveal boxColor={"#6366f1"} duration={0.5}>
            <p className="text-[2rem] font-semibold rounded-lg flex items-center gap-2">
              <svg className="inline-block w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" /></svg>
              About Me<span className="text-[#6366f1]">.</span>
            </p>
          </BoxReveal>
          <div className="my-8 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-0 overflow-hidden max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-0">
              <div className="flex-1 px-8 py-8">
                <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-1">Maxwell Carter</h2>
                <h3 className="text-base font-medium text-slate-700 dark:text-slate-200 mb-1">Senior Full Stack Engineer</h3>
                <p className="text-base text-slate-800 dark:text-slate-100 mb-4">
                  As a Senior Full Stack Engineer with over 9 years of experience, I specialize in building robust, high-performance web, mobile, and blockchain solutions. I thrive on designing scalable architectures, optimizing user experiences, and leading teams to deliver impactful products. My passion lies in blending innovation and technology to create seamless, intuitive applications that drive real value for users and businesses alike.
                </p>
                <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>
                <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01.88 7.903A5.5 5.5 0 1112 6.5c.338 0 .672.03 1 .086" /></svg>
                  Key Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Frontend: React.js, Next.js, Vue.js, Angular, TypeScript</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Backend: Node.js, Go, Django, Ruby on Rails, .NET</span>
                  <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">Cloud: AWS, Firebase, Google Cloud</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">AI/ML: Python, TensorFlow, OpenAI API</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">Blockchain & Web3: Solidity, Hardhat, Ethers.js</span>
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">eCommerce: Shopify, Liquid</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center z-10">
            <Link href="/contact">
              <ShinyButton>Contact Me</ShinyButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
