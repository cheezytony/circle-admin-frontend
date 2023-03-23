export type HTTPResponse<APIResource = any> = {
  data?: {
    message: string,
    success: boolean,
    data: APIResource,
  },
  status: number,
  statusText: string,
};
export type HTTPResponseData<APIResource = any> = HTTPResponse<APIResource>['data'];

export type HTTPResourceResponse<APIResource> = {
  data?: {
    message: string,
    success: boolean,
    data: APIResource[],
    metadata: {
      chunk_count: number,
      limit: number,
      order?: string,
      page: number,
      page_count: number,
      query: string,
      total_count: number,
    },
  },
};
export type HTTPResourceResponseData<APIResource = any> =
  HTTPResourceResponse<APIResource>['data'];

export type HTTPError = {
  response?: HTTPResponse,
};

export type HTTPErrorData = HTTPResponse['data'] & {
  errors?: Record<string, string[]>,
  status?: HTTPResponse['status'],
  statusText?: HTTPResponse['statusText'],
};
