import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, BankOutlined, CarryOutOutlined, UserAddOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ setPage, Page }) => {
    const [userData, setUserData] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("user"));
        setUserData(data);
    }, []);

    // Menu Items
    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
        { key: "position", label: "Position", icon: <CarryOutOutlined /> },
        { key: "candidate", label: "Candidates", icon: <UserAddOutlined /> },
    ];

    if (userData?.role !== "recruiter") {
        menuItems.splice(1, 0, { key: "client", label: "Clients", icon: <BankOutlined /> });
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="h-screen shadow">
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <span className="text-lg font-semibold text-cyan-600">Smart Hirex</span>
                <MenuFoldOutlined className="text-lg cursor-pointer" onClick={() => setCollapsed(!collapsed)} />
            </div>

            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[Page]}
                onClick={(e) => setPage(e.key)}
                items={menuItems}
            />
        </Sider>
    );
};

export default Sidebar;
