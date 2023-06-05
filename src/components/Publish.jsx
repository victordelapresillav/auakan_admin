import { useEffect, useState } from "react";
import styles from "./Publish.module.css"
import { Publishcard } from "./Publishcard";
//import publics from "./publi.json";
//import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchData } from "../Util/Client";

export function Publish() {
    const [publics, setPublics] = useState([]);
  
    useEffect(() => {
      fetchData().then((data) => {
        setPublics(data);
      });
    }, []);
  
    return (
      <ul className={styles.publishgrid}>
        {publics.map((publica) => (
          <Publishcard key={publica.id} publica={publica} />
        ))}
      </ul>
    );
  }
  export default Publish;