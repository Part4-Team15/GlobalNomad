import FooterSocialIcon from './FooterSocialIcon';

const Footer = () => (
  <div className="flex bg-black sm:gap-3 md:px-[111px] md:justify-between lg:px-[104px] pt-8 text-[#676767] justify-around h-40 text-base relative">
    <div>&copy;codeit - 2024</div>
    <div className="flex gap-[30px]">
      <div className="capitalize">privacy policy</div>
      <div className="uppercase">faq</div>
    </div>
    <div className="flex gap-3 sm:absolute sm:top-[60%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
      <FooterSocialIcon iconName="facebook" />
      <FooterSocialIcon iconName="twitter" />
      <FooterSocialIcon iconName="youtube" />
      <FooterSocialIcon iconName="instagram" />
    </div>
  </div>
);

export default Footer;
