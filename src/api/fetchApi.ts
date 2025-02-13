import type { APIResponse } from "#/api";

// 封装请求超时错误处理逻辑
const handleTimeoutError = () => ({
	code: 408,
	msg: "请求超时，请检查您的网络连接！",
});

// 封装通用网络错误处理逻辑
const handleNetworkError = (e: Error) => {
	if (import.meta.env.NODE_ENV === "development") {
		console.log("fetchAPI error: ", e);
	}
	return {
		code: 408,
		msg: "请检查您的网络连接！",
	};
};

// 封装构造请求路径的逻辑
const constructRequestPath = (path: string | URL, host: string) => {
	console.log("fetchAPI path: ", path);
	console.log("fetchAPI host: ", host);
	return path instanceof URL ? path : new URL(host + path);
};

// 封装构造请求头的逻辑
const constructRequestHeaders = (init?: RequestInit) => {
	return {
		...init?.headers,
	};
};

export async function fetchAPI(path: string | URL, init?: RequestInit, timeout: number = 5000): Promise<APIResponse> {
	// 检查 NEXT_PUBLIC_API_URL 是否定义
	if (typeof import.meta.env.VITE_PUBLIC_API_URL !== "string") {
		console.log("!@!@", import.meta.env.VITE_PUBLIC_API_URL);
		throw new Error("API_URL 未定义!");
	}
	// 根据当前环境构造服务器地址
	const host = import.meta.env.VITE_PUBLIC_API_URL;

	// 构造请求头
	const headers = constructRequestHeaders(init);

	// 构造完整的请求路径
	const constructedPath = constructRequestPath(path, host);

	// 设置超时控制
	const controller = new AbortController();
	const signal = controller.signal;
	const timeoutId = setTimeout(() => {
		controller.abort(); // 在超时后中止请求
	}, timeout);

	// 发送请求并处理响应
	return fetch(constructedPath, { ...init, headers, signal })
		.then((response) => {
			clearTimeout(timeoutId); // 请求成功，清除超时
			return response.json().then((data) => ({
				code: data.code,
				msg: data.msg,
				data: data.data,
			}));
		})
		.catch((e) => {
			clearTimeout(timeoutId); // 清除超时
			if (e.name === "AbortError") {
				// 处理超时错误
				return handleTimeoutError();
			}
			// 处理网络错误
			return handleNetworkError(e);
		});
}
