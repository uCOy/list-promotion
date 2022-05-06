import React, { useState, useEffect } from 'react';
import formCss from './Form.module.css';
//useHistory
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UIButton from 'components/UI/Button/Button';
import { Link } from 'react-router-dom';

const initialValue ={
    title: '',
    imageUrl: '',
    url: '',
    price: 0,
}

const PromotionForm = ( { id } ) =>{

    const [values, setValues] = useState(id ? null: initialValue);
    const navigate = useNavigate();

    // console.log(values)
    function onChange(ev) {
        const { name, value } = ev.target;
        // console.log({name, value});
        setValues( { ...values, [name]: value } )
    }
       
    useEffect( () => {
        if(id){
            axios.get(`http://localhost:5000/promotions/${id}`)
            .then( (response) => {
                setValues(response.data);
            })
        }
    }, [])

    function onSubmit(ev){
        
        ev.preventDefault();

        const method = id ? 'put'  : 'post';
        const url = id 
            ? `http://localhost:5000/promotions/${id}`
            : 'http://localhost:5000/promotions'
    
        axios[method](url, values)
            .then( (response) =>{
                navigate('/');
            })


        // if(!id){
        //     axios.post('http://localhost:5000/promotions', values)
        //     .then((response) => {
        //         //navigate.push('/')
        //         navigate('/')
        //     })            
        // }
        // else{
        //     axios.post(`http://localhost:5000/promotions/${id}`, values)
        //         .then((response) => {
        //             //navigate.push('/')
        //             navigate('/')
        //         })
        // }
    }

    return(
        <div>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>
            {!values
                ? (
                    <div>Carregando...</div>
                ) : (
            <form onSubmit={onSubmit}>
                <div className={formCss.promotionFormGroup}>
                    <label htmlFor="title">Título</label>
                    <input type="text" id="title" name="title" value={values.title} onChange={onChange} />
                </div>
                <div className={formCss.promotionFormGroup}>
                    <label htmlFor="imageUrl">Url image</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={onChange} />
                </div>
                <div className={formCss.promotionFormGroup}>
                    <label htmlFor="url">Url</label>
                    <input type="text" id="url" name="url" value={values.url} onChange={onChange} />
                </div>
                <div className={formCss.promotionFormGroup}>
                    <label htmlFor="price">Preço</label>
                    <input type="number" step="any" id="price" name="price" value={values.price} onChange={onChange} />
                </div>
                <div className={formCss.promotionFormGroupButton}>                
                    <UIButton
                    component="button"
                    type="submit"
                    >
                        Salvar
                    </UIButton>

                {!values  &&
                                    
                    <UIButton
                    to="/"
                    component={Link}
                    theme="bordered-warning"
                    >
                        Cancelar
                    </UIButton>
                }
                {values &&
                    <UIButton
                    to="/"
                    component={Link}
                    theme="conteined-warning"
                    >
                        Cancelar
                    </UIButton>
                }
                </div>
            </form>
            )}
        </div>
    )
}

export default PromotionForm;