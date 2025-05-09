import Nav from './Nav';

/**
 * The Header that includes the nav bar
 * @param {title: String} props
 * @returns
 */
export default function Header(props) {
  // Receive title of the page as a prop, with fun fallback
  const {
    title = "Good Day!",
  } = props;

  return (
    <div className='header'>
      <div className='title'>Subtopic Choice</div>
      <h1 className='page-title'>{title}</h1>
      <Nav
        curPage={title}
      />
    </div>
  )
}