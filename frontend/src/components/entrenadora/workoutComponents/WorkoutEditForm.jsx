import {useState} from "react"

function WorkoutEditForm({workout,handleEditWorkout}) {
    const initialState =  {
        name: workout.name,
        description: workout.description
    }

    const [formData, setFormData] = useState(initialState)

    function handleChange(event) {
        const name = event.target.name
        let value = event.target.value

        setFormData({
            ...formData,
            [name]: value
        })
    }


    function handleSubmit(event) {
        event.preventDefault()
        handleEditWorkout(workout,formData)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group my-2 mx-4">
                <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group my-2 mx-4">
                <textarea 
                    className="form-control" 
                    name="description" 
                    placeholder="Description" 
                    onChange={handleChange}
                    value={formData.description}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mx-5 my-2">Save Changes</button>
        </form>
    )
}

export default WorkoutEditForm