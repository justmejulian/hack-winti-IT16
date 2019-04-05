const GET = 'GET';
const POST = 'POST';
const HEADERS = { 'Content-Type': 'application/json' };
const BASE_URL = 'http://localhost:4000';

export const registerUser = async user => {
  return new Promise(async (resolve, reject) => {
    const url = `${BASE_URL}/register`;
    const method = POST;
    const headers = HEADERS;
    const body = JSON.stringify(user);
    const config = { method, headers, body };
    const stream = await fetch(url, config);
    const response = await stream.json();
    if (response.ok) {
      resolve(response);
    } else {
      reject();
    }
  });
};

export const loginUser = async user => {
  return new Promise(async (resolve, reject) => {
    const url = `${BASE_URL}/login`;
    const method = POST;
    const headers = HEADERS;
    const body = JSON.stringify(user);
    const config = { method, headers, body };
    const stream = await fetch(url, config);
    const response = await stream.json();
    if (response.ok) {
      resolve(response);
    } else {
      reject();
    }
  });
};
