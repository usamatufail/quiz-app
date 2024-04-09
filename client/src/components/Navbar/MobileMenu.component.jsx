import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

export function MobileMenu({ links, user }) {
  const finalLinks = links?.map((link) => {
    if (link?.onClick) {
      return {
        label: (
          <Button
            htmlType="button"
            onClick={link?.onClick}
            className="w-full"
            key={link?.path}
          >
            {link?.title}
          </Button>
        ),
        key: link?.path,
      };
    }
    return {
      label: (
        <Link to={link?.path} className="w-full" key={link?.path}>
          <Button htmlType="button" className="w-full">
            {link?.title}
          </Button>
        </Link>
      ),
      key: link?.path,
    };
  });

  return (
    <Dropdown
      overlay={<Menu items={finalLinks} />}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button type="primary" icon={<DownOutlined />}>
        {user?._id ? user?.name : 'Menu'}
      </Button>
    </Dropdown>
  );
}
