import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    console.log(cookies)

    if(cookies['zombieGames.token']) {
      return {
        redirect: {
          destination: '/home',
          permanent: false
        }
      }
    }

    return await fn(ctx);
  }
}