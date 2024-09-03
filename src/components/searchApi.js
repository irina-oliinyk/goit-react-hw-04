import axios from "axios";

const accessKey = "LvonyJIUqq_C4DM92O1-SXSOzMcmquVzGSZR1JHVNp8";

export default async function searchApi(topic, page) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    params: {
      query: topic,
      page,
      per_page: 12,
    },
  });
  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
}
