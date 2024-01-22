import {Link} from "react-router-dom"
function WorkoutCard({workout,deleteCard}) {
    

    function handleDeleteCard() {
        deleteCard(workout.id)
        
    }

    
    return (
        <div className="col-8 m-3 d-flex justify-content-center">
            <div className="card shadow">
            
                <div className="card-body">
                    <h5 className="card-title">{workout.name}</h5>
                    <p className="card-text">{workout.description}</p>
                    <Link className="btn btn-primary mx-5" to={`../workouts/${workout.id}`}>
                        More Info
                    </Link>
                    <button onClick={handleDeleteCard} className="btn btn-secondary mx-5">Delete</button>
                    
                </div>
            </div>
            
           
        </div>
    )
}

export default WorkoutCard