import { useEffect, useState } from 'react';
import axios from '../../lib/axios';

const TopBanner = () => {
  const [banner, setBanner] = useState({
    title: '',
    category: '',
    rating: '',
    address: '',
    bannerImageUrl: '',
    reviewCount: '',
    subImages: [],
  });
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/activities/901');
      setBanner(response.data);
    };

    getData();
  }, []);

  return (
    <>
      {/* Title Header */}
      <div>
        <span>{banner.category}</span>
        <h1 className="text-4xl">{banner.title}</h1>
        <div>
          <div>
            ✨ {banner.rating}({banner.reviewCount})
          </div>
          <span>{banner.address}</span>
        </div>
        <div>kebab</div>
      </div>
      {/* Image Contents */}
      <div>
        <img src={banner.bannerImageUrl} alt="Banner Main" />
        {banner.subImages.map(({ imageUrl }) => (
          <img src={imageUrl} alt="Banner Sub" />
        ))}
      </div>
    </>
  );
};

export default TopBanner;
