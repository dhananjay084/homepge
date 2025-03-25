import BannerImage from "../../assets/banner-image.webp"

const Banner = () => {
  return (
    <div
      className="relative flex items-center justify-center max-w-[95%] mx-auto  bg-contain bg-center p-4 mt-4 rounded-lg"
      style={{ backgroundImage: `url(${BannerImage})` ,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}
    >
      <div className="absolute inset-0 px-4"></div>
      <div className="relative leading-none text-white ">
        <p className="mt-2 text-lg md:text-xl max-w-[50%]">Every day we 
<span className="bg-[#592EA9] p-1 rounded-lg"> discuss</span> the most 
interesting things</p>
      
      </div>
    </div>
  );
};

export default Banner;


