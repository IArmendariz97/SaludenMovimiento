import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/user/userSlice";
import { FcFullTrash } from "react-icons/fc";
import { Modal } from "antd";

const DeleteButton = ({ userName, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(userId));
    setModalVisible(false);
  };

  return (
    <>
      <FcFullTrash
        size={19}
        className="userDelete h-9 w-9"
        onClick={() => setModalVisible(true)}
      />

      <Modal
        title="¡Atención!"
        open={modalVisible}
        onOk={handleDelete}
        onCancel={() => setModalVisible(false)}
        okText="Sí"
        cancelText="No"
      >
        <p>
          ¿Estás seguro de que deseas eliminar al usuario{" "}
          <strong>{userName}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default DeleteButton;
