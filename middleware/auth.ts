import { useAuth } from '../store/auth';

export default defineNuxtRouteMiddleware(async ({ path }) => {
  const { $pinia } = useNuxtApp();
  const { isLoggedIn, user } = useAuth($pinia);

  if (!isLoggedIn) {
    // if (token) {
    //   const data = await refresh<{ user: User; token: string }>();
    // }

    return navigateTo('/login', { replace: true });
  }

  if (!user?.password_changed_at && path !== '/password/create') {
    return navigateTo('/password/create', { replace: true });
  }
});
