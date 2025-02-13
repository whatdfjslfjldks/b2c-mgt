import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import userService, { type SignInReq } from "@/api/services/userService";

import { toast } from "sonner";
import type { UserInfo, UserToken } from "#/entity";
import { StorageEnum } from "#/enum";
import { fetchAPI } from "@/api/fetchApi";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
	userInfo: Partial<UserInfo>;
	userToken: UserToken;
	// 使用 actions 命名空间来存放所有的 action
	actions: {
		setUserInfo: (userInfo: UserInfo) => void;
		setUserToken: (token: UserToken) => void;
		clearUserInfoAndToken: () => void;
	};
};

const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			userInfo: {},
			userToken: {},
			actions: {
				setUserInfo: (userInfo) => {
					set({ userInfo });
				},
				setUserToken: (userToken) => {
					set({ userToken });
				},
				clearUserInfoAndToken() {
					set({ userInfo: {}, userToken: {} });
				},
			},
		}),
		{
			name: "userStore", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({
				[StorageEnum.UserInfo]: state.userInfo,
				[StorageEnum.UserToken]: state.userToken,
			}),
		},
	),
);

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
	const navigatge = useNavigate();
	const { setUserToken, setUserInfo } = useUserActions();

	const login = (data: SignInReq) => {
		return fetchAPI("/login", {
			method: "POST",
			body: JSON.stringify(data),
		});
	};

	const signInMutation = useMutation({
		// mutationFn: userService.signin,
		mutationFn: login,
	});

	const signIn = async (data: SignInReq) => {
		try {
			// const res=await fetchAPI("/login",{
			// 	method:"POST",
			// 	body:JSON.stringify(data),
			// })
			// const {user,accessToken,refreshToken}=res.data

			const res = await signInMutation.mutateAsync(data);
			const { user, accessToken, refreshToken } = res.data;
			setUserToken({ accessToken, refreshToken });
			setUserInfo(user);
			navigatge(HOMEPAGE, { replace: true });
			toast.success("Sign in success!");
		} catch (err) {
			toast.error(err.message, {
				position: "top-center",
			});
		}
	};

	return signIn;
};

export default useUserStore;
