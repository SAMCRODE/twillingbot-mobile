import Config from '../../config/api';

export const getBotList = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        try{
            const response = await fetch(
                `${Config.apiurl}/bots/list`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            );
            const resData = await response.json();
            
            if(!response.ok){
                throw new Error(resData);
            }
            
            // console.log('recebi', resData);
            return resData.res;
        }catch(e){
            throw e;
        }
    }
}

export const tweet = (botsIds, tweet) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        try{
            const response = await fetch(
                `${Config.apiurl}/bots/tweet`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({botIds: botsIds, tweet: tweet})
                }
            );
            const resData = await response.json();
            console.log(resData);
            if(!response.ok){
                throw new Error(resData);
            }
            
            // console.log('recebi', resData);
            return resData.res;
        }catch(e){
            throw e;
        }
    }
}

export const follow = (botsIds, handle) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        try{
            const response = await fetch(
                `${Config.apiurl}/bots/follow`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({botIds: botsIds, handle: handle})
                }
            );
            const resData = await response.json();
            
            if(!response.ok){
                throw new Error(resData);
            }
            
            // console.log('recebi', resData);
            return resData.res;
        }catch(e){
            throw e;
        }
    }
}