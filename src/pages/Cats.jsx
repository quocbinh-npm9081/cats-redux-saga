import './cats.css'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getCatsFetch, getMoreCats } from '../catSlice';
import { useNavigate, useParams } from 'react-router-dom';
function Cats() {


  const dispatch = useDispatch();

  const cats = useSelector(state=> state.cats.cats)

  const loading = useSelector(state =>state.cats.isLoading)

  const {page} = useParams()

  const pageInStore = useSelector(state => state.cats.page)

  const itemFakeForLoading = Array.from(Array(6).keys());

  const history = useNavigate();

  const perCat = 5;
  const [next, setNext] = useState(perCat);

  useEffect(() => {

    dispatch(getCatsFetch());
  

  }, [dispatch]);


  useEffect(() => {
    history(`/cats/${pageInStore}`)
    console.log(pageInStore);

  }, [history,pageInStore]);
  
  // console.log(cats);

    const handleClickMoreCat = ()=>{
        setNext(next + perCat);

        dispatch(getMoreCats(1))

    }


    const handleBack = ()=>{

        history(-1)

    }


  return (
    <div className="Cats">
        <div className='row-header'>
        <button className='backBtn'
        onClick={handleBack}
        >
           back
        </button>
        <h1>
          CAT SPECIES GALLERY
        </h1>
        </div>
        {
          loading ? (
          <SkeletonTheme baseColor="#FFFF" highlightColor="gray">      
            <div className="Gallery">
              {
                itemFakeForLoading.map(item =>(
                  <div className="row" key={item}>
                  <div className='column column-left'>
                      <Skeleton count={1} width="200px" height="200px"  /> 
                    </div>
                    <div className='column column-right'>
                      <h2> <Skeleton count={1} width="80px" /> </h2>
                      <h5> <Skeleton count={1} width="200px" /> </h5>
                      <p>
                        <Skeleton count={5} width="400px"/> 
                      </p>
                    </div>
                  </div>
                
                ))
              }
            
                                  
            </div>
            <button 
            className='btn'
            >
              Loading ...
            </button>  
          </SkeletonTheme>
          ) :(
            <>
            <div className="Gallery">
            {
              cats?.slice(0,next)?.map((cat,index)=>(
                <div key={cat.id} className="row">
                 <div className='column column-left'>
                    {cat.image && ( 
                        <img src={cat.image.url } alt={cat.name} width="200" height="200" />
                    )}
               
                 </div>
                 <div  className='column column-right'>
                    <h2>{cat.name}</h2>
                    <h5>Temperament : {cat.temperament}</h5>
                    <p>
                      {cat.description}
                    </p>
                 </div>
                </div>
              ))
            }
          </div>
            {
                next <cats.length && (
                    <button 
                    className='btn'
                    onClick={handleClickMoreCat}
                    >
                        VIEW MORE
                    </button>  
                ) 
            }
            </>
          )
        }


   
    </div>
  );
}

export default Cats;
