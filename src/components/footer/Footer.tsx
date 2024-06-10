import FooterSocialIcon from './FooterSocialIcon';

const Footer = () => (
  <footer className="flex bg-[#112211] sm:justify-between sm:px-[39px] md:px-[111px] md:justify-between lg:px-[104px] pt-8 text-[#676767] justify-around h-40 relative">
    <p>&copy;codeit - 2024</p>
    <nav className="flex gap-[30px]">
      <a href="/" className="capitalize">
        privacy policy
      </a>
      <a href="/" className="uppercase">
        faq
      </a>
    </nav>
    <div className="flex gap-3 sm:absolute sm:top-[82px] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
      <FooterSocialIcon socialNetworkServiceName="facebook" />
      <FooterSocialIcon socialNetworkServiceName="twitter" />
      <FooterSocialIcon socialNetworkServiceName="youtube" />
      <FooterSocialIcon socialNetworkServiceName="instagram" />
    </div>
  </footer>
);

export default Footer;
