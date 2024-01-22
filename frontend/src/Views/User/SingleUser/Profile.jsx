import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUser,
  getClients,
  updateUser,
  getTrainingLogs,
} from "../../../features/user/userSlice";
import { getRutines } from "../../../features/rutinas/rutinasSlice";
import {
  updateUserr,
  clearAuthMessages,
} from "../../../features/auth/authSlice";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal } from "antd";
import styles from "../../../components/Component.module.css";
import { showSuccessNotification } from "../../../features/layout/layoutSlice";
import Progressbar from "../../../components/Progressbar/Progressbar";
function Profile() {
  // const { user } = useSelector((state) => state.auths);
  const { clients, message, user, trainingLogs } = useSelector(
    (state) => state.users
  );

  const { rutinas } = useSelector((state) => state.rutinas);
  // const { message} = useSelector((state) => state.auths);
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar);
  const [userState, setUserState] = useState({
    name: user?.name,
    lastname: user?.lastname,
  });
  const [dispatched, setDispatched] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("User"));
  const token = localUser.token;
  const dispatch = useDispatch();
  const id = useParams().id;
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (user && user.avatar) {
      setSelectedAvatar(user.avatar);
    }
    dispatch(
      getTrainingLogs({
        token,
        clientId: user?.Client?.idClient,
        idRoutine: rutinas[currentRoutineIndex]?.routine?.idRoutine,
      })
    );
  }, [user]);
  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setIsModalVisible(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue({
      name: user.name,
      lastname: user.lastname,
      avatar: selectedAvatar,
    });
  };
  const handlePrevRoutine = () => {
    if (currentRoutineIndex > 0) {
      setCurrentRoutineIndex(currentRoutineIndex - 1);
    }
  };

  const handleNextRoutine = () => {
    if (currentRoutineIndex < rutinas.length - 1) {
      setCurrentRoutineIndex(currentRoutineIndex + 1);
    }
  };
  useEffect(() => {
    if (message === "Usuario actualizado") {
      dispatch(showSuccessNotification("Actualizacion exitosa!", message));
      setTimeout(() => {
        dispatch(
          updateUserr({
            name: userState.name,
            lastname: userState.lastname,
            avatar: selectedAvatar,
          })
        );
        dispatch(clearAuthMessages());
      }, 4000);
    }
  }, [message]);

  const handleSave = (values) => {
    setUserState({
      name: values.name,
      lastname: values.lastname,
    });
    dispatch(
      updateUser({
        userId: id,
        newUser: {
          name: values.name,
          lastname: values.lastname,
          avatar: selectedAvatar,
        },
      })
    );
    dispatch(getUser({ userId: id, token }));
    setIsEditing(false);
  };
  useEffect(() => {
    dispatch(getUser({ userId: id, token }));
    dispatch(getClients(token));
    dispatch(getTrainingLogs());
  }, [id]);

  const isUserInClients = clients?.some(
    (client) => client.idUser === user.idUser
  );
  useEffect(() => {
    if (dispatched === false) {
      if (!rutinas || rutinas.length === 0) {
        dispatch(getRutines(id));
        setDispatched(true);
      }
    }
  }, [rutinas]);

  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const calculateTrainingPercentage = () => {
    if (!rutinas || !trainingLogs) return 0;

    // Obtener la rutina actual y el idRoutine correspondiente
    const currentRoutine = rutinas[currentRoutineIndex]?.routine;
    const currentRoutineId = currentRoutine?.idRoutine;

    // Filtrar los training logs por la rutina actual
    const routineTrainingLogs = trainingLogs.filter(
      (log) => log.idRoutine === currentRoutineId
    );
    console.log(routineTrainingLogs, "rutinetraining");
    // Obtener la fecha de inicio de la rutina y la fecha actual
    const rutinaStartDate = new Date(currentRoutine?.startDate);

    const currentDate = new Date();

    // Calcular los días de entrenamiento desde el inicio de la rutina hasta la fecha actual
    const trainingDays = [];
    let currentDay = rutinaStartDate.getDay(); // Día de la semana en que comenzó la rutina

    // Agregar días de entrenamiento hasta la fecha actual
    while (rutinaStartDate <= currentDate) {
      currentRoutine?.GroupExercises?.forEach((group) => {
        if (group.day === diasSemana[currentDay]) {
          trainingDays.push(diasSemana[currentDay]);
        }
      });

      rutinaStartDate.setDate(rutinaStartDate.getDate() + 1);
      currentDay = (currentDay + 1) % 7; // Siguiente día de la semana
    }

    console.log(trainingDays, "trainingdays");
    // Contar los días de entrenamiento que han sido registrados en los training logs

    // Calcular el porcentaje
    const percentage =
      (routineTrainingLogs.length / trainingDays.length) * 100 || 0;

    return percentage;
  };
  useEffect(() => {
    calculateTrainingPercentage();
  }),
    [currentRoutineIndex];

  if (!isUserInClients) {
    return <div>Este usuario no es tu cliente</div>;
  }

  return (
    <div>
      <h2 className="mb-7 mt-16">PERFIL</h2>

      {user && (
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={{
            name: user.name,
            lastname: user.lastname,
            email: user.Credentials && user?.Credentials[0]?.email,
          }}
        >
          <div className="flex items-start justify-evenly">
            <div>
              <Form.Item
                className="flex justify-start"
                label="Avatar"
                name="avatar"
              >
                <div className="">
                  <img
                    src={selectedAvatar}
                    alt="Avatar"
                    onClick={isEditing ? showModal : null}
                    className="h-10 w-10 rounded-full mr-20"
                  />
                </div>
              </Form.Item>

              <Form.Item
                className="flex justify-start"
                label="Name"
                name="name"
              >
                {isEditing ? <Input /> : <div>{user.name}</div>}
              </Form.Item>
              <Form.Item
                className="flex justify-start"
                label="Last Name"
                name="lastname"
              >
                {isEditing ? <Input /> : <div>{user.lastname}</div>}
              </Form.Item>
              <Form.Item
                className="flex justify-start"
                label="Email"
                name="email"
              >
                <div>{user.Credentials && user?.Credentials[0]?.email}</div>
              </Form.Item>
              <Form.Item
                className="flex justify-start"
                label="Rutina"
                name="Rutina"
              >
                {rutinas && rutinas.length > 0 ? "Si" : "No"}
              </Form.Item>
            </div>
            <div className="ml-32">
              {rutinas && rutinas.length > 1 && (
                <>
                  <div className="flex items-center justify-center mb-10">
                    <LeftOutlined
                      className="cursor-pointer text-2xl"
                      onClick={handlePrevRoutine}
                    />

                    <h2>{rutinas[currentRoutineIndex]?.routine?.name} </h2>
                    <RightOutlined
                      className="cursor-pointer text-2xl"
                      onClick={handleNextRoutine}
                    />
                  </div>
                  <Progressbar percentage={calculateTrainingPercentage()} />
                  <h4>% de entramiento realizados</h4>
                </>
              )}
            </div>
          </div>
          {isEditing && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
      {!isEditing && (
        <Button type="link" onClick={handleEditClick}>
          Edit Profile
        </Button>
      )}
      <Modal
        title="Seleccionar Avatar"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className={styles.avatarContainer}>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Max"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Max"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Princess"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Princess"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Coco"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Coco"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Kiki"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Kiki"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Bear"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Bear"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jack"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Leo"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Abby"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Abby"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Boots"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Boots"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Loki"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Loki"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Maggie"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Maggie"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty"
                )
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
