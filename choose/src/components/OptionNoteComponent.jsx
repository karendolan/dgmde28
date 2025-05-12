/**
 * The Choice Item Card
 * @param {item: Option} props
 * @returns the jsx of the choice item
 */
export default function OptionNoteComponent(props) {
  const {
    existingNote,
    option,
    callback,
    label,
  } = props;

  return (
      <label className="center">
        {label}
        <textarea
          className={`Choose-notes-textarea ${existingNote ? 'noted' : ''}`}
          rows="9" type="textarea"
          onChange={((e) => {
            option.addNote(e.target.value);
            callback(e.target.value);
          })}
          value={existingNote}
        />
      </label>
  );
}