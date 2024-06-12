import axios from 'axios';

// Axios 인스턴스를 생성합니다.
const axiosInstance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/4-15',
});

// 요청 인터셉터를 설정합니다.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 accessToken을 가져옵니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 요청 헤더에 토큰을 설정합니다.
    }
    return config; // 변경된 config를 반환합니다.
  },
  (error) => Promise.reject(error), // 에러가 발생하면 Promise.reject를 반환합니다.
);

// 새로운 토큰을 가져오는 함수입니다.
const getNewTokens = async () => {
  const storedRefreshToken = localStorage.getItem('refreshToken');
  if (!storedRefreshToken) {
    throw new Error('No refresh token available'); // 리프레시 토큰이 없을 경우 에러를 발생시킵니다.
  }

  // 새로운 토큰을 요청합니다.
  const response = await axios.post('https://sp-globalnomad-api.vercel.app/4-15/auth/tokens', null, {
    headers: {
      Authorization: `Bearer ${storedRefreshToken}`,
    },
  });

  // 응답에서 새로운 accessToken과 refreshToken을 가져옵니다.
  const { accessToken, refreshToken: newRefreshToken } = response.data;

  // 새로운 토큰을 로컬 스토리지에 저장합니다.
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', newRefreshToken);

  return accessToken; // 새로운 accessToken을 반환합니다.
};

// 응답 인터셉터를 설정합니다.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        const newAccessToken = await getNewTokens();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
