import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import decode from 'jwt-decode';

interface WithSSRAuthOption {
  isDeveloper?: boolean;
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, { isDeveloper }: WithSSRAuthOption) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['zombieGames.token'];

    if(!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if(isDeveloper) {
      const user = decode<{ email: string, is_developer: string }>(token);
      
      if(!user.is_developer) {
        return {
          redirect: {
            destination: '/home',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx);
    } catch(err) {
      console.log('teste')
      destroyCookie(ctx, 'zombieGames.token');
      destroyCookie(ctx, 'zombieGames.refreshToken');

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
}