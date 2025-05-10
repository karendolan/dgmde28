// Import the style
import './ChoiceItem.css';


/**
 * The Choice Item Card
 * @param {item: Option} props
 * @returns the jsx of the choice item
 */
export default function ChoiceItem(props) {
  // Destruct the item
  const {
    subtopic,
    attribute,
    origin,
    description,
    life_span,
    wikipedeia_url,
    image,
  } = props;
  // Return the item JSX
  return (
    <div className='ChoiceItem-container'>
      <div className='ChoiceItem-image-block'>
        <img height={100} src={image.url}/>
        <div>{subtopic}</div>
        <div>{origin}</div>
        <div>Lives {life_span} yrs</div>
      </div>
      <div className='ChoiceItem-desc-block'>
        <div>{attribute}</div>
        <div>{description}</div>
      </div>
      <a href={wikipedeia_url}>wikipedeia reference</a>
    </div>
  )
}