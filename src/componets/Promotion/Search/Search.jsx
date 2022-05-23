import React, {useEffect, useState} from "react";
import searchCss from './Search.module.css';
// import axios from 'axios';
import PromotionCard from '../card/Card';
import { Link } from "react-router-dom";
import UIButton from '../../UI/Button/Button';
import api from '../../../Services/Api' 


const PromotionSearch = () => { 
        const [promotions, setPromotions] =  useState([]);
        const[ search, setSearch] = useState('');
        const [onDelete, setOnDelete] =  useState(null);
    

         useEffect(() => {
           const params = {};
           if (search) {
             params.title_like = search;}
             
             const getSeach = async () => {
               try {
                 const promotions = await api.get('/promotions?_embed=comments', {params} ) 
                 setPromotions(promotions.data);
                } catch (error){
                  console.log(error);
                }}
                getSeach();

         }, [search, onDelete])

         const handleDelete = async (id) => {
          // const method = 'delete';
          // const url = `promotions/${id}`
          // await api[method](url)
          try{
            await api.delete(`/promotions/${id}`);
            setOnDelete(id);   
          }catch (error) {
            console.log(error);
          }
         }

          return (
         <>
         <header className={searchCss.PromotionSearchHeader}>
           <h1> promo show</h1>
           <UIButton to= "/create" theme="contained-success" component={Link}>Nova promoção</UIButton>
         </header>
         <input type="search"
         className={searchCss.PromotionSearchInput} 
         placeholder="Busca"
         value={search}
         onChange={(ev) => setSearch(ev.target.value)}
         />
          {promotions.map((promotion) =>(
            <PromotionCard 
            promotion={promotion} 
            key={promotion.id}
            onClickDelete={ () => handleDelete(promotion.id) }
            />
           ) )}  
         </>
    );

};

export default PromotionSearch;
