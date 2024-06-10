const FooterSocialIcon = ({ socialNetworkServiceName }: { socialNetworkServiceName: string }) => (
  <a href="/">
    <img
      src={`/assets/${socialNetworkServiceName}_icon.svg`}
      alt={`${socialNetworkServiceName} logo`}
      className="cursor-pointer w-5 h-5"
    />
  </a>
);

export default FooterSocialIcon;
