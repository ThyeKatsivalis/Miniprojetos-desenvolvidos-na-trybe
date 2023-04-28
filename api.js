async function fetchAPI(endpoint) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${endpoint}`);
    const dados = await response.json();
    
    return dados;
  }
  
  export function shuffleDeck(deckId) {
    return fetchAPI(`${deckId}/shuffle`);
  }
  
  export async function drawNewCard(deckId) {
    const newCard = await fetchAPI(`${deckId}/draw`);
    return newCard.cards[0];
    // return fetchAPI(`${deckId}/draw`);
  }
  
  export function getNewDeck() {
    return fetchAPI('new');
  }