import { Scene } from 'phaser';
const { Card, Monster, Support, Trap, FieldCards, Equipement, Field, Deck, PlayerOne, PlayerTwo } = require('../helpers/cardClasses.js');


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
        this.load.image('SetUpLoL', '../assets/equipement/Set-up_de_riche_pour_LoL.png');
        this.load.image('SOUK', '../assets/equipement/SOUK.png');
        this.load.image('Spectre', '../assets/equipement/Spectre.png');
        this.load.image('SSD_2To', '../assets/equipement/SSD_2To.png');
        this.load.image('Vexcalibur', '../assets/equipement/Vexcalibur.png');

        // All field cards
        this.load.image('Forteresse', '../assets/terrain/Forteresse.png');
        this.load.image('Reseaux-vex', '../assets/terrain/Reseaux-vex.png');

        // All Supports cards
        this.load.image('Appel_a_un_mentor', '../assets/soutien/Appel_a_un_mentor.png');
        this.load.image('Avenement_de_la_democratie', '../assets/soutien/Avenement_de_la_democratie.png');
        this.load.image('Chat_GPT', '../assets/soutien/Chat_GPT.png');
        this.load.image('crousty-poulet', '../assets/soutien/crousty-poulet.png');
        this.load.image('Nuit_Blanche', '../assets/soutien/Nuit_Blanche.png');
        this.load.image('Tomate_Reveilletard', '../assets/soutien/Tomate_Reveilletard.png');
        this.load.image('Trous_noirs', '../assets/soutien/Trous_noirs.png');

        // All Traps cards
        this.load.image('Article_absolu', '../assets/piege/Article_absolu.png');
        this.load.image('Cest_linstant___INFOGRAMMES', '../assets/piege/Cest_linstant___INFOGRAMMES.png');
        this.load.image('crousty-chips', '../assets/piege/crousty-chips.png');
        this.load.image('Decalage_horaire', '../assets/piege/Decalage_horaire.png');
        this.load.image('hackerman', '../assets/piege/hackerman.png');
        this.load.image('Insomnie', '../assets/piege/Insomnie.png');
        this.load.image('Bomb', "../assets/piege/Nah_I'd_Eagle_500KG_bomb.png");
        this.load.image('RTFD', '../assets/piege/R.T.F.D.png');
        this.load.image('Solution_des_mentors', '../assets/piege/Solution_des_mentors.png');
        this.load.image('Tele_de_la_salle_201.png', '../assets/piege/Tele_de_la_salle_201.png');
        this.load.image('Thomas_Strambismes', '../assets/piege/Thomas_Strambismes.png');
        this.load.image('Anti_mentor', '../assets/piege/Touche_a_mon_PC_jte_fume.png');

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

        //back of cards
        this.load.image('dos-des-cartes','../assets/dos-des-cartes.png')

        // field
        this.load.image('field', '../assets/png-clipart-yu-gi-oh-skin-texture-mapping-pattern-field-soccer-field-rectangle-symmetry-thumbnail.png');
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
    makeCard(name, xPos) {
        this.card = this.add.image( 470 + (xPos*90), 750, name ).setScale(0.06, 0.06).setInteractive();
        this.input.setDraggable(this.card);
        this.input.on('drag', function (pointer, gameObject, dragX, dragY)  {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
    }
    drawCard(cardNumber, deckCard) {
        while (cardNumber < 5) {
            this.makeCard(deckCard.pop(), cardNumber);
            cardNumber++;
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
    create () {
        let self = this

        this.add.image(645, 390, 'field').setScale(3.7, 2.8);
        this.cardBack = this.add.image( 1067, 700, 'dos-des-cartes' ).setScale(0.1, 0.1);

        this.cardBack = this.add.image( 205, 55, 'dos-des-cartes' ).setScale(0.1, 0.1);

        for (let i = 0; i < 5; i++) {
            this.cardBack = this.add.image( 455 + (89*i), 25, 'dos-des-cartes' ).setScale(0.09, 0.09);
        }

        let deck = ['Titouan', 'Saitam-Azad', 'Salut_a_toi_jeune_entrepreneur', 'Mage_Vodoo_Ultime', 'Tu_veux_mon_sandwitch', 'MemeLord_Malveillance_MAX']
        this.shuffle(deck);

        let cardNumber = 0;
        this.drawCard(cardNumber, deck);
    }

    update () {

    }
}
