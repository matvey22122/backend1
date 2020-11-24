import {Schema, model} from 'mongoose'

const schema = new Schema({
  url: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  uuid: {
    type: String,
    required: true
  }
})

export default model('Url', schema)
