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

class ExodiaAnthony extends Monster {
    constructor(playerPlaying, playerOpponent, image) {
        super('Exodia Anthony', image, 1000, 1000, 4);
        this.playerPlaying = playerPlaying;
        this.playerOpponent = playerOpponent;
    }
    applyEffect(field, playerPlaying, playerOpponent) {
        playerPlaying.hasWon = true;
    }
}

class SalutAToiJeuneEntrepreneur extends Monster {
    constructor(playerPlaying, playerOpponent, hpOfSacrifices) {
        super('Salut A Toi Jeune Entrepreneur', image, 10, hpOfSacrifices, 2);
        this.playerPlaying = playerPlaying;
        this.playerOpponent = playerOpponent;
        this.hasUsedEffect = false;
    }
    applyEffect(field, playerPlaying, playerOpponent) {
        if (this.hasUsedEffect) {
            return;
        }
        for (card in field.PlayerOneField) {
            card.setHP(card.getMaxHP());
            this.atk += card.getATK();
        }
        for (card in field.PlayerTwoField) {
            card.setHP(card.getMaxHP());
            this.atk += card.getATK();
        }
        this.hasUsedEffect = true;
    }
}


module.exports = { ExodiaAnthony, SalutAToiJeuneEntrepreneur };