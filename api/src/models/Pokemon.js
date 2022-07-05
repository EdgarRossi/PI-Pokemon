const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type:DataTypes.UUID,//genera un id unico(combinando letras y numeros)no se va a repetir
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,//no puede ser falso, si o si requerido.
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createInDb: {//todos los que yo cree se vana a setear en true y solamente ellos, los de mi db local
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },
  {
    timestamps:false
  }
  );
};
