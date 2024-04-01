import { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import WizardList from "../Components/WizardList/wizardList";
import "../App.css";
import { useWizards } from "../hooks/useWizards";

export default function WizardsView() {
  const { wizards, addWizard, editWizard, removeWizard } = useWizards();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentViewWizard, setCurrentViewWizard] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "", imagePath: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentWizardId, setCurrentWizardId] = useState(null);
  const [file, setFile] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showViewModal = (wizard) => {
    setCurrentViewWizard(wizard);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditMode(false);
    setCurrentWizardId(null);
    setFormData({ name: "", age: "", imagePath: "" });
    setFile(null);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setCurrentViewWizard(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    setFile(file);
  };

  const handleCreateOrUpdateWizard = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("age", formData.age);
    if (file) form.append("imagePath", file);

    if (editMode) {
      await editWizard(currentWizardId, form);
    } else {
      await addWizard(form);
    }

    handleCancel(); // Reset and close modal after operation
  };

  return (
    <div className="app-container">
      <h1>CRUD Wizards</h1>
      <Button type="primary" onClick={showModal}>
        Create New Wizard
      </Button>
      <WizardList
        wizards={wizards}
        onEdit={(wizard) => {
          setEditMode(true);
          setCurrentWizardId(wizard._id);
          setFormData({
            name: wizard.name,
            age: wizard.age,
            imagePath: wizard.imagePath,
          });
          showModal();
        }}
        onDelete={removeWizard}
        onView={showViewModal}
      />
      <Modal
        title={editMode ? "Edit Wizard" : "Create Wizard"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleCreateOrUpdateWizard}>
            {editMode ? "Edit" : "Create"}
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Name">
            <Input name="name" value={formData.name} onChange={handleFormChange} />
          </Form.Item>
          <Form.Item label="Age">
            <Input name="age" value={formData.age} onChange={handleFormChange} />
          </Form.Item>
          <Form.Item label="Wizard Image">
            <Input name="imagePath" type="file" onChange={handleFileChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Wizard Details"
        open={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null}
      >
        {currentViewWizard && (
          <div>
            <p>ID: {currentViewWizard._id}</p>
            <p>Name: {currentViewWizard.name}</p>
            <p>Age: {currentViewWizard.age}</p>
            <p>Image URL: {currentViewWizard.imagePath}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
