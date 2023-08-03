import { defineStore } from 'pinia';
import { Admin } from '../types/models';
import { useApiRequest } from '~~/utils/hooks/api';

export type AuthState = {
  token?: string;
  user?: Partial<Admin>;
};

/*
--------------------------------------------------------------------------------------------------------
| Authentication Store.
--------------------------------------------------------------------------------------------------------
*/
export const useAuth = defineStore(
  'auth',
  () => {
    const router = useRouter();
    const { load: refresh } = useApiRequest<{
      user: Admin;
      token: string;
    }>({
      url: '/auth/refresh',
      authorize: true,
      onSuccess: (data) => data?.data && login(data?.data),
    });
    const {
      public: { assetsBaseURL },
    } = useRuntimeConfig();

    /*
    --------------------------------------------------------------------------------------------------------
    | Authentication State.
    --------------------------------------------------------------------------------------------------------
    */
    const isLoggedIn = ref<boolean>(false);
    const token = ref<string>();
    const user = ref<Partial<Admin>>();

    /*
    --------------------------------------------------------------------------------------------------------
    | Getters.
    --------------------------------------------------------------------------------------------------------
    */
    const avatar = computed(() => {
      const avatar = user.value?.avatar;
      if (!avatar) return null;

      return `${assetsBaseURL}/${avatar}`;
    });
    const name = computed(() => {
      return user.value && `${user.value?.first_name} ${user.value?.last_name}`;
    });
    const initials = computed(() => {
      return (
        user.value &&
        `${user.value?.first_name?.[0]}${user.value?.last_name?.[0]}`
      );
    });

    /*
    --------------------------------------------------------------------------------------------------------
    | Actions.
    --------------------------------------------------------------------------------------------------------
    */
    const updateUser = (payload: Admin) => (user.value = payload);
    const updatePassword = () => {
      if (!user.value) return;
      user.value.password_changed_at = new Date().toDateString();
    };
    const login = (payload: AuthState): void => {
      isLoggedIn.value = !!(payload.token && payload.user);
      token.value = payload.token;
      user.value = payload.user;
    };
    const logout = (): void => {
      isLoggedIn.value = false;
      token.value = undefined;
      user.value = undefined;
      router.push('/login');
    };

    /*
    --------------------------------------------------------------------------------------------------------
    | Data to be made accessible to the application.
    --------------------------------------------------------------------------------------------------------
    */
    return {
      isLoggedIn,
      token,
      user,
      avatar,
      name,
      initials,
      updateUser,
      updatePassword,
      login,
      logout,
      refresh,
    };
  },
  {
    persist: {
      storage: persistedState.cookies,
      // paths: ['token'],
    },
  },
);
