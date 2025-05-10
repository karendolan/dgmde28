/**
 * The Option class holds each subtopic option
 * The user can order this subtopic and add a note about it
 */
class Option {
  // Constructor contains the 2 main components of the option
  constructor(topic, subtopic, attribute, origin, description, life_span, wikipedeia_url, image) {
    this.topic = topic;
    this.subtopic = subtopic;
    this.description = description;
    this.image = image;
    this.attribute = attribute;
    this.origin = origin
    this.life_span = life_span;
    this.wikipedeia_url = wikipedeia_url;
  }
  // User adds  comment about this option
  addNote(note) {
    this.note = note;
  }
  // Set preferred ordering scale 1-5
  setOrder(order){
    this.order = order;
  }
}