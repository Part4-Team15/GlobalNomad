import { useEffect } from 'react';

interface MapProps {
  location: string;
}

const Map: React.FC<MapProps> = ({ location }) => {
  const { naver } = window;

  useEffect(() => {
    const mapDiv = document.getElementById('map');
    const map = new naver.maps.Map(mapDiv as HTMLElement);

    if (location) {
      naver.maps.Service.geocode(
        {
          query: location,
        },
        (status: any, res: any) => {
          if (status === naver.maps.Service.Status.OK) {
            const { x, y } = res.v2.addresses[0];

            const position = new naver.maps.LatLng(y, x);

            map.setCenter(position);

            (() => new naver.maps.Marker({ position, map }))();
          } else {
            console.error(
              'Geocode was not successful for the following reason:',
              status,
            );
          }
        },
      );
    }
  }, [location]);

  return (
    <div className="w-full py-8">
      <div id="map" className="w-full h-[450px]" />
      <div className="flex">
        <img src="/assets/location_icon.svg" alt="location icon" />
        <div className="text-gray-80">{location}</div>
      </div>
    </div>
  );
};

export default Map;
