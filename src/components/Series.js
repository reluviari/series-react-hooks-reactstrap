import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('/api/series')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    const deleteSerie = id => {
        axios
            .delete('api/series/' + id) 
            .then(res => {
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
            })
    }

    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <Link onClick={() => deleteSerie(record.id)} className='btn btn-danger'>Remover</Link>
                    <Link to={'/series/' + record.id} className='btn btn-secondary'>Info</Link>
                </td>
            </tr> 
        )
    }

    if (data.length === 0) {
        return (
            <div className='container'> 
                <h1>Séries</h1>
                <div className='alert alert-warning alert-dismissible fade show' role='alert'>
                    <strong>Não há séries cadastradas. Clique <Link to="/series/novo" className="alert-link">aqui</Link> para cadastrar uma nova série.</strong>                        
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link 
                exact                
                to='/series/novo' 
                className='btn btn-secondary btn-block'>Adicionar série
            </Link>
            <hr/>
            <table className='table table-hover table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderLine)}
                </tbody>
            </table>
        </div>
    )
}

export default Series