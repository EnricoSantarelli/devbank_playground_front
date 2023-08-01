import { useContext, useState } from "react";
import logo from "../../assets/logo_devbank.png";
import styles from "./home.module.scss";
import { GlobalContext } from "../../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { apiEndpoint, setApiEndpoint, datasource, account, setAccount } = useContext(GlobalContext);
  const [inputValid, setInputValid] = useState(true);

  function handleChange(event) {
    let inputValue = event.target.value;
    if (inputValue[inputValue.length - 1] === "/") {
      inputValue = inputValue.substring(0, inputValue.length - 1);
    }
    setApiEndpoint(inputValue);
    localStorage.setItem("apiEndpoint", inputValue);
    setInputValid(true);
  }

  const handleLinkClick = (event) => {
    if (
      !localStorage.getItem("apiEndpoint") ||
      !localStorage.getItem("apiEndpoint").includes(".")
    ) {
      event.preventDefault();
      setInputValid(false);
    } else {
      datasource.getAccount().then((response) => {
        console.log(response);
        setAccount(response);
      });
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.home_div}>
        <img src={logo} alt="Logo DevBank" className={styles.home_logo} />
        <div className={styles.home_form}>
          <input
            placeholder="Coloque aqui o endpoint da sua API"
            className={styles.home_input}
            value={apiEndpoint}
            onChange={handleChange}
          />
          {inputValid ? (
            ""
          ) : (
            <label className={styles.home_label}>Endpoint inválido</label>
          )}
        </div>

        <Link
          to={"/options"}
          onClick={handleLinkClick}
          className={styles.home_button}
        >
          <p className={styles.home_button__title}>Entrar</p>
        </Link>
      </div>
    </div>
  );
}
