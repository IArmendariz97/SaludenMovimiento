function AddedExerciseCard({addedExercise,exercise}) {
    return (
        <div className="row text-center my-1 mx-5">
            <div className="card shadow">
            
                <div className="card-body">
                    <h4 className="card-title text-primary">{exercise.name}</h4>
                    <h6 className="card-subtitle my-1 text-secondary">{exercise.type}</h6>
                    <h6 className="card-subtitle my-1 text-danger">{addedExercise.length} minutes</h6>
                </div>
            </div>
            
        </div>

    )
}

export default AddedExerciseCard