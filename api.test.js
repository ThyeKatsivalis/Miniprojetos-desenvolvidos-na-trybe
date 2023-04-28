import {expect, describe, it} from '@jest/globals';
import fetch from 'node-fetch';
// eslint-disable-next-line no-undef
global.fetch = fetch;

import { getNewDeck, shuffleDeck } from './api';

describe('API' , () => {

  describe('Testa a função getNewDeck', () => {
    it('Deve retornar um novo deck', async () => {
      const newDeck = await getNewDeck();
      console.log(newDeck);
      expect(newDeck.deck_id).toBeDefined();
    });
  });

  describe('Testa a função shuffleDeck', () => {
    it('Deve retornar um deck embaralhado', async () => {
      const deck = await shuffleDeck('8vi7qww4mbfl');

      expect(deck.shuffled).toBeTruthy();
    });

    it('Deve retornar um erro se receber um deck invalido', async () => {
      const deck = shuffleDeck('deck-invalido');

      await expect(deck).rejects.toThrow();
    });
    it('Deve retornar um erro se receber um deck invalido 2', async () => {
      try {
        await shuffleDeck('deck-invalido');      
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});