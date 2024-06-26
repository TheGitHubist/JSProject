import { Scene } from 'phaser';

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
        this.playerOneSacrifices = [];
        this.playerTwoSacrifices = [];
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
        if (this.field.PlayerOneDeck.length > 0) {
          let randomIndex = Math.floor(Math.random() * this.field.PlayerOneDeck.length);
          let drawnCard = this.field.PlayerOneDeck.splice(randomIndex, 1)[0];
          this.makeCard(drawnCard.name, 0, { atk: drawnCard.atk, hp: drawnCard.hp, sacrificesRequired: drawnCard.sacrificesRequired });
        } else {
          console.log("No more cards in the deck!");
        }
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

class Card {
    constructor(scene, name, xPos, atk, hp, sacrificesRequired, isBack=false) {
        if (isBack) {
            this.card = scene.add.image( 455 + (xPos*89), 25, 'dos-des-cartes' ).setScale(0.09, 0.09);
        } else {
            this.card = scene.add.image( 470 + (xPos*90), 750, name ).setScale(0.06, 0.06).setInteractive();
        }
        this.scene = scene;
        this.originX = 470 + (xPos*90);
        this.originY = 750;
        this.hasBeenDraged = false;
        this.atk = atk;
        this.hp = hp;
        this.sacrificesRequired = sacrificesRequired;
        this.maxHp = hp;
        this.effects = [];
    }
    heal(heal) {
        this.hp += heal;
    }
    attack(card) {
        card.takeDamage(this.atk);
    }
    takeDamage(atk) {
        this.hp = this.hp - atk
        if (this.hp < 0) {
            this.hp = 0
        }
    }
    addEffect(effect) {
        this.effects.push(effect);
    }
    applyEffects() {
        for (let i = 0; i < this.effects.length; i++) {
            const effect = this.effects[i];
            if (effect.params) {
                effect.func.call(this, effect.params);
            } else {
                effect.func.call(this);
            }
            if (!effect.repeat) {
                this.effects.splice(i, 1);
            }
        }
    }
    canBeSummoned() {
        return this.scene.field.playerOneSacrifices.length >= this.sacrificesRequired;
    }
    canSummon() {
        if (this.canBeSummoned() && this.sacrificesRequired > 0 && this.hasBeenDraged) {
            let sc = 0;
            while (sc < this.sacrificesRequired) {
                let ZaCardo = this.scene.field.playerOneSacrifices.shift()
                for (let i = 0; i < 100; i++) {
                    this.scene.moveRight(this)
                }
                this.scene.field.PlayerOneAnihilatedCards.push(ZaCardo);
                sc++;
            }
        }
        return this.canBeSummoned()
    }
}

class CardData {
    constructor(name, atk, hp, sacrificesRequired, mentor=false) {
        this.name = name;
        this.atk = atk;
        this.hp = hp;
        this.sacrificesRequired = sacrificesRequired;
        this.mentor = mentor;
    }
}

let turns = {
    draw_standby : 1,
    attack : 2,
    end_turn : 3
}

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }
    preload() {
        // All equipemennts cards
        this.load.image('BigBob', '../assets/equipement/Big_Bob.png');
        this.load.image('Bonne_Salle.png', '../assets/equipement/Bonne_Salle.png');
        this.load.image('Electricite', '../assets/equipement/Electricite.png');
        this.load.image('Lamentation', '../assets/equipement/Lamentation.png');
        this.load.image('SetUpLoL', '../assets/equipement/Set_up_de_riche_pour_LoL.png');
        this.load.image('SOUK', '../assets/equipement/SOUK.png');
        this.load.image('Spectre', '../assets/equipement/Spectre.png');
        this.load.image('SSD_2To', '../assets/equipement/SSD_2To.png');
        this.load.image('Vexcalibur', '../assets/equipement/Vexcalibur.png');

        // All field cards
        this.load.image('Forteresse', '../assets/terrain/Forteresse.png');
        this.load.image('Reseaux_vex', '../assets/terrain/Reseaux-vex.png');

        // All Supports cards
        this.load.image('Appel_a_un_mentor', '../assets/soutien/Appel_a_un_mentor.png');
        this.load.image('Avenement_de_la_democratie', '../assets/soutien/Avenement_de_la_democratie.png');
        this.load.image('Chat_GPT', '../assets/soutien/Chat_GPT.png');
        this.load.image('crousty_poulet', '../assets/soutien/crousty_poulet.png');
        this.load.image('Nuit_Blanche', '../assets/soutien/Nuit_Blanche.png');
        this.load.image('Tomate_Reveilletard', '../assets/soutien/Tomate_Reveilletard.png');
        this.load.image('Trous_noirs', '../assets/soutien/Trous_noirs.png');
        this.load.image('Open_source', '../assets/soutien/Open_source.png'); 

        // All Traps cards
        this.load.image('Article_absolu', '../assets/piege/Article_absolu.png');
        this.load.image('Cest_linstant___INFOGRAMMES', '../assets/piege/Cest_linstant___INFOGRAMMES.png');
        this.load.image('crousty_chips', '../assets/piege/crousty_chips.png');
        this.load.image('Decalage_horaire', '../assets/piege/Decalage_horaire.png');
        this.load.image('hackerman', '../assets/piege/hackerman.png');
        this.load.image('Insomnie', '../assets/piege/Insomnie.png');
        this.load.image('Bomb', "../assets/piege/Nah_I'd_Eagle_500KG_bomb.png");
        this.load.image('RTFD', '../assets/piege/R_T_F_D.png');
        this.load.image('Solution_des_mentors', '../assets/piege/Solution_des_mentors.png');
        this.load.image('Tele_de_la_salle_201.png', '../assets/piege/Tele_de_la_salle_201.png');
        this.load.image('Thomas_Strabismes', '../assets/piege/Thomas_Strabismes.png');
        this.load.image('Anti_mentor', '../assets/piege/Touche_a_mon_PC_jte_fume.png');
        this.load.image('Nah_i_d_Eagle_500KG_bomb', '../assets/piege/Nah_i_d_Eagle_500KG_bomb.png');

        // All Monsters Cards
        this.load.image('Arcaniste_Prismatique', '../assets/monstres/Arcaniste_Prismatique.png');
        this.load.image('Chasseur_Prismatique', '../assets/monstres/Chasseur_Prismatique.png');
        this.load.image('Developpeur_surcharge', '../assets/monstres/Developpeur_surcharge.png');
        this.load.image('EXODIA_Anthony', '../assets/monstres/EXODIA_Anthony.png');
        this.load.image('FC_Classico_Leo', '../assets/monstres/FC_Classico_Leo.png');
        this.load.image('Luc_Destructeur_de_chargeur', '../assets/monstres/Luc_Destructeur_de_chargeur.png');
        this.load.image('Luka_retraite', '../assets/monstres/Luka_retraite.png');
        this.load.image('Mage_Vodoo_Ultime', '../assets/monstres/Mage_Vodoo_Ultime.png');
        this.load.image('MemeLord_Malveillance_MAX', '../assets/monstres/MemeLord_Malveillance_MAX.png');
        this.load.image('Ranked_Level_400_sur_LoL', '../assets/monstres/Ranked_Level_400_sur_LoL.png');
        this.load.image('Saitam-Azad', '../assets/monstres/Saitam-Azad.png');
        this.load.image('Salut_a_toi_jeune_entrepreneur', '../assets/monstres/Salut_a_toi_jeune_entrepreneur.png');
        this.load.image('Sentinelle', '../assets/monstres/Sentinelle.png');
        this.load.image('Titan_Prismatique', '../assets/monstres/Titan_Prismatique.png');
        this.load.image('Titouan', '../assets/monstres/Titouan.png');
        this.load.image('Tu_veux_mon_sandwitch', '../assets/monstres/Tu_veux_mon_sandwitch.png');
        this.load.image('Thomas_Fourras', '../assets/monstres/Thomas_Fourras.png');

        //back of cards
        this.load.image('dos-des-cartes','../assets/dos-des-cartes.png')

        // field
        this.load.image('field', '../assets/png-clipart-yu-gi-oh-skin-texture-mapping-pattern-field-soccer-field-rectangle-symmetry-thumbnail.png');

        this.field = new Field();
        this.cards = []
        this.turns = turns.draw_standby;

        this.pOneLife = 100;
        this.pTwoLife = 100;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    positionChecker(x, y, originX, originY, typeCard, card, gameObject) {
        const monsterField = this.field.PlayerOneMonsterField;
        const specialField = this.field.PlayerOneSpecialField;
    
        switch(typeCard) {
            case 'monster':
                if (card.hasBeenDraged) {
                    gameObject.x = originX;
                    gameObject.y = originY;
                    return false;
                }

                if (monsterField.length >= 5) {
                    gameObject.x = originX;
                    gameObject.y = originY;
                    return false;
                }
    
                if (y < 460 || y > 600) {
                    gameObject.x = originX;
                    gameObject.y = originY;
                    return false;
                }
    
                if (x <= 430 && x >= 300) {
                    gameObject.x = 355;
                } else if (x > 430 && x <= 560) {
                    gameObject.x = 500;
                } else if (x > 560 && x <= 700) {
                    gameObject.x = 640;
                } else if (x > 700 && x <= 840) {
                    gameObject.x = 780;
                } else if (x > 840 && x <= 970) {
                    gameObject.x = 920;
                } else if (x < 220) {
                    gameObject.x = 203;
                    gameObject.y = 720;
                    card.hasBeenDraged = true;
                    this.field.playerOneSacrifices.push(card);
                    return true;
                } else {
                    gameObject.x = originX;
                    gameObject.y = originY;
                    return false;
                }
    
                gameObject.y = 520;
    
                monsterField.push(card);
                card.hasBeenDraged = true;
                return true;
    
            case 'support':
            case 'trap':
                if (specialField.length >= 5) {
                    gameObject.x = originX;
                    gameObject.y = originY;
                    return false;
                }
    
                if (y < 700 || y > 750) {
                    gameObject.x = originX;
                    gameObject.y = originY;
                    return false;
                }
    
                gameObject.x = x;
                gameObject.y = 725;
    
                specialField.push(card);
                return true;
        }
    }

    CanSummonExodia() {
        let mentors = 0;
        for (let i = 0; i < this.field.playerOneSacrifices.length; i++) {
            if (this.field.playerOneSacrifices[i].mentor) {
                mentors++;
            }
        }
        return mentors >= 4;
    }

    moveDown(gameObject) {
        gameObject.y += 10;
    }
    moveUp(gameObject) {
        gameObject.y -= 10;
    }
    moveLeft(gameObject) {
        gameObject.x -= 10;
    }
    moveRight(gameObject) {
        gameObject.x += 10;
    }
    makeCard(name, xPos, params, isBot=false, isBack=false) {
        if (isBot && isBack) {
            let card = new Card(this, name, xPos, params.atk, params.hp, params.sacrificesRequired, true)
            this.field.PlayerTwoHand.push(card);
            this.cards.push(card)
        } else {
            let card = new Card(this, name, xPos, params.atk, params.hp, params.sacrificesRequired)
            this.field.PlayerOneHand.push(card);
            this.cards.push(card)
        }
    }
    shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }
    botTurn() {
        console.log(this.field.PlayerTwoHand)
        for (let i = 0; i < this.field.PlayerTwoHand.length; i++) {
            console.log(i)
            //this.sleep(1500)
            let card = this.add.image(1070, 55, this.field.PlayerTwoHand[i].name).setScale(0.07, 0.07);
            card.rotation = Math.PI
        }
        this.turns = turns.draw_standby
    }
    create () {
        this.turns = turns.draw_standby;
        let self = this
        this.mouseX = this.input.mousePointer.x
        this.mouseY = this.input.mousePointer.y

        this.add.image(645, 390, 'field').setScale(3.7, 2.8);
        this.cardBack = this.add.image( 1067, 700, 'dos-des-cartes' ).setScale(0.1, 0.1);

        this.cardBack = this.add.image( 205, 55, 'dos-des-cartes' ).setScale(0.1, 0.1);

        this.sacrificePlace = this.add.image(203, 590, 'Trous_noirs').setScale(0.07, 0.07);
        this.sacrificePlaceTwo = this.add.image(1070, 205, 'Trous_noirs').setScale(0.07, 0.07);
        this.sacrificePlaceTwo.rotation = Math.PI;

        let saitamazad = new CardData('Saitam-Azad', 20, 1, 0, true)
        let titouan = new CardData('Titouan', 10, 10, 0)
        let MemeLord_Malveillance_MAX = new CardData('MemeLord_Malveillance_MAX', 20, 20, 4)
        let vodoo = new CardData('Mage_Vodoo_Ultime', 1, 1, 0)
        let luc_le_destructeur_de_chargeur = new CardData('Luc_Destructeur_de_chargeur', 10, 5, 0, true)
        let FC_Classico_Leo = new CardData('FC_Classico_Leo', 2, 20, 0)
        let EXODIA_Anthony = new CardData('EXODIA_Anthony', 20, 20, 0)
        let Thomas_Fourras = new CardData('Thomas_Fourras', 13, 1, 0, true)
        let Luka_retraite = new CardData('Luka_retraite', 14, 9, 0, true)
        let lol = new CardData('Ranked_Level_400_sur_LoL', 12, 8, 0, true)
        let Sentinelle = new CardData('Sentinelle', 17, 10, 0)
        let Tu_veux_mon_sandwitch = new CardData('Tu_veux_mon_sandwitch ', 10, 10, 0)
        let Developpeur_surcharge = new CardData('Developpeur_surcharge', 1, 10, 0)
        let Titan_Prismatique = new CardData('Titan_Prismatique', 20, 12, 1)
        let Chasseur_Prismatique = new CardData('Chasseur_Prismatique', 20, 12, 1)
        let Arcaniste_Prismatique = new CardData('Arcaniste_Prismatique', 20, 12, 1)
        let Article_absolu = new CardData('Article', 0, 0, 0)
        let Cest_linstant___INFOGRAMMES = new CardData('Cest_linstant___INFOGRAMMES ', 0, 0, 0)
        let Crousty_chips = new CardData('Crousty_chips ', 0, 0, 0)
        let Decalage_horaire = new CardData('Decalage_horaire ', 0, 0, 0)
        let hackerman = new CardData('hackerman', 0, 0, 0)
        let Insomnie= new CardData('Insomnie', 0, 0, 0)
        let Nah_i_d_Eagle_500KG_bomb = new CardData('Nah_i_d_Eagle_500KG_bomb', 0, 0, 0)
        let R_T_D_F= new CardData('R_T_D_F', 0, 0, 0)
        let Solution_des_mentors = new CardData('Solution_des_mentors', 0, 0, 0)
        let Tele_de_la_salle_201 = new CardData('Tele_de_la_salle_201', 0, 0, 0)
        let Thomas_Strabismes = new CardData('Thomas_Strabisme', 0, 0, 0)
        let Touche_a_mon_PC_jte_fume = new CardData('Touche_a_mon_PC_jte_fume', 0, 0, 0)
        let Forteresse = new CardData('Forteresse', 0, 0, 0)
        let Reseaux_vex = new CardData('Reseaux_vex', 0, 0, 0)
        let big_bob = new CardData('big_bob', 0, 0, 0)
        let Bonne_Salle = new CardData('Bonne_salle', 0, 0, 0)
        let Electricite = new CardData('Elecricite', 0, 0, 0)
        let Lamentation = new CardData('Lamentation', 0, 0, 0)
        let Set_up_de_riche_pour_lol = new CardData('Set_up_de_riche_pour_lol', 0, 0, 0)
        let SOUK = new CardData('SOUK', 0, 0, 0)
        let Spectre = new CardData('Spectre', 0, 0, 0)
        let SSD_2To = new CardData('SSD_2To', 0, 0, 0)
        let Vexcalibur = new CardData('Vexcalibure', 0, 0, 0)
        let Appel_a_un_mentor = new CardData('Appel_a_un_mentor', 0, 0, 0)
        let Avenement_de_la_democratie = new CardData('Avenement_de_la_democratie', 0, 0, 0)
        let Chat_GPT = new CardData('Chat_GPT', 0, 0, 0)
        let crousty_poulet = new CardData('crousty_poulet', 0, 0, 0)
        let Tomate_Reveilletard = new CardData('Tomate_Reveilletard', 0, 0, 0)
        let Open_source = new CardData('Open_source', 0, 0, 0)
        let Nuit_Blanche = new CardData('Nuit_Blanche', 0, 0, 0)
        let Trous_noirs = new CardData('Trous_noirs', 0, 0, 0)


        let deck = [saitamazad, titouan, MemeLord_Malveillance_MAX, vodoo, lol, luc_le_destructeur_de_chargeur, Developpeur_surcharge, Luka_retraite, Thomas_Fourras]
        this.shuffle(deck)

        for (let i = 0; i < 5; i++) {
            this.makeCard(deck[i].name, i, {atk: deck[i].atk, hp: deck[i].hp, sacrificesRequired: deck[i].sacrificesRequired});
        }

        let deckMentor = [saitamazad, lol, luc_le_destructeur_de_chargeur, Luka_retraite, Thomas_Fourras]
        this.shuffle(deckMentor)

        for (let i = 0; i < 5; i++) {
            this.makeCard(deckMentor[i].name, i, {atk: deckMentor[i].atk, hp: deckMentor[i].hp, sacrificesRequired: deckMentor[i].sacrificesRequired}, true, true);
        }
        
        const attackTurn = this.add.text(300, 380, "Tour d'attaque", { fill: '#000000' });
        attackTurn.setInteractive();
        attackTurn.on('pointerdown', () => {
            console.log("change turn")
            this.turns = turns.attack;
            attackTurn.disableInteractive();
        })

        const endTurn = this.add.text(880, 380, "Fin de tour", { fill: '#000000' });
        endTurn.setInteractive();
        endTurn.on('pointerdown', () => {
            console.log("change turn")
            this.turns = turns.end_turn;
            attackTurn.disableInteractive();
            endTurn.disableInteractive();
        })
    }


    playCardOnHand(x, y) {
        if (y > 700 && y < 800) {
            if (x < 520) {
                this.cards[0].move(x, y)
            }
        }
    }
    
    update(time, delta) {
        if (this.turns == turns.draw_standby) {
            this.mouseX = this.input.mousePointer.x;
            this.mouseY = this.input.mousePointer.y;
        
            let cardToDrag = null;
        
            if (this.currentlyDraggingCard) {
                for (let i = 0; i < this.cards.length; i++) {
                    let card = this.cards[i];
                    if (card.canSummon() && !card.hasBeenDraged && Phaser.Geom.Rectangle.Contains(card.card.getBounds(), this.input.manager.activePointer.x, this.input.manager.activePointer.y)) {
                        cardToDrag = card;
                        break;
                    }
                }
            } else {
                for (let i = 0; i < this.cards.length; i++) {
                    let card = this.cards[i];
                    if (card.canSummon() && !card.hasBeenDraged && Phaser.Geom.Rectangle.Contains(card.card.getBounds(), this.input.manager.activePointer.x, this.input.manager.activePointer.y)) {
                        cardToDrag = card;
                        break;
                    }
                }
            }
        
            if (cardToDrag && this.input.manager.activePointer.isDown) {
                if (!this.currentlyDraggingCard || this.currentlyDraggingCard !== cardToDrag) {
                    if (this.currentlyDraggingCard) {
                        this.currentlyDraggingCard.isDragging = false;
                        this.input.setDraggable(this.currentlyDraggingCard.card, false);
                    }
                    cardToDrag.isDragging = true;
                    this.input.setDraggable(cardToDrag.card);
                    this.currentlyDraggingCard = cardToDrag;
                }
                cardToDrag.card.x = this.input.manager.activePointer.x;
                cardToDrag.card.y = this.input.manager.activePointer.y;
                
            } else if (this.currentlyDraggingCard && !this.input.manager.activePointer.isDown) {
                this.currentlyDraggingCard.isDragging = false;
                this.input.setDraggable(this.currentlyDraggingCard.card, false);
                let ActX = this.currentlyDraggingCard.card.x;
                let ActY = this.currentlyDraggingCard.card.y;
                this.positionChecker(ActX, ActY, this.currentlyDraggingCard.originX, this.currentlyDraggingCard.originY, 'monster', this.currentlyDraggingCard, this.currentlyDraggingCard.card);
                this.currentlyDraggingCard.originX = ActX;
                this.currentlyDraggingCard.originY = ActY;
                this.currentlyDraggingCard = null;
            }
        } else if (this.turns = turns.end_turn) {
            this.botTurn()
        }
    }
}
