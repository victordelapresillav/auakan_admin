import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../Util/Client";
import styles from "./PublishDetails.module.css";
import BotonPublicar from "../components/BotonPublicar";

export function PublishDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    fetchData()
      .then((result) => {
        const filteredData = result.filter((item) => item.id === id);
        const updatedData = filteredData.map((item) => ({
          ...item,
          publicado: localStorage.getItem(`publicado_${item.id}`) === "true",
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handlePublicar = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        localStorage.setItem(`publicado_${itemId}`, "true");
        return {
          ...item,
          publicado: true,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleRetirar = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        localStorage.setItem(`publicado_${itemId}`, "false");
        return {
          ...item,
          publicado: false,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const closeModal = () => {
    setSelectedImageUrl(null);
  };

  return (
    <div className={styles.DetailsContainer}>
      {data.map((item) => {
        let imageUrls = item.fotografia_prod;
        let error="";
        if(imageUrls.length === 1 ){
          imageUrls = `["https://liftlearning.com/wp-content/uploads/2020/09/default-image.png"]`
          error = "No hay fotografías proporcionadas por el vendedor"
        }
        if (typeof imageUrls === "string") {
          imageUrls = JSON.parse(imageUrls);
        }

        return (
          <div key={item.id} className={styles.cardContainer}>
            {imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                className={styles.publicimage}
                src={imageUrl}
                alt={item.nombre}
                style={{ width: '300px', height: '200px', cursor: 'pointer' }}
                onClick={() => openModal(imageUrl)}
              />
            ))}
            <p style={{ textAlign: 'center' }}>{error}</p>
            <div className={styles.pubdet}>
              <p className={styles.firstItem}>
                <strong>Producto: </strong>
                {item.nombre_prod}
              </p>
              <p>
                <strong>Detalles del producto: </strong>
                {item.detalles_prod}
              </p>
              <p>
                <strong>Nombre del vendedor: </strong>
                {item.nombre}
              </p>
            </div>
            <div>
              <BotonPublicar
                tarjetaId={item.id}
                publicado={item.publicado}
                onPublicar={handlePublicar}
                onRetirar={handleRetirar}
              />
            </div>
            {selectedImageUrl && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <img
                    className={styles.modalImage}
                    src={selectedImageUrl}
                    alt={item.nombre}
                  />
                  <button className={styles.closeButton} onClick={closeModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}