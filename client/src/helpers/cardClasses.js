class Card {
    constructor(name, typeCard, imageLink) {
      if (new.target === Card) {
        throw new TypeError("Cannot construct Card instances directly");
      }
      this.name = name;
      this.typeCard = typeCard;
      this.imageLink = imageLink;
    }
  
    getName() {
      return this.name;
    }
  
    getTypeCard() {
      return this.typeCard;
    }
  
    getImageLink() {
      return this.imageLink;
    }
    applyEffect(field, playerPlaying, playerOpponent, effects) {
        // Default implementation, can be overridden by subclasses
        if (effects && effects.length > 0) {
          effects.forEach((effect) => {
            switch (effect.type) {
              case 'drawMentor':
                const mentorCard = playerPlaying.deck.drawCardByType('Mentor');
                if (mentorCard) {
                  playerPlaying.hand.addCard(mentorCard);
                  effect.once = true; // mark as used
                }
                break;
              case 'unkillable':
                if (effect.hp === 0) {
                  effect.hp = 1; // prevent HP from reaching 0
                }
                break;
              case 'doubleSacrifice':
                if (effect.sacrificed) {
                  playerPlaying.hand.addCard(this); // return to hand
                  effect.sacrifices = 2; // count as 2 sacrifices
                }
                break;
              // Add more effect types as needed
              default:
                console.log(`Unknown effect type: ${effect.type}`);
            }
          });
        } else {
          console.log('No effect options provided');
        }
    }
}

class Monster extends Card {
    constructor(name, imageLink, hp, atk, sacrificesRequired, isMentor) {
        if (new.target === Card) {
            throw new TypeError("Cannot construct Monster instances directly");
        }
        super(name, "Monster", imageLink);
        this.hp = hp;
        const maxHP = hp;
        this.atk = atk;
        this.sacrificesRequired = sacrificesRequired;
        this.equipedCards = [];
        this.isMentor = isMentor;
    }
  
    getHP() {
        return this.hp;
    }
  
    getATK() {
        return this.atk;
    }
  
    getSacrificesRequired() {
        return this.sacrificesRequired;
    }

    getEquipedCards() {
        return this.equipedCards;
    }
    getMaxHP() {
        return this.maxHP;
    }
    setHP(hp) {
        this.hp = hp;
    }
}

class Support extends Card {
    constructor(name, imageLink, isContinous) {
        if (new.target === Support) {
            throw new TypeError("Cannot construct Support instances directly");
        }
        super(name, "Support", imageLink);
        this.effect = effect;
        this.isContinous = isContinous;
    }
}

class Trap extends Card {
    constructor(name, imageLink, isContinous, isCounter) {
        if (new.target === Trap) {
            throw new TypeError("Cannot construct Trap instances directly");
        }
        super(name, "Trap", imageLink);
        this.isContinous = isContinous;
        this.isCounter = isCounter;
    }
}

class FieldCards extends Card {
    constructor(name, imageLink) {
        if (new.target === FieldCards) {
            throw new TypeError("Cannot construct Field instances directly");
        }
        super(name, "Field", imageLink);
    }
}

class Equipement extends Card {
    constructor(name, imageLink) {
        if (new.target === Equipement) {
            throw new TypeError("Cannot construct Equipement instances directly");
        }
        super(name, "Equipement", imageLink);
    }
}

class Field {
    constructor() {
        this.PlayerOneMonsterField = [];
        this.PlayerTwoMonsterField = [];
        this.PlayerOneSpecialField = [];
        this.PlayerTwoSpecialField = [];
        this.PlayerOneGraveyard = [];
        this.PlayerTwoGraveyard = [];
        this.PlayerOneHand = [];
        this.PlayerTwoHand = [];
        this.PlayerOneDeck = new Deck().getDeck();
        this.PlayerTwoDeck = new Deck().getDeck();
        this.PlayerOneFieldsCard = [];
        this.PlayerTwoFieldsCard = [];
        this.PlayerOneContinousSpell = [];
        this.PlayerTwoContinousSpell = [];
        this.PlayerOneContinousTrap = [];
        this.PlayerTwoContinousTrap = [];
        this.PlayerOneAnihilatedCards = [];
        this.PlayerTwoAnihilatedCards = [];
    }
}

class Deck {
    constructor() {
      this.cards = [];
    }
  
    addCard(card) {
      this.cards.push(card);
    }
  
    drawCard() {
      return this.cards.pop();
    }

    getDeck() {
        return this.cards;
    }
  
    drawCardByType(type) {
      const matchingCards = this.cards.filter((card) => card.type === type);
      if (matchingCards.length > 0) {
        return this.drawCard();
      } else {
        console.log(`No cards of type ${type} found in the deck`);
        return null;
      }
    }
  }

class PlayerOne {
    constructor(name) {
        this.name = name;
        this.hp = 100;
        this.deck = new Field().getPlayerOneDeck();
        this.hand = new Field().getPlayerOneHand();
        this.hasWon = false;
    }
}

class PlayerTwo {
    constructor(name) {
        this.name = name;
        this.hp = 100;
        this.deck = new Field().getPlayerTwoDeck();
        this.hand = new Field().getPlayerTwoHand();
        this.hasWon = false;
    }
}

module.exports = {
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
  };