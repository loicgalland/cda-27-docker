const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

let sequelize

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.DB_PORT,
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
  
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({ force: true, alter: true }).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
      .then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
    .then(hash => User.create({ username: 'pikachu', password: hash }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = { 
  initDb, Pokemon, User
}