import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';

const Header = ({ Page }) => {
    const handleLogout = () => {
        localStorage?.clear();
        window.location.href = '/';
    };

    const menu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className='h-16 flex items-center justify-between px-6 bg-white shadow-md'>
            <div className='text-cyan-600 capitalize font-semibold text-xl'>
                {Page}
            </div>

            <Dropdown overlay={menu} trigger={['hover']}>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <Avatar size="small" icon={<UserOutlined />} className="bg-slate-400" />
                    <span className='text-md text-slate-600'>Sagar</span>
                    <DownOutlined className="text-slate-500 text-xs" />
                </div>
            </Dropdown>
        </nav>
    );
};

export default Header;
