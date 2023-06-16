// eslint-disable-next-line import/named
import { ComputedRef, Ref } from 'vue';
import {
  Form,
  getFormData,
  getRawFormData,
  setFormErrors,
  validateForm,
} from 'vue3-form';
import toastr from 'toastr';
// eslint-disable-next-line import/named
import axios, { AxiosRequestConfig, isCancel } from 'axios';
import { HTTPError, HTTPErrorData, HTTPResponseData } from '~~/types/http';
import { useAuth } from '~~/store/auth';

export type APIRequestConfig<T> = {
  url: Ref<string> | ComputedRef<string> | string;
  baseURL?: string;
  method?: string;
  headers?: object;

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

export const useApiRequest = <T = object>({
  authorize = false,
  autoLoad = false,
  initialLoadingState = false,
  baseURL,
  url,
  headers = {},
  onSuccess,
  onError,
  onFinish,
  ...config
}: APIRequestConfig<HTTPResponseData<T>>) => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig();
  const { token } = useAuth();

  const isLoading = ref(initialLoadingState);
  const data = ref<HTTPResponseData<T>>();
  const error = ref<Error>();
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
        baseURL: baseURL ?? apiBaseUrl,
      })
        .then((response) => {
          data.value = response?.data;
          resolve(response?.data);
          onSuccess?.(response.data);

          return response.data;
        })
        .catch((error: HTTPError) => {
          if (isCancel(error)) return;
          const error_: HTTPErrorData = {
            ...error?.response?.data,
            status: error.response?.status,
            statusText: error.response?.statusText,
          };
          reject(error_);
          onError?.(error_);
        })
        .finally(() => {
          isLoading.value = false;
          onFinish?.();
        });
    });
  };

  onMounted(() => autoLoad && load());

  return { data, error, isLoading, load };
};

export const useFormRequest = <T>(
  form: Ref<Form>,
  {
    useFormData = false,
    onSuccess,
    onFinish,
    onError,
    ...config
  }: APIRequestConfig<HTTPResponseData<T>> & { useFormData?: boolean }
) => {
  const { load, ...data } = useApiRequest<T>({
    ...config,
    onSuccess: (data) => {
      form.value.success = data?.message ?? null;
      toastr.success(data?.message ?? 'Operation Successful');
      onSuccess?.(data);
    },
    onError: (error) => {
      form.value.error = error.message;
      error.errors && setFormErrors(form, error.errors);

      onError?.(error);
    },
    onFinish: () => {
      form.value.loading = false;
      onFinish?.();
    },
  });
  const submit = async (data?: FormData | object) => {
    if (!validateForm(form)) return;

    form.value.loading = true;
    form.value.error = null;
    form.value.success = null;

    await load({
      data: data ?? (useFormData ? getFormData(form) : getRawFormData(form)),
    });
  };

  return { ...data, submit };
};
