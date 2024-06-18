import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MapSkeleton from '../skeletonUI/activity/MapSkeleton';

interface MapProps {
  location: string;
}

const KakaoMap: React.FC<MapProps> = ({ location }) => {
  const { kakao } = window as any;
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(location, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const { y, x } = result[0];
        setLatLng({ lat: parseFloat(y), lng: parseFloat(x) });
      }
    });
  }, [location]);

  if (!latLng) {
    return <MapSkeleton />;
  }

  return (
    <div className="w-full py-8">
      <div className="w-full h-[450px]">
        <Map
          center={latLng}
          style={{
            width: '100%',
            height: '450px',
          }}
          level={3}
        >
          <MapMarker position={latLng} />
        </Map>
      </div>
      <div className="flex">
        <img src="/assets/location_icon.svg" alt="location icon" />
        <div className="text-gray-80">{location}</div>
      </div>
    </div>
  );
};

export default KakaoMap;
