// Import the style
import './ChoiceComponent.css';

/**
 * The Choice Item Card
 * @param {item: Option} props
 * @returns the jsx of the choice item
 */
export default function ChoiceComponent(props) {
  // Destruct the item
  const {
    subtopic,
    attribute,
    origin,
    description,
    life_span,
    wikipedia_url,
    image,
  } = props;
  // Return the item JSX
  return (
    <div className='ChoiceComponent-container'>
      <div className='ChoiceComponent-image-block'>
        <img className='ChoiceComponent-image' height={100} src={image.url}/>
        <div>{subtopic}</div>
        <div>{origin}</div>
        <div>Lives {life_span} yrs</div>
      </div>
      <div className='ChoiceComponent-desc-block'>
        <div>{description}</div>
        <div>* {attribute}</div>
        {wikipedia_url && (
          <a className='ChoiceComponent-wikipedia' target='_blank' href={wikipedia_url}>wikipedia</a>
        )}
      </div>
    </div>
  )
}