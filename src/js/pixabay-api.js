import axios from "axios";


export async function fetchImage(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const searchParams = {
    key: '42093583-bfe36716eb3593f6644c471e3',
    q: searchQuery,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
  };

  const urlparams = new URLSearchParams(searchParams);
  const { data } = await axios.get(`${BASE_URL}${END_POINT}?${urlparams}`);
  return data;
}