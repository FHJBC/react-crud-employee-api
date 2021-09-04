import React, { useState, useEffect } from 'react'
import EmployeDataService from '../services/EmployeService'

const Employe = props => {
    const initialEmployeState = {
        nom: '',
        prenom: '',
        age: 0,
        poste: '',
        experience: []
    }

    const [currentEmploye, setCurrentEmploye] = useState(initialEmployeState)
    const [message, setMessage] = useState('')

    const getEmploye = id => {
        EmployeDataService.get(id)
         .then(res => {
             setCurrentEmploye(res.data)
             console.log(res.data)
         })
         .catch(e => console.log(e))
    }

    useEffect(() => {
        getEmploye(props.match.params.id)
    }, [props.match.params.id])

    // const handleInputChange = event => {
    //     const { name, value} = event.target
    //     setCurrentEmploye({...currentEmploye, [name]: value})
    // }

    let updatedEmploye = {
        nom: currentEmploye.nom,
        prenom: currentEmploye.prenom,
        age: currentEmploye.age,
        poste: currentEmploye.poste,
        experience: currentEmploye.experience
    }

    const updateEmploye = () => {
        EmployeDataService.update(currentEmploye.id, updatedEmploye)
        .then(res => {
            console.log(res.data);
            setMessage("The tutorial was updated successfully!");
        })
        .catch(e => {
            console.log(e)
        })
    }

  const deleteEmploye = () => {
    EmployeDataService.remove(currentEmploye.id)
      .then(res => {
        console.log(res.data);
        props.history.push("/employes");
      })
      .catch(e => {
        console.log(e);
      });
  }

    return (
        <div>
      {currentEmploye ? (
        <div className="edit-form">
          <h4>Employé</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={currentEmploye.nom}
                onChange={e => setCurrentEmploye({...currentEmploye, nom: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                className="form-control"
                id="prenom"
                name="prenom"
                value={currentEmploye.prenom}
                onChange={e => setCurrentEmploye({...currentEmploye, prenom: e.target.value})}
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
                name="age"
                value={currentEmploye.age}
                onChange={e => setCurrentEmploye({...currentEmploye, age: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="poste">Poste</label>
              <input
                type="text"
                className="form-control"
                id="poste"
                name="poste"
                value={currentEmploye.poste}
                onChange={e => setCurrentEmploye({...currentEmploye, poste: e.target.value})}
              />
            </div>

            {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div> */}
          </form>

          {/* {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(falsEmploye
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )} */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-danger" onClick={deleteEmploye}>
                    Delete
                </button>

                <button
                    type="submit"
                    className="btn btn-success"
                    onClick={updateEmploye}
                >
                    Update
                </button>
            </div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Employe...</p>
        </div>
      )}
        </div>
    )
}

export default Employe
