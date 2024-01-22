const ejercicios = [
  {
    nombre: 'Press de banca',
    grupoMuscular: ['Pecho'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Sentadillas',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Dominadas',
    grupoMuscular: ['Espalda'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Peso muerto',
    grupoMuscular: ['Espalda', 'Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Fondos en paralelas',
    grupoMuscular: ['Tríceps', 'Pecho'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Burpees',
    grupoMuscular: ['Cuerpo completo'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Flexiones de brazos',
    grupoMuscular: ['Pecho', 'Tríceps'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Plancha lateral',
    grupoMuscular: ['Abdominales', 'Espalda'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Prensa de piernas',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Mountain climbers',
    grupoMuscular: ['Abdominales', 'Cardio'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Remo con barra',
    grupoMuscular: ['Espalda'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Curl de bíceps',
    grupoMuscular: ['Bíceps'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Zancadas',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Plancha abdominal',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Ciclismo indoor',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Spinning',
  },
  {
    nombre: 'Flexiones diamante',
    grupoMuscular: ['Pecho', 'Tríceps'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Desplantes',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Abdominales en V',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Circuito HIIT',
    grupoMuscular: ['Cuerpo completo'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Flexiones hindúes',
    grupoMuscular: ['Pecho', 'Hombros'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Press militar',
    grupoMuscular: ['Hombros'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Peso muerto rumano',
    grupoMuscular: ['Espalda', 'Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Fondos en máquina',
    grupoMuscular: ['Tríceps', 'Pecho'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Step-ups',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Flexiones inclinadas',
    grupoMuscular: ['Pecho', 'Tríceps'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Goblet squat',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Pull-ups',
    grupoMuscular: ['Espalda', 'Bíceps'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Crunches',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Press de piernas',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Skipping',
    grupoMuscular: ['Cardio'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Elevaciones laterales',
    grupoMuscular: ['Hombros'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Russian twists',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Hip thrust',
    grupoMuscular: ['Glúteos'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Pull-over',
    grupoMuscular: ['Espalda', 'Pecho'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Box jumps',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Plancha inversa',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Curl martillo',
    grupoMuscular: ['Bíceps'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Patada de burro',
    grupoMuscular: ['Glúteos'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Carrera en intervalos',
    grupoMuscular: ['Cardio'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Face pull',
    grupoMuscular: ['Hombros'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Press de hombros con mancuernas',
    grupoMuscular: ['Hombros'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Pistol squat',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Pull-ups en L-sit',
    grupoMuscular: ['Espalda', 'Abdominales'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Curl con barra Z',
    grupoMuscular: ['Bíceps'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Dips entre bancos',
    grupoMuscular: ['Tríceps', 'Pecho'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Boxer shuffle',
    grupoMuscular: ['Cardio'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Dragon flags',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Prensa militar',
    grupoMuscular: ['Hombros'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Elevación de talones',
    grupoMuscular: ['Pantorrillas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Pull-ups con agarre ancho',
    grupoMuscular: ['Espalda'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Plancha con elevación de piernas',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Sissy squat',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Curl de martillo con cuerda',
    grupoMuscular: ['Bíceps'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Burpees con salto',
    grupoMuscular: ['Cuerpo completo'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Face pull con cuerda',
    grupoMuscular: ['Hombros'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Plancha lateral con rotación',
    grupoMuscular: ['Abdominales', 'Espalda'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Curl de bíceps en polea baja',
    grupoMuscular: ['Bíceps'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Carrera en cuesta',
    grupoMuscular: ['Cardio'],
    tipoEntrenamiento: 'Funcional',
  },
  {
    nombre: 'Sentadilla búlgara',
    grupoMuscular: ['Piernas'],
    tipoEntrenamiento: 'Musculación',
  },
  {
    nombre: 'Reverse crunch',
    grupoMuscular: ['Abdominales'],
    tipoEntrenamiento: 'Funcional',
  },
];
