function fetchAPI() {
    return fetch('https://deckofcardsapi.com/api/deck/new')
      .then((response) => response.json())
      .then((data) => data);
  }
  
  // const retorno = fetchAPI(); 
  
  // retorno.then((valor) => {
  //   console.log(valor);
  //   return valor;
  // }).then().then().then((oQueTenhoAqui) => console.log(oQueTenhoAqui));
  
  console.log('01');
  
  // async function fetchAPI2(){
  //   console.log('01 fetchAPI2');
  //   const response = await fetch('https://deckofcardsapi.com/api/deck/new');
  //   console.log(response);
  //   console.log('02 fetchAPI2');
  // }
  
  const fetchAPI2 = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/baralho/new');
      const dados = await response.json();
    
      console.log(dados);
      return dados;
    } catch (error) {
      console.log(error);
    }
  };
  
  fetchAPI2();