export type ActivityResponse = {
  activities: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
  }[]
};

export const EXAMPLE_ACTIVITY = {
  activities: [
    {
      id: 912,
      userId: 292,
      title: '테스트용 체험',
      description: '체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. 체험을 해봅시다. ',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl: '/assets/banner.jpg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-05-23T16:59:57.299Z',
      updatedAt: '2024-05-23T16:59:57.299Z'
    },
    {
      id: 901,
      userId: 292,
      title: '0520의 체험',
      description: '0520과 함께 체험해봐요!',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl: '/assets/banner.jpg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-05-21T15:09:21.090Z',
      updatedAt: '2024-05-21T15:09:21.090Z'
    },
    {
      id: 901,
      userId: 292,
      title: '0520의 체험',
      description: '0520과 함께 체험해봐요!',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl: '/assets/banner.jpg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-05-21T15:09:21.090Z',
      updatedAt: '2024-05-21T15:09:21.090Z'
    },
    {
      id: 901,
      userId: 292,
      title: '0520의 체험',
      description: '0520과 함께 체험해봐요!',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl: '/assets/banner.jpg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-05-21T15:09:21.090Z',
      updatedAt: '2024-05-21T15:09:21.090Z'
    }
  ],
  totalCount: 40
};
