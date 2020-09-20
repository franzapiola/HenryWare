export const CREATE_REVIEW = 'CREATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const AVERAGE_REVIEW = 'AVERAGE_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const ALL_REVIEW = 'ALL_REVIEW';


export function allReview (payload){
    return function(dispatch) {
        return fetch(`http://localhost:3001/reviews/${payload}`)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: ALL_REVIEW, 
                     payload: json 
                });
          });
      };
}

export const averageReview = (product_id) => {
    return {
        type: AVERAGE_REVIEW,
        payload: product_id
    }
}