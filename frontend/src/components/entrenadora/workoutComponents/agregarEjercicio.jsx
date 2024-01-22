import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExercise } from "@/features/exercises/exerciseSlice";
import { Button, Form, Input, Select, Typography } from "antd";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import { getAllExercises } from "@/features/exercises/exerciseSlice";

const exerciseTypes = [
  { label: "SIN TIPO", value: "SIN TIPO" },
  { label: "FUERZA", value: "FUERZA" },
  { label: "AEROBICO", value: "AEROBICO" },
  { label: "FLEXIBILIDAD", value: "FLEXIBILIDAD" },
  { label: "ESTABILIDAD", value: "ESTABILIDAD" },
  { label: "RESISTENCIA", value: "RESISTENCIA" },
  { label: "PILATES", value: "PILATES" },
  { label: "PILATES TABATA", value: "PILATES TABATA" },
  { label: "YOGA", value: "YOGA" },
  { label: "HIIT", value: "HIIT" },
];

const initialState = {
  name: "",
  description: "",
  video: "",
  image1: "",
  image2: "",
  type: "",
};

const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/;

const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

function AgregarEjercicio() {
  const [formData, setFormData] = useState(initialState);
  const [selectedExerciseType, setSelectedExerciseType] = useState(
    exerciseTypes[0].label
  );

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (state) => state.exercises
  );

  useEffect(() => {
    if (message === "Ejercicio creado correctamente") {
      dispatch(getAllExercises());
      setFormData(initialState);
      form.resetFields();
      setSelectedExerciseType(exerciseTypes[0].label);
      dispatch(showSuccessNotification("Creación exitosa!", message));
    }
    if (isError) {
      dispatch(showErrorNotification("Error", message));
    }
  }, [message]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleExerciseTypeChange(value) {
    console.log(value, "value");
    setSelectedExerciseType(value);
    setFormData((prevData) => ({
      ...prevData,
      type: value,
    }));
  }

  async function postExercise() {
    try {
      // Validar que todos los campos estén completos
      await form.validateFields();

      // Validar imágenes y video con expresiones regulares
      if (!urlRegex.test(formData.image1) || !urlRegex.test(formData.image2)) {
        throw new Error(
          "Las imágenes deben ser URLs válidas con formatos: png, jpg, jpeg, gif"
        );
      }
      if (!youtubeRegex.test(formData.video)) {
        dispatch(
          showErrorNotification(
            "Error",
            "Por favor, ingresa un enlace de YouTube válido."
          )
        );
        return;
      }

      // Formatear datos para enviar al backend
      const formattedData = {
        name: formData.name,
        description: formData.description,
        video: formData.video,
        image1: formData.image1,
        image2: formData.image2,
        type: selectedExerciseType,
      };

      // Dispatch de la acción utilizando Redux Toolkit
      dispatch(createExercise(formattedData));

      // Lógica adicional después de la creación exitosa del ejercicio
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="add-exercise">
      <Form form={form} onFinish={postExercise} layout="vertical">
        <Form.Item
          required
          label="Nombre:"
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el nombre del ejercicio",
            },
          ]}
        >
          <Input
            placeholder="Nombre de Ejercicio"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </Form.Item>
        <Form.Item
          required
          label="Descripción:"
          name="description"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la descripción del ejercicio",
            },
          ]}
        >
          <Input
            placeholder="Descripción"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </Form.Item>
        <Form.Item
          required
          label="Video:"
          name="video"
          rules={[
            { required: true, message: "Por favor ingresa la URL del video" },
            {
              pattern: youtubeRegex,
              message:
                "El video debe ser una URL de youtube válida con formatos: https://www.youtube.com/watch?v=XXXXXXXXXXX",
            },
          ]}
        >
          <Input
            placeholder="Video"
            name="video"
            onChange={handleChange}
            value={formData.video}
          />
        </Form.Item>
        <Form.Item
          required
          label="Imagen 1:"
          name="image1"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la URL de la imagen 1",
            },
            {
              pattern: urlRegex,
              message:
                "La imagen 1 debe ser una URL válida con formatos: png, jpg, jpeg, gif",
            },
          ]}
        >
          <Input
            placeholder="Imagen 1"
            name="image1"
            onChange={handleChange}
            value={formData.image1}
          />
        </Form.Item>
        <Form.Item
          required
          label="Imagen 2:"
          name="image2"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la URL de la imagen 2",
            },
            {
              pattern: urlRegex,
              message:
                "La imagen 2 debe ser una URL válida con formatos: png, jpg, jpeg, gif",
            },
          ]}
        >
          <Input
            placeholder="Imagen 2"
            name="image2"
            onChange={handleChange}
            value={formData.image2}
          />
        </Form.Item>
        <Typography.Text type="secondary" className="mr-10">
          Tipo de ejercicio:
        </Typography.Text>
        <Form.Item
          required
          name="type"
          rules={[
            {
              required: true,
              message: "Por favor selecciona el tipo de ejercicio",
            },
          ]}
        >
          <Select
            defaultValue={exerciseTypes[0].label}
            value={selectedExerciseType}
            onChange={handleExerciseTypeChange}
            options={exerciseTypes}
            className="select-exercise-type"
          />
        </Form.Item>
        <Form.Item required>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="btn-add-exe"
          >
            Agregar Ejercicio
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AgregarEjercicio;
