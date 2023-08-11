// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  css: [
    '~/assets/css/tailwind.css',
    '@/node_modules/toastr/build/toastr.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap',
          rel: 'stylesheet',
        },
      ],
      titleTemplate: (title) => {
        return title ? `${title} - Circle Admin` : 'Circle Admin';
      },
    },
  },
  runtimeConfig: {
    public: {
      apiTokenStorageKey:
        process.env.NUXT_API_TOKEN_STORAGE_KEY ?? 'circle-admin:auth:token',
      assetsBaseURL:
        process.env.NUXT_ASSETS_BASE_URL ??
        'https://test-admin-api.circlenow.app',
      apiBaseUrl:
        process.env.NUXT_API_BASE_URL ??
        'https://test-admin-api.circlenow.app/api',
      authServiceBaseUrl:
        process.env.NUXT_API_AUTH_BASE_URL ??
        'https://test-auth-api.circlenow.app/api/admin',
      loanBaseUrl:
        process.env.NUXT_API_LOAN_BASE_URL ??
        'https://test-loan-api.circlenow.app/admin',
      savingsBaseUrl:
        process.env.NUXT_API_SAVINGS_BASE_URL ??
        'https://test-savings-api.circlenow.app/api/admin',
      subscriptionsBaseUrl:
        process.env.NUXT_API_SUBSCRIPTIONS_BASE_URL ??
        'https://test-subscriptions-api.circlenow.app/api/admin',
      stocksBaseUrl:
        process.env.NUXT_API_STOCKS_BASE_URL ??
        'https://test-stocks-api.circlenow.app/api/admin',
      userDataBaseUrl:
        process.env.NUXT_API_USER_DATA_BASE_URL ??
        'https://test-user-data-api.circlenow.app/api/admin',
      walletBaseUrl:
        process.env.NUXT_API_WALLET_BASE_URL ??
        'https://test-wallet-data-api.circlenow.app/api/admin',
    },
  },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/content',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'cookies',
  },
});
