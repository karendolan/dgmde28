/**
 * The Option class holds each subtopic option
 * The user can order this subtopic and add a note about it
 */
export default class OptionObject {
  // Constructor contains the 2 main components of the option
  constructor({id, topic, subtopic, attribute, origin, description, life_span, wikipedia_url, image}) {
    console.log('setting id to ', id);
    this.id = id;
    this.topic = topic;
    this.subtopic = subtopic;
    this.description = description;
    this.image = image;
    this.attribute = attribute;
    this.origin = origin
    this.life_span = life_span;
    this.wikipedia_url = wikipedia_url;
  }
  // User adds  comment about this option
  addNote(note) {
    console.log('Updating note to ', note);
    this.note = note;
  }
  // Set preferred ordering scale 1-5
  setOrder(order){
    console.log('Updating order to ', order);
    this.order = order;
  }
}