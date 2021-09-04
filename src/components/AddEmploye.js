import React, {useState} from 'react'
import EmployeDataService from '../services/EmployeService'

const AddEmploye = () => {
    const initialEmployeState = {
        // id:null,
        nom: '',
        prenom: '',
        age: 0,
        poste: '',
        experience: []
    }
    const [employe, setEmploye] = useState(initialEmployeState)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = event => {
        const {name, value} = event.target
        setEmploye({ ...employe, [name]: value })
    }

    const saveEmploye = () => {
        let data = {
            nom: employe.nom,
            prenom: employe.prenom,
            age: parseInt(employe.age),
            poste: employe.poste,
            experience: employe.experience
        }
        // console.log(JSON.stringify(data))
        EmployeDataService.create(data)
            .then(res => {
                setEmploye({
                    nom: res.data.nom,
                    prenom: res.data.prenom,
                    age: res.data.age,
                    poste: res.data.poste,
                })

                setSubmitted(true);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e)
            })
        setEmploye(initialEmployeState)
    }

    const newEmploye = () => {
        setEmploye(initialEmployeState);
        setSubmitted(false);
    };

    return (
         <div className="submit-form">
        {submitted ? (
            <div>
                <h4>Employee successfully created!</h4>
                <button className="btn btn-success" onClick={newEmploye}>
                    Add
                </button>
            </div>
        ) : (
            <div>
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        required
                        value={employe.nom}
                        onChange={e => handleInputChange(e)}
                        name="nom"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        required
                        value={employe.prenom}
                        onChange={e => handleInputChange(e)}
                        name="prenom"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        min="18"
                        max="60"
                        className="form-control"
                        id="age"
                        required
                        value={employe.age}
                        onChange={e => handleInputChange(e)}
                        name="age"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="poste">Poste</label>
                    <input
                        type="text"
                        className="form-control"
                        id="poste"
                        required
                        value={employe.poste}
                        onChange={e => setEmploye({...employe, poste: e.target.value})}
                        name="poste"
                    />
                </div>

                <button onClick={saveEmploye} className="btn btn-success">
                    Créer
                </button>
            </div>
        )}
    </div>
    )
}

export default AddEmploye
