import Input from "@/app/components/Input";
import styles from "./page.module.css";
const TagList = ({
  tags,
  tag,
  handleTagClick,
  tagInput,
  setTagInput,
  saveTags,
  newTag,
  setNewTag,
}) => {
  return (
    <div className={styles["tag-container"]}>
      {tags.map((_tag, index) => (
        <button
          key={index}
          onClick={() => handleTagClick(_tag)}
          className={styles["tag"]}
          style={{
            backgroundColor: _tag === tag ? "var(--primary)" : "#fff",
            color: _tag === tag ? "var(--text-light)" : "#000",
          }}
        >
          {_tag}
        </button>
      ))}
      {tagInput && (
        <>
          <Input
            type="text"
            value={newTag}
            name="tagInput"
            placeholder="Enter tag"
            required={true}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button className="button-primary" onClick={saveTags}>
            Save tag
          </button>
        </>
      )}
      {!tagInput && (
        <button className="button-primary" onClick={() => setTagInput(true)}>
          Add tag
        </button>
      )}
    </div>
  );
};

export default TagList;
