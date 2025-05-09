import { createContext } from 'react'

/**
 * The Global context consists of
 * and object of the following shape
 * {
 *  choiceOptions: String[]
 *  topicOptions: String[]
 *  currTopic: String
 * }
 */
const ChooseContext = createContext();
export default ChooseContext;

