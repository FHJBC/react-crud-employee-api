import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useTable } from 'react-table'
import EmployeDataService from '../services/EmployeService'

const EmployeList = (props) => {
    const [employes, setEmployes] = useState([])
    const [searchNom, setSearchNom] = useState('')
    const employesRef = useRef()

    employesRef.current = employes

    const columns = useMemo(
        () => [
      {
        Header: "Nom",
        accessor: "nom",
      },
      {
        Header: "Prénom",
        accessor: "prenom",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Poste",
        accessor: "poste",
      },
    //   {
    //     Header: "Status",
    //     accessor: "published",
    //     Cell: (props) => {
    //       return props.value ? "Published" : "Pending";
    //     },
    //   },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openEmploye(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteEmploye(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
            columns,
            data: employes,
        });

    useEffect(() => {
        retrieveEmployes()
    }, [])

     const onChangeSearchNom = (e) => {
        const searchNom = e.target.value;
        setSearchNom(searchNom);
    };

    const retrieveEmployes = () => {
        EmployeDataService.getAll()
         .then(res => {
            //  console.log(res.data)
             setEmployes(res.data['hydra:member'])
         })
         .catch(e => console.log(e))
    }

    const refreshList = () => {
        retrieveEmployes()
    }

    const removeAllEmployes = () => {
        EmployeDataService.removeAll()
         .then(res => {
             console.log(res.data)
             refreshList()
         })
         .catch(e => console.log(e))
    }

     const findByNom = () => {
        EmployeDataService.findByNom(searchNom)
        .then((res) => {
            setEmployes(res.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };


    const openEmploye = (rowIndex) => {
        const id = employesRef.current[rowIndex].id

        props.history.push('/employes/' + id)
    }

    const deleteEmploye = (rowIndex) => {
        const id = employesRef.current[rowIndex].id

        EmployeDataService.remove(id)
         .then(res => {
             props.history.push('/employes')

             let newEmployes = [...employesRef.current]
             newEmployes.splice(rowIndex, 1)

             setEmployes(newEmployes)
         })
         .catch(e => console.log(e))
    }

    return (
         <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by nom"
            value={searchNom}
            onChange={onChangeSearchNom}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
            //   onClick={findByNom}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllEmployes}>
          Remove All
        </button>
      </div>
    </div>
    )
}

export default EmployeList
