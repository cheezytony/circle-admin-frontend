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
  url: Ref<string> | ComputedRef<string> | string;
  baseURL?: string;
  method?: string;
  headers?: object;
  service?: ServiceNames;

  authorize?: boolean;
  autoLoad?: boolean;

  initialLoadingState?: boolean;

  onSuccess?: (data: T) => void;
  onError?: (error: HTTPErrorData) => void;
  onFinish?: () => void;
} & AxiosRequestConfig;

export type APIRequestPayload = {
  data?: object;
  params?: object;
};

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

export const useApiRequest = <T = object>({
  authorize = false,
  autoLoad = false,
  initialLoadingState = false,
  service = 'ADMIN',
  baseURL,
  url,
  headers = {},
  onSuccess,
  onError,
  onFinish,
  ...config
}: APIRequestConfig<HTTPResponseData<T>>) => {
  const serviceBaseUrl = useServiceBaseUrl(service);

  const { token, logout } = useAuth();

  const isLoading = ref(initialLoadingState);
  const data = ref<HTTPResponseData<T>>();
  const error = ref<Error | HTTPError>();
  const load = async (payload?: APIRequestPayload) => {
    isLoading.value = true;
    return await new Promise((resolve, reject) => {
      if (authorize) {
        headers.Authorization = `Bearer ${token}`;
      }

      axios<HTTPResponseData<T>>({
        ...config,
        ...payload,
        headers,
        url: typeof url === 'object' ? (url as Ref<string>).value : url,
        baseURL: baseURL ?? serviceBaseUrl,
      })
        .then((response) => {
          data.value = response?.data;
          resolve(response?.data);
          onSuccess?.(response.data);

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

          if (
            service === 'ADMIN' &&
            authorize &&
            error_.response?.status === 401
          ) {
            return logout();
          }

          reject(error__);
          onError?.(error__);
        })
        .finally(() => {
          isLoading.value = false;
          onFinish?.();
        });
    });
  };

  // onMounted(() => autoLoad && load());
  if (autoLoad) load();

  return { data, error, isLoading, load };
};

export const useFormRequest = <T>(
  form: Ref<Form>,
  {
    useFormData = false,
    wrapperKey,
    onSuccess,
    onFinish,
    onError,
    ...config
  }: APIRequestConfig<HTTPResponseData<T>> & { useFormData?: boolean, wrapperKey?: string }
) => {
  const { load, ...data } = useApiRequest<T>({
    ...config,
    onSuccess: (data) => {
      form.value.success = data?.message ?? null;
      // toastr.success(data?.message ?? 'Operation Successful');
      onSuccess?.(data);
    },
    onError: (error) => {
      form.value.error = error.message;
      error.errors && setFormErrors(form, error.errors);
      console.log(error.errors);

      onError?.(error);
    },
    onFinish: () => {
      form.value.loading = false;
      onFinish?.();
    },
  });
  const submit = async () => {
    if (!validateForm(form)) return;

    form.value.loading = true;
    form.value.error = null;
    form.value.success = null;

    const data = useFormData ? getFormData(form) : getRawFormData(form);
    
    await load({
      data: wrapperKey ? { [wrapperKey]: data } : data,
    });
  };

  return { ...data, submit };
};
