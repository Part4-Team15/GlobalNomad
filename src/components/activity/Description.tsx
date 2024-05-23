import { useEffect, useState } from 'react';
import axios from '../../lib/axios';

const Description = () => {
  const [description, setDescription] = useState('');
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/activities/901');
      setDescription(response.data.description);
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col w-3/4 gap-4">
      <div className="w-full h-0.5 bg-gray-40" />
      <h2 className="text-xl font-bold pt-6">체험 설명</h2>
      <p className="text-base font-normal text-gray-80 pb-6">{description}</p>
      <div className="w-full h-0.5 bg-gray-40" />
    </div>
  );
};

export default Description;
