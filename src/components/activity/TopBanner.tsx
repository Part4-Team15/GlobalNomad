interface Activity {
  title: string;
  category: string;
  rating: string;
  address: string;
  reviewCount: string;
  description: string;
}

interface TopBannerProps {
  activity: Activity;
}

const TopBanner: React.FC<TopBannerProps> = ({ activity }) => {
  const { title, category, rating, address, reviewCount } = activity;

  return (
    <div className="w-full">
      {/* Banner Title */}
      <div className="flex flex-col w-full gap-2.5">
        <span className="text-gray-80 font-normal">{category}</span>
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <div className="flex">
              <img
                className="w-4"
                src="/assets/star_on_icon.svg"
                alt="rating star"
              />
              {rating}({reviewCount})
            </div>
            <img src="/assets/location_icon.svg" alt="location icon" />
            <span className="text-gray-80">{address}</span>
          </div>
          <img className="w-10" src="/assets/kebab_icon.svg" alt="kebab icon" />
        </div>
      </div>
      {/* Banner Images */}
      <div className="flex w-full rounded-lg gap-3 mt-8">
        {/* <img src="../samples/main_img.png" alt="main" /> */}
        <img
          className="w-[600px] rounded-l-xl"
          src="/assets/samples/main_img.png"
          alt="main"
        />
        <div className="grid grid-cols-2 gap-3">
          <img
            className="w-full h-full"
            src="/assets/samples/sub_img1.png"
            alt="sub1"
          />
          <img
            className="w-full h-full rounded-tr-xl"
            src="/assets/samples/sub_img2.png"
            alt="sub2"
          />
          <img
            className="w-full h-full"
            src="/assets/samples/sub_img3.png"
            alt="sub3"
          />
          <img
            className="w-full h-full rounded-br-xl"
            src="/assets/samples/sub_img4.png"
            alt="sub4"
          />
        </div>
        {/* <img src={bannerImageUrl} alt="Banner Main" />
        {subImages.map(({ imageUrl }) => (
          <img src={imageUrl} alt="Banner Sub" />
        ))} */}
      </div>
    </div>
  );
};

export default TopBanner;
