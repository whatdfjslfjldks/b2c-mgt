import { Iconify } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Progress } from "antd";

export function Orders() {
	return (
		<Basic
			percent={25}
			title="10,000"
			subtitle="一万成交订单数目标"
			iconify="mdi:cart"
			bg={themeVars.colors.palette.primary.default}
			strokeColor={themeVars.colors.palette.primary.light}
		/>
	);
}
export function Users() {
	return (
		<Basic
			percent={75}
			title="10,000"
			subtitle="一万注册用户数目标"
			iconify="tabler:user-filled"
			bg={themeVars.colors.palette.info.default}
			strokeColor={themeVars.colors.palette.info.light}
		/>
	);
}

type Props = {
	percent: number;
	title: string;
	subtitle: string;
	iconify: string;
	bg?: string;
	strokeColor?: string;
};
function Basic({ percent, title, subtitle, iconify, bg, strokeColor }: Props) {
	const format = (val?: number) => <span style={{ color: themeVars.colors.background.default }}>{val}%</span>;
	return (
		<div
			className="relative flex items-center rounded-2xl p-6"
			style={{ background: bg, color: themeVars.colors.background.default }}
		>
			<Progress type="circle" size={70} percent={percent} format={format} strokeColor={strokeColor} />
			<div className="ml-2 flex flex-col">
				<span className="text-2xl font-bold">{title}</span>
				<span className="opacity-50">{subtitle}</span>
			</div>
			<div className="absolute right-0">
				<Iconify icon={iconify} style={{ opacity: 0.08 }} size={100} />
			</div>
		</div>
	);
}
