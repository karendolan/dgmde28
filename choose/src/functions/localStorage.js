/**
 * Helper to retrieve content from local storage
 */
export function getLocalStorageContext(currTopic) {
  // Retrieve data from local storage
  const data = localStorage.getItem(`SubtopicChoose-${currTopic}`);
  if (data) {
    console.log('Have data ', data);
  }
  // parse and return data
  return JSON.parse(data);
}

/**
 * Helper to save content to local storage
 */
export function saveLocalStorageContext(currTopic, context) {
  // JSON stringify the context
  console.log("Updating storage with ", context)
  const dataStr = JSON.stringify(context);
  localStorage.setItem(`SubtopicChoose-${currTopic}`, dataStr);
}

/**
 * Helper to retrieve content from local storage
 */
export function getLocalStorageTopic() {
  // Retrieve data from local storage
  const topic = localStorage.getItem('SubtopicChoose-topic');
  if (topic) {
    console.log('Have data ', topic);
  }
  // return topic
  return topic;
}

/**
 * Helper to save content to local storage
 */
export function saveLocalStorageTopic(currTopic) {
  // JSON stringify the context
  console.log("Updating topic with ", currTopic)
  localStorage.setItem('SubtopicChoose-topic', currTopic);
}
