import {call, put, takeEvery, takeLeading} from 'redux-saga/effects'
import { getCatsSuccess } from '../catSlice';




function* workGetCatsFetch(){

    const cats = yield call(()=> fetch('https://api.thecatapi.com/v1/breeds'));
    const formattedCats =yield cats.json();   
    // const formattedCatsShortened = formattedCats.slice(10,30);
    console.log("saga",formattedCats);
    yield put(getCatsSuccess({
        cats: formattedCats,
        
    }))
}

function* catSaga(){
   yield takeEvery("cats/getCatsFetch", workGetCatsFetch );
yield takeLeading("cats/getMoreCats", workGetCatsFetch);
}

export default catSaga