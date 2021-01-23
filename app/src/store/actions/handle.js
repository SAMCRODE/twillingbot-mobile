import Config from '../../config/api';

export const confirmHandle = (handle) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log(Config.apiurl);
    const response = await fetch(
        `${Config.apiurl}/handle/confirm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify({handle: handle}),
        },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      if (errorResData.code === Config.codes.notFoundHandle) {
        throw new Error(`Não encontramos o usuario identificado por ${handle}`);
      }

      throw new Error('Algo sinistro ocorreu nos nossos servidores');
    }

    const resData = await response.json();

    return resData;
  };
};
