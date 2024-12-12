const { log } = require("console");
const Pokemilton = require("./Pokemilton");
const Game = require("./Game");

class PokemiltonMaster {
  constructor({
    name,
    healingItems,
    reviveItems,
    POKEBALLS,
    pokemiltonCollection,
  }) {
    this.name = name;
    this.pokemiltonCollection = (pokemiltonCollection || []).map(
      (p) => new Pokemilton()
    );
    this.healingItems = healingItems || 5; //Initial number of healing items
    this.reviveItems = reviveItems || 3; //Initial number of revive items
    this.POKEBALLS = POKEBALLS || 10; //Initial number of POKEBALLS
  }

  // Getter for the name
  get getName() {
    return this.name;
  }

  // Getter for the pokemiltonCollection
  get getPokemiltonCollection() {
    return this.pokemiltonCollection;
  }

  // Getter for healingItems
  get getHealingItems() {
    return this.healingItems;
  }

  // Getter for reviveItems
  get getReviveItems() {
    return this.reviveItems;
  }

  // Getter for POKEBALLS
  get getPokeballs() {
    return this.POKEBALLS;
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  }

  // Implémenger la fonction pour renommer un pokemon de la collection.
  async renamePokemilton(askQuestion) {
    const nbrPoke = this.pokemiltonCollection.length;
    this.showCollection();
    let answer = await askQuestion("Quel Pokemilton voulez-vous renommer ? :");
    answer = parseInt(answer-1);
    if (answer >= 0 && answer < nbrPoke) {
      const oldName = this.pokemiltonCollection[answer].name;
      const answer2 = await askQuestion("Entrez son nouveau nom :");

      this.pokemiltonCollection[answer].name = answer2.trim();
      console.log(`\n${oldName} a été renommé ${answer2}!`);
    } else {
      console.log("\nPokemilton introuvable dans votre collection !");
    }
  }

  // Implémenter le soin.
  healPokemilton(pokemilton) {
    if (this.healingItems > 0) {
      pokemilton.healthPool = pokemilton.getRandomNumber(10, 30);
      this.healingItems -= 1;
      console.log(
        `\n${pokemilton.name} a été soigné ! Il reste : ${this.healingItems}`
      );
    } else {
      console.log("\nVous n'avez plus d'objet de soin!");
    }
  }

  // Implémenter le revive.
  revivePokemilton(pokemilton) {
    if (this.reviveItems > 0) {
      pokemilton.healthPool = Math.floor(
        pokemilton.getRandomNumber(10, 30) / 2
      );
      this.reviveItems -= 1;
      console.log(
        `\n${pokemilton.name} a été ressuscité ! Il reste : ${this.reviveItems}`
      );
    } else {
      console.log("\nVous n'avez plus cet objet !");
    }
  }

  // Relacher un pokemon.
  releasePokemilton(pokemilton) {
    const index = this.pokemiltonCollection.indexOf(pokemilton);
    if (this.pokemiltonCollection.length === 1) {
      console.log(
        "\nVous ne pouvez pas vous séparer de votre unique Pokemilton !\n"
      );
    } else if (index !== -1) {
      this.pokemiltonCollection.splice(index, 1);
      console.log(`\n${pokemilton.name} a été relaché de votre collection !\n`);
    } else {
      console.log("\nCe Pokemilton n'existe pas dans votre collection !\n");
    }
  }
  // Méthode 2 pour vérifier le statut du pokemilton.
  checkStatus(pokemilton) {
    // Vérification du statut du pokemilton, comme sa santé et son expérience.
    const status = {
      name: pokemilton.name,
      experienceMeter: pokemilton.experienceMeter,
      healthPool: pokemilton.healthPool,
    };
    // Affichage du statut dans la console.
    console.log(
      `${status.name}, ${status.experienceMeter}, ${status.healthPool}`
    );
  }
  checkMaster() {
    const checkin = {
      healingItems: this.healingItems,
      reviveItems: this.reviveItems,
    };
    console.log(
      `\nVotre état :\nIl vous reste : ${checkin.healingItems} potion(s) de soin, et ${checkin.reviveItems} potion(s) Revive.\n`
    );
  }
  // Montrer la collection
  showCollection() {
    if (this.pokemiltonCollection.length === 0) {
      console.log("\nVotre collection est vide !");
    } else {
      console.log("\nVotre collection de Pokemilton :");

      let i=0
      this.pokemiltonCollection.forEach((pokemilton) => {
        console.log(
          `${i+1} - ${pokemilton.name}, Niveau: ${pokemilton.level}, Expérience: ${pokemilton.experienceMeter}, Santé: ${pokemilton.healthPool}`
        );
      });
    }
  }
}
module.exports = PokemiltonMaster;
