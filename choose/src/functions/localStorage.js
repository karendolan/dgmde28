/**
 * Helper to retrieve content from local storage
 */
export function getLocalStorage(currTopic) {
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
export function saveLocalStorage(currTopic, context) {
  // JSON stringify the context
  console.log("Updating storage with ", context)
  const dataStr = JSON.stringify(context);
  localStorage.setItem(`SubtopicChoose-${currTopic}`, dataStr);
}

