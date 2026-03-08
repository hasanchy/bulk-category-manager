import { Col, Row, Space } from "antd";
import { __ } from "@wordpress/i18n";
import { useDispatch } from "react-redux";
import TotalCategories from "./widgets/TotalCategories";
import TotalEmptyCategories from "./widgets/TotalEmptyCategories";
import TotalProducts from "./widgets/TotalProducts";
import UncategorizedProducts from "./widgets/UncategorizedProducts";
import TopCategories from "./widgets/TopCategories";
import CategoryDistribution from "./widgets/CategoryDistribution";

const Dashboard = () => {

    const dispatch = useDispatch();

    return (
        <Space size={15} direction='vertical' style={{display:'flex'}}>
            <Row>
				<Col span={24}>
                    <div style={{ 
                        display: 'flex', 
                        gap: '15px',
                        width: '100%',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: '1 1 250px' }}>
                            <TotalCategories />
                        </div>
                        <div style={{ flex: '1 1 250px' }}>
                            <TotalProducts />
                        </div>
                        <div style={{ flex: '1 1 250px' }}>
                            <TotalEmptyCategories />
                        </div>
                        <div style={{ flex: '1 1 250px' }}>
                            <UncategorizedProducts />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={15}>
                <Col span={24}>
                    <div style={{ 
                        columnCount: 2,     // number of columns
                        columnGap: '15px',  // spacing between columns
                    }}>
                        <div style={{ breakInside: 'avoid', marginBottom: '15px' }}>
                            <TopCategories />
                        </div>
                        <div style={{ breakInside: 'avoid', marginBottom: '15px' }}>
                            <CategoryDistribution />
                        </div>
                        <div style={{ breakInside: 'avoid', marginBottom: '15px' }}>
                            <CategoryDistribution />
                        </div>
                        <div style={{ breakInside: 'avoid', marginBottom: '15px' }}>
                            <TopCategories />
                        </div>
                    </div>
                </Col>
            </Row>
        </Space>
    );
}

export default Dashboard;