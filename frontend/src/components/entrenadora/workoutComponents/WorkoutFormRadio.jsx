function WorkoutFormRadio({ handleRadioChange }) {
  return (
    <div className="flex gap-3 justify-center py-5">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="All"
          onChange={handleRadioChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          Todos
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio3"
          value="Strength Training"
          onChange={handleRadioChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          Fuerza
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio3"
          value="Aerobic"
          onChange={handleRadioChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio3">
          Aerobico
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio4"
          value="Stretch"
          onChange={handleRadioChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio4">
          Estiramiento
        </label>
      </div>
    </div>
  );
}

export default WorkoutFormRadio;
