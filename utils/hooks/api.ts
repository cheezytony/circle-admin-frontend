// eslint-disable-next-line import/named
import { ComputedRef, Ref } from 'vue';
import {
  Form,
  getFormData,
  getRawFormData,
  setFormErrors,
  validateForm,
} from 'vue3-form';
// import toastr from 'toastr';
// eslint-disable-next-line import/named
import axios, { AxiosRequestConfig, isCancel } from 'axios';
import { HTTPError, HTTPErrorData, HTTPResponseData } from '~~/types/http';
import { useAuth } from '~~/store/auth';

export type ServiceNames =
  | 'ADMIN'
  | 'AUTH'
  | 'LOANS'
  | 'SAVINGS'
  | 'SHARE_AND_EARN'
  | 'STOCKS'
  | 'SUBSCRIPTIONS'
  | 'USER_DATA'
  | 'WALLET';

export type APIRequestConfig<T> = {
  method?: string;
  headers?: object;

  authorize?: boolean;
  autoLoad?: boolean;
  autoReload?: boolean;
  initialData?: T;
  initialLoadingState?: boolean;

  service?: ServiceNames;

  onSuccess?: (data: HTTPResponseData<T>) => void;
  onError?: (error: HTTPErrorData) => void;
  onFinish?: () => void;
} & AxiosRequestConfig;

export const useServiceBaseUrl = (service?: ServiceNames) => {
  const {
    public: {
      apiBaseUrl,
      authServiceBaseUrl,
      loanBaseUrl,
      savingsBaseUrl,
      stocksBaseUrl,
      subscriptionsBaseUrl,
      userDataBaseUrl,
      walletBaseUrl,
    },
  } = useRuntimeConfig();

  switch (service) {
    case 'AUTH':
      return authServiceBaseUrl;
    case 'LOANS':
      return loanBaseUrl;
    case 'SAVINGS':
      return savingsBaseUrl;
    case 'SUBSCRIPTIONS':
      return subscriptionsBaseUrl;
    case 'STOCKS':
      return stocksBaseUrl;
    case 'USER_DATA':
      return userDataBaseUrl;
    case 'WALLET':
      return walletBaseUrl;
    default:
      return apiBaseUrl;
  }
};

export const useApiRequest = <T>(baseConfig: APIRequestConfig<T>) => {
  const config = ref(baseConfig);

  const { logout, token } = useAuth();
  const baseURL = useServiceBaseUrl(config.value.service);

  const isLoading = ref(false);
  const data = ref<HTTPResponseData<T>>();
  const error = ref<Error | HTTPError>();

  const load = async () => {
    const { headers = {} } = config.value;
    isLoading.value = true;
    return await new Promise((resolve, reject) => {
      if (config.value.authorize) {
        headers.Authorization = `Bearer ${token}`;
      }
      axios<HTTPResponseData<T>>({
        ...config.value,
        headers,
        baseURL,
      })
        .then((response) => {
          data.value = response?.data;
          resolve(response?.data);
          config.value?.onSuccess?.(response.data);

          return response.data;
        })
        .catch((error_: HTTPError) => {
          error.value = error_;

          if (isCancel(error_)) return;

          const error__: HTTPErrorData = {
            ...error_?.response?.data,
            status: error_.response?.status,
            statusText: error_.response?.statusText,
          };

          if (config.value.authorize && error_.response?.status === 401) {
            return logout();
          }

          reject(error__);
          config.value?.onError?.(error__);
        })
        .finally(() => {
          isLoading.value = false;
          config.value?.onFinish?.();
        });
    });
  };

  if (config.value.autoLoad) load();

  watch(config, (config) => config.autoLoad && load());

  return { isLoading, data, error, config, load };
};

export const useFormRequest = <T>(
  form: Ref<Form>,
  {
    useFormData,
    wrapperKey,
    ...baseConfig
  }: APIRequestConfig<T> & { useFormData?: boolean; wrapperKey?: string }
) => {
  const { load, config, ...data } = useApiRequest<T>({
    ...baseConfig,
    onSuccess: (data) => {
      form.value.success = data?.message ?? null;
      baseConfig.onSuccess?.(data);
    },
    onError: (error) => {
      form.value.error = error.message;
      error.errors && setFormErrors(form, error.errors);
      baseConfig.onError?.(error);
    },
    onFinish: () => {
      form.value.loading = false;
      baseConfig.onFinish?.();
    },
  });

  const submit = async () => {
    if (!validateForm(form)) return;

    form.value.loading = true;
    form.value.error = null;
    form.value.success = null;

    const data = useFormData ? getFormData(form) : getRawFormData(form);

    config.value.data = wrapperKey ? { [wrapperKey]: data } : data;

    await load();
  };

  return { ...data, submit };
};
