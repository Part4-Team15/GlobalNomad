import MyActivityCardHeader from '@/components/myActivity/MyActivityCardHeader';
import MyActivityCardList from '@/components/myActivity/MyActivityCardList';

const MyActivityPage = () => {
  return (
    <section className="flex flex-col w-full max-w-[50rem] items-start">
      <MyActivityCardHeader />
      <MyActivityCardList />
    </section>
  );
};

export default MyActivityPage;
