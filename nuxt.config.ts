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
      apiBaseUrl: 'http://localhost:4005/api',
      savingsBaseUrl:
        process.env.SAVINGS_BASE_URL ||
        'https://test-savings-api.circlenow.app/',
      loanBaseUrl:
        process.env.LOAN_BASE_URL || 'https://test-loan-api.circlenow.app/',
      shareAndEarnBaseUrl:
        process.env.SHARE_AND_EARN_BASE_URL ||
        'https://test-auth-api.circlenow.app/api/referral-wallets/',
      assetsBaseURL: 'http://localhost:4005',
      apiTokenStorageKey: 'circle-admin:token',
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
