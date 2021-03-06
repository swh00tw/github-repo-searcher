import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const instance = axios.create({
  baseURL: `https://api.github.com/users/`,
  headers: {
    Authorization: `token ${process.env.github_user_api_token}`,
  },
});

const getGithubRepoInfo = async (username, offset, per_page) => {
  try {
    let res = await instance.get(`${username}/repos`, {
      params: {
        sort: 'created',
        per_page: per_page,
        page: offset,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (e) {
    return null;
  }
};

const getGithubUserInfo = async username => {
  try {
    let res = await instance.get(`${username}`);
    // console.log(res.data);
    return res.data;
  } catch (e) {
    return null;
  }
};

export { getGithubRepoInfo, getGithubUserInfo };
