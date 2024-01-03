import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Meta } = Card;

const WizardCard = ({ name, Age, imagePath, onEdit, onDelete, onView }) => (
  <Card
    style={{ width: 300 }}
    cover={<img alt={name} src={imagePath} />}
    actions={[
      <EditOutlined key="edit" onClick={onEdit} />,
      <DeleteOutlined key="delete" onClick={onDelete} />,
      <EyeOutlined key="view" onClick={onView} />,
    ]}
  >
    <Meta
      avatar={<Avatar src={imagePath} />}
      title={name}
      description={`Age: ${Age}`}
    />
  </Card>
);

WizardCard.propTypes = {
  name: PropTypes.string.isRequired,
  Age: PropTypes.number.isRequired,
  imagePath: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};

export default WizardCard;
