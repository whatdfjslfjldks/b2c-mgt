import { Col, Row, Space } from "antd";

import AreaDownload from "./area-download";
import BannerCard from "./banner-card";
import { Orders, Users } from "./order_users";
import CurrentOrderStatus from "./current-orderStatus";
import NewInvoice from "./new-invoice";
import TopAuthor from "./top-authors";
import TopInstalled from "./top-installed";
import TopRelated from "./top-related";
import TotalCard from "./total-card";

function Workbench() {
	return (
		<div className="p-2">
			<Row gutter={[16, 16]} justify="center">
				<Col span={24} lg={16}>
					<BannerCard />
				</Col>
				<Col span={24} lg={8}>
					<Space direction="vertical" size="large" className="h-full w-full justify-center">
						<Orders />
						<Users />
					</Space>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={8}>
					<TotalCard
						title="每日活跃用户数"
						increase
						count="18,765"
						percent="2.6%"
						chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
					/>
				</Col>

				<Col span={24} md={8}>
					<TotalCard
						title="每日下单数"
						increase
						count="4,876"
						percent="0.2%"
						chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
					/>
				</Col>

				<Col span={24} md={8}>
					<TotalCard
						title="每日成交订单数"
						increase={false}
						count="678"
						percent="0.1%"
						chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
					/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={12} lg={8}>
					<CurrentOrderStatus />
				</Col>
				<Col span={24} md={12} lg={16}>
					<AreaDownload />
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={12} lg={16}>
					<NewInvoice />
				</Col>
				<Col span={24} md={12} lg={8}>
					<TopRelated />
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={12}>
					<TopInstalled />
				</Col>

				<Col span={24} md={12}>
					<TopAuthor />
				</Col>
			</Row>
		</div>
	);
}

export default Workbench;
