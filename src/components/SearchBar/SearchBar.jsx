import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value.trim();

    if (topic === "") {
      toast.error("Please enter a search term.", {
        duration: 1500,
      });

      return;
    }

    onSearch(topic);
    form.reset();
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="topic"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
