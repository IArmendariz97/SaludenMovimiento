import { useForm } from "react-hook-form";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto py-20">
      <h2 className="text-3xl text-customOrange font-bold mb-4">
        AQUI PUEDES CONTACTARNOS
      </h2>
      <h3 className="text-sm mb-4">
        Coloca tus datos y qué preguntas quieres hacernos
      </h3>
      {errors.firstName && <span>Este campo es obligatorio</span>}
      <input
        type="text"
        placeholder="Nombre"
        {...register("firstName", { required: true })}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      {errors.lastName && <span>Este campo es obligatorio</span>}
      <input
        type="text"
        placeholder="Apellido"
        {...register("lastName", { required: true })}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      {errors.interest && <span>Selecciona una opción</span>}
      <select
        {...register("interest", { required: true })}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      >
        <option value="">En qué estás interesado</option>
        <option value="rutinaPersonalizada">
          Rutina personalizada en tu casa
        </option>
        <option value="entrenamientoPresencial">
          Entrenamiento presencial
        </option>
        <option value="indumentaria">Indumentaria</option>
      </select>
      {errors.email && <span>Ingresa un correo electrónico válido</span>}
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <textarea
        placeholder="Mensaje"
        {...register("message")}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <button type="submit" className="bg-blue-500  py-2 px-4 rounded-md">
        Enviar
      </button>
    </form>
  );
}

export default ContactForm;
