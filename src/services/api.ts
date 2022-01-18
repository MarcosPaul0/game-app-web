import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['zombieGames.token']}`
    }
  });

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if(error.response.status === 401) {
      if(error.response.data?.code === 'expired.token') {
        cookies = parseCookies(ctx);
        
        const { 'zombieGames.refreshToken': refreshTokenId } = cookies;
        const originalConfig = error.config;
        
        if(!isRefreshing) {
          isRefreshing = true;
          
          api.post('/refreshToken', {
            refreshTokenId
          }).then(response => {
            const { token, 'refreshToken': newRefreshToken } = response.data;
            
            setCookie(ctx, 'zombieGames.token', token, {
              maxAge: 60 * 60 * 15,
              path: '/'
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            if(newRefreshToken) {
              setCookie(ctx, 'zombieGames.refreshToken', newRefreshToken.id, {
                maxAge: 60 * 60 * 24 * 15,
                path: '/'
              })
            }

            failedRequestsQueue.forEach(request => request.onSuccess(token));
            failedRequestsQueue = [];
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err));
            failedRequestsQueue = [];

            if(process.browser) {
              destroyCookie(ctx, 'zombieGames.token');
              destroyCookie(ctx, 'zombieGames.refreshToken');

              Router.push('/');
            }
          }).finally(() => {
            isRefreshing = false;
          });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            }
          })
        });
      } else {
        if(process.browser) {
          destroyCookie(ctx, 'zombieGames.token');
          destroyCookie(ctx, 'zombieGames.refreshToken');

          Router.push('/');
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
    }

    return Promise.reject(error);
  })

  return api;
}
