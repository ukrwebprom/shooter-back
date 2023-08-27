const {Schema, model} = require('mongoose');

const mapSchema = new Schema(  {
    name: {
      type: String,
      required: [true, 'Set name'],
    },
    ground: {
        type: [[Number]],
        default:[]
    }
  }, {versionKey:false});

mapSchema.post("save", (error, data, next) => {
    error.status = 400;
    next();
})

const Map = model("map", mapSchema);

module.exports = Map;