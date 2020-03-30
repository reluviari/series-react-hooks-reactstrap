import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) => {

    const [name, setName] = useState('')

    const [success, setSuccess] = useState(false)

    const [mode, setMode] = useState('INFO')

    const [data, setData] = useState({})

    useEffect(() => {
      axios
        .get('/api/series/' + match.params.id)
        .then(res => {
          setData(res.data)
        })
    }, [match.params.id])

    //Custom Header
    const masterHeader = {
      height:'50vh',
      minHeight:'500px',
      backgroundImage: `url('${data.background}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    const onChange = event => {
        setName(event.target.value)
    }

    const onSave = () => {
        axios.post('/api/series/', {
            name
        })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return (
            <div>
               <Redirect to='/series' />
            </div>
        )
    }

    return (
        <div>
          <header style={masterHeader}>
            <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <div className='h-100 container'>
              <div className="row h-100 align-items-center">
                <div className="col-3">
                  <img src={data.poster} alt={data.name} className='img-fluid img-thumbnail'/>
                </div>
                <div className="col-9">
                  <h1 className='font-weight-light text-white'>{data.name}</h1>
                  <div className="lead text-white">
                    <Badge color='success'>Assistido</Badge>
                    <Badge color='warning'>Assistir</Badge>
                    <p>Gênero: {data.genre}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </header>
          {
            mode === 'EDIT' &&
          <div className='container'>
            <h1>Informações da Série</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Série' />
                </div>
                <button type='button' onClick={onSave} className='btn btn-primary'>Salvar</button>
            </form>
          </div>
          }
        </div>          
    )
}


export default InfoSerie 