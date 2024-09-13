import React, { useEffect, useState } from "react";
import { Button, Modal, Progress, Space } from "antd";
import "./Upload.scss";
import PropTypes from "prop-types";
export default function UploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadimgtofirebase,
  currentImage,
  progress,
}) {
  const [clickUploadButton, setclickUploadButton] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const handleOk = (e) => {
    setModalOpen(false);
  };

  const handleCancel = (e) => {
    setModalOpen(false);
  };
  return (
    <div>
      <Modal
        title="Upload Profile Image"
        visible={modalOpen} // استخدم modalOpen بدلاً من open
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: false }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back to Profile Page
          </Button>,
          <Button
            type="primary"
            disabled={currentImage.name ? false : true}
            onClick={() => {
              // handleOk();
              uploadimgtofirebase();
              setclickUploadButton(true);
            }}
          >
            Upload
          </Button>,
        ]}
      >
        <div>
          <input type="file" onChange={getImage} className="photoInput" />
        </div>
        {clickUploadButton ? (
          <div className="progress">
            <Progress type="circle" percent={progress}></Progress>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
