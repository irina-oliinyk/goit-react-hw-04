import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";
export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <Oval height={40} width={40} color="#4fa94d" ariaLabel="loading" />
    </div>
  );
}
