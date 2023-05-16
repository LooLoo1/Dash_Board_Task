import * as React from 'react'
import { StarFilled } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => {
  return (
		<div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", color: "#E67700" }}>
			<Spin
				indicator={<StarFilled style={{ color: "#E67700" }} spin />}
				size="large"
			/>
			<p>Loading...</p>
		</div>
	)
}

export default Loader