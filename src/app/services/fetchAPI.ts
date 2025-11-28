const VITE_API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

type FetchAPIOptions = {
    token?: string;
    headers?: Record<string, string>;
};

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function setHeaders(options?: FetchAPIOptions): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    if (options?.token) {
        headers["Authorization"] = "Bearer " + options.token;
    }
    return headers;
}

function fetchOptions(
    method: Method,
    data?: any,
    options?: FetchAPIOptions
): RequestInit {
    const headers = setHeaders(options);
    const fetchOptions: RequestInit = {
        method,
        headers,
    };
    if (data) {
        fetchOptions.body = JSON.stringify(data);
    }
    return fetchOptions;
}

export async function fetchAPI(
    endpoint: string,
    method: Method,
    data?: any,
    options?: FetchAPIOptions
): Promise<any> {
    const url = `${VITE_API_URL}/${endpoint}`;
    const requestOptions = fetchOptions(method, data, options);
    const response = await fetch(url, requestOptions);
    const json = await response.json();

    return {
        status: response.status,
        success: json.success || response.ok,
        data: json.data,
        message:
            json.message || (response.ok ? "Success" : "Erro desconhecido"),
    };
}
