const GET = 'GET';
const POST = 'POST';
const HEADERS = { 'Content-Type': 'application/json' };
const BASE_URL = 'http://localhost:8080/api';

export const registerUser = async user => {
  return new Promise(async (resolve, reject) => {
    const url = `${BASE_URL}/auth/register`;
    const method = POST;
    const headers = HEADERS;
    const body = JSON.stringify(user);
    const config = { method, headers, body };
    const stream = await fetch(url, config);
    if (stream.ok) {
      const response = await stream.json();
      resolve(response);
    } else {
      reject();
    }
  });
};

export const loginUser = async user => {
  return new Promise(async (resolve, reject) => {
    const url = `${BASE_URL}/auth/login`;
    const method = POST;
    const headers = HEADERS;
    const body = JSON.stringify(user);
    const config = { method, headers, body };
    const stream = await fetch(url, config);
    if (stream.ok) {
      const response = await stream.json();
      resolve(response);
    } else {
      reject();
    }
  });
};
