import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const instance = axios.create({
  baseURL: `https://api.github.com/users/`,
  headers: {
    Authorization: `token ${process.env.github_user_api_token}`,
  },
});

const getGithubRepoInfo = async (username, offset) => {
  try {
    let res = await instance.get(`${username}/repos`, {
      params: {
        sort: 'created',
        per_page: 10,
        page: offset,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (e) {
    return null;
  }
};

export default getGithubRepoInfo;
