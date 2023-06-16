import { useAuth } from '../store/auth';

export default defineNuxtRouteMiddleware(() => {
  const { $pinia } = useNuxtApp();
  const { isLoggedIn } = useAuth($pinia);

  if (isLoggedIn) {
    return navigateTo('/', { replace: true });
  }
});
