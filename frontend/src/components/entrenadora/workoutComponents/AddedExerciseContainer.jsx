import AddedExerciseCard from "./AddedExerciseCard"
import { v4 as uuidv4 } from 'uuid'

function AddedExerciseContainer({addedExercises,exercises}) {
    function populateAddedExercises() {
        return addedExercises.map( (addedExercise) => {
            const exercise = exercises.find((exercise) => exercise.id ===addedExercise["exercise-id"])
            return <AddedExerciseCard key={uuidv4()} addedExercise={addedExercise} exercise={exercise}/>
        })
    }
    return (
        <div>
            {populateAddedExercises()}
        </div>
    )
}

export default AddedExerciseContainer