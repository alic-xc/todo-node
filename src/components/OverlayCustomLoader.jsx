import LogoBlack from "../assets/logo-black.png";

const OverlayCustomLoader = () => {
  return (
    <div className="w-full h-screen flex-1 flex justify-center place-items-center">
      <div className="flex flex-col justify-center">
        <img src={LogoBlack} className="w-96 ml-5" />
        <h1 className="text-xl ">
          Kindly bear with us as we configure this platform.
        </h1>
        <h1>Powered by Bookr</h1>
      </div>
    </div>
  );
};

export default OverlayCustomLoader;
