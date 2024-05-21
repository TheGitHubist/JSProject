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
  
    applyEffect(field, playerTurn, playerOpponent) {
      throw new Error("Must be implemented by subclass");
    }
}

class Monster extends Card {
    constructor(name, imageLink, hp, atk, sacrificesRequired) {
        if (new.target === Card) {
            throw new TypeError("Cannot construct Monster instances directly");
        }
        super(name, "Monster", imageLink);
        this.hp = hp;
        const maxHP = hp;
        this.atk = atk;
        this.sacrificesRequired = sacrificesRequired;
        this.equipedCards = [];
    }
  
    applyEffect() {
        throw new Error("Must be implemented by subclass");
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
        this.PlayerOneField = [];
        this.PlayerTwoField = [];
        this.PlayerOneGraveyard = [];
        this.PlayerTwoGraveyard = [];
        this.PlayerOneHand = [];
        this.PlayerTwoHand = [];
        this.PlayerOneDeck = new Deck().getPlayerOneDeck();
        this.PlayerTwoDeck = new Deck().getPlayerTwoDeck();
        this.PlayerOneFieldsCard = [];
        this.PlayerTwoFieldsCard = [];
        this.PlayerOneContinousSpell = [];
        this.PlayerTwoContinousSpell = [];
        this.PlayerOneContinousTrap = [];
        this.PlayerTwoContinousTrap = [];
        this.PlayerOneAnihilatedCards = [];
        this.PlayerTwoAnihilatedCards = [];
    }
    getPlayerOneField() {
        return this.PlayerOneField;
    }
    getPlayerTwoField() {
        return this.PlayerTwoField;
    }
    getPlayerOneGraveyard() {
        return this.PlayerOneGraveyard;
    }
    getPlayerTwoGraveyard() {
        return this.PlayerTwoGraveyard;
    }
    getPlayerOneHand() {
        return this.PlayerOneHand;
    }
    getPlayerTwoHand() {
        return this.PlayerTwoHand;
    }
    getPlayerOneDeck() {
        return this.PlayerOneDeck;
    }
    getPlayerTwoDeck() {
        return this.PlayerTwoDeck;
    }
    getPlayerOneFieldsCard() {
        return this.PlayerOneFieldsCard;
    }
    getPlayerTwoFieldsCard() {
        return this.PlayerTwoFieldsCard;
    }
    getPlayerOneContinousSpell() {
        return this.PlayerOneContinousSpell;
    }
    getPlayerTwoContinousSpell() {
        return this.PlayerTwoContinousSpell;
    }
    getPlayerOneContinousTrap() {
        return this.PlayerOneContinousTrap;
    }
    getPlayerTwoContinousTrap() {
        return this.PlayerTwoContinousTrap;
    }
    getPlayerOneAnihilatedCards() {
        return this.PlayerOneAnihilatedCards;
    }
    getPlayerTwoAnihilatedCards() {
        return this.PlayerTwoAnihilatedCards;
    }
}

class Deck {
    constructor() {
        this.PlayerOneDeck = [];
        this.PlayerTwoDeck = [];
    }
    getPlayerOneDeck() {
        return this.PlayerOneDeck;
    }
    getPlayerTwoDeck() {
        return this.PlayerTwoDeck;
    }
    drawPlayerOne() {
        return this.PlayerOneDeck.pop();
    }
    drawPlayerTwo() {
        return this.PlayerTwoDeck.pop();
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