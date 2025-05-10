/**
 * The Choice Item Card
 * @param {title: String} props
 * @returns the jsx of the choice item
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