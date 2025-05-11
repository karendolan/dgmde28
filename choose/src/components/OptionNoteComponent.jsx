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

  console.log("Option ", option);

  return (
      <label>{label}
        <textarea
          className={`Choose-notes-textarea ${existingNote ? 'noted' : ''}`}
          rows="9" type="textarea"
          onChange={((e) => {
            option.addNote(e.target.value);
            console.log("Option with note ", option);
            callback(e.target.value);
          })}
          value={existingNote}
        />
      </label>
  );
}