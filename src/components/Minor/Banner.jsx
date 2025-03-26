import BannerImage from "../../assets/banner-image.webp"

const Banner = ({ Text, ColorText, BgImage }) => {
  return (

    <div
      className="relative flex items-center justify-center max-w-[95%] mx-auto  bg-contain bg-center p-4 mt-4 rounded-lg min-h-[105px]"
      style={{ backgroundImage: `url(${BgImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 px-4"></div>
      <div className="relative leading-none text-white ">
        <p className="mt-2 text-lg md:text-xl max-w-[50%]">{Text}
         {ColorText && <span className="bg-[#592EA9] p-1 rounded-lg"> {ColorText}</span>}
        </p>

      </div>
    </div>
  );
};
Banner.defaultProps = {
  Text: "",
  ColorText: "",
  BgImage: "", 
};

export default Banner;


