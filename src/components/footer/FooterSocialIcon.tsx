const FooterSocialIcon = ({ iconName }: { iconName: string }) => (
  <img
    src={`assets/${iconName}_icon.svg`}
    alt={`${iconName} logo`}
    className="cursor-pointer w-5 h-5"
  />
);

export default FooterSocialIcon;
