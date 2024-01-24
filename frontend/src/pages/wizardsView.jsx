/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, Button } from "antd";
import WizardList from "../Components/WizardList/wizardList";
import "../App.css";

export default function WizardsView() {
  const [wizards, setWizards] = useState([]);
  // Create/Edit modal usestate variable = isCreateModalVisible, setIsCreateModalVisible
  const [isModalVisible, setIsModalVisible] = useState(false);
  // View details modal:
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentViewWizard, setCurrentViewWizard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    imagePath: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentWizardId, setCurrentWizardId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const form = new FormData()
    form.append("name", "asdasd")
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile)
    setFormData({ ...formData, [e.target.name]: e.target.files[0][0] });
    console.log('-->', e.target.files)
  };

  useEffect(() => {
    fetchWizards();
  }, []);

  const fetchWizards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/wizards"); 
      setWizards(response?.data?.data);
    } catch (error) {
      console.error("Error fetching wizards:", error);
      console.log("mein idhar phasa1");
    }
  };

  const handleCreateWizard = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("age", formData.age);
      if (selectedFile) {
        form.append("imagePath", selectedFile);
      }
  
      const response = await axios.post("http://localhost:5000/wizards", form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 201) {
        fetchWizards();
        setIsModalVisible(false);
        setFormData({ name: "", age: "", imagePath: "" });
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error creating wizard:", error);
      console.log("mein idhar phasa2");
    }
  };
  
  
  const handleEditWizard = async () => {
    if (!currentWizardId) return;
    try {
      const response = await axios.patch(
        `http://localhost:5000/wizards/${currentWizardId}`,
        formData
      );
      if (response.status === 200) {
        fetchWizards();
        setEditMode(false);
        setCurrentWizardId(null);
        setFormData({ name: "", age: "", imagePath: "" });
        setIsModalVisible(false);
        console.log("edit handler ke andar hun");
      }
    } catch (error) {
      console.error("Error editing wizard:", error);
      console.log("mein idhar phasa3");
    }
  };

  const handleDeleteWizard = async (wizardId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/wizards/${wizardId}`
      );
      if (response.status === 200) {
        fetchWizards();
      }
    } catch (error) {
      console.error("Error deleting wizard:", error);
      console.log("mein idhar phasa4");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditMode(false);
    setCurrentWizardId(null);
    setFormData({ name: "", age: "", imagePath: "" });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("idhar bhi phas sakta hun", formData);
  };

  const showViewModal = (wizard) => {
    setCurrentViewWizard(wizard);
    console.log(wizard);
    setIsViewModalVisible(true);
    console.log(isViewModalVisible);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setCurrentViewWizard(null);
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
          setIsModalVisible(true);
        }}
        onDelete={handleDeleteWizard}
        onView={showViewModal}
      />
      <Modal
        title={editMode ? "Edit Wizard" : "Create Wizard"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={editMode ? handleEditWizard : handleCreateWizard}
          >
            {editMode ? "Edit" : "Create"}
          </Button>,
        ]}
      >
        
        <Form>
          <Form.Item label="Name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Age">
            <Input
              name="age"
              value={formData.age}
              onChange={handleFormChange}
            />
          </Form.Item>
          
          <Form.Item label="Wizard Image" encType="multipart/form-data">
            
            <Input name="imagePath" type="file" onChange={(e) => handleFileChange(e) }  />
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