const {
    Card,
    Monster,
    Support,
    Trap,
    FieldCards,
    Equipement,
    Field,
    Deck,
    PlayerOne,
    PlayerTwo,
} = require('./cardClasses.js');

class CardFactory {
    createCard(cardType, name, image, effect, ...params) {
      switch (cardType) {
        case 'Monster':
          const monster = new Monster(name, image, ...params);
          monster.applyEffect = effect;
          return monster;
        case 'Support':
          const support = new Support(name, image, ...params);
          support.applyEffect = effect;
          return support;
        case 'Trap':
          const trap = new Trap(name, image, ...params);
          trap.applyEffect = effect;
          return trap;
        case 'FieldCards':
          const fieldCard = new FieldCards(name, image, ...params);
          fieldCard.applyEffect = effect;
          return fieldCard;
        case 'Equipement':
          const equipement = new Equipement(name, image, ...params);
          equipement.applyEffect = effect;
          return equipement;
        default:
          throw new Error(`Unknown card type: ${cardType}`);
      }
    }
  }