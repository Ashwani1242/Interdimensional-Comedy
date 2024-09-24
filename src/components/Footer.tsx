function Footer() {
  return (
    <div className="w-full border-t-2 border-white/20 py-20 flex flex-col justify-center items-center text-sm gap-y-20">
      <div className="flex gap-x-8 justify-center items-center">
        <div className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">
          Home
        </div>
        <div className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">
          Comedy Show
        </div>
        <div className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">
          Kid's Music
        </div>
        <div className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">
          Pricing
        </div>
        <div className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">
          Gallery
        </div>
        <div className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">
          What's New
        </div>
      </div>
      <div className="text-gray-400">Copyright © 2024 Interdimensional Comedy</div>
    </div>
  );
}

export default Footer;
