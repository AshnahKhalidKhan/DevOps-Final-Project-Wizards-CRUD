import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const WizardCard = ({ name, Age, imgUrl, avatarUrl }) => (
  <Card
    style={{ width: 300 }}
    cover={<img alt={name} src={imgUrl} />}
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src={avatarUrl} />}
      title={name}
      description={`Age: ${Age}`}
    />
  </Card>
);

WizardCard.propTypes = {
  name: PropTypes.string.isRequired,
  Age: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
  avatarUrl: PropTypes.string
};

export default WizardCard;
