import React, { useEffect, useState } from 'react';

export function ContadorArticulos() {
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    contarArticulos();
  }, []);

  function contarArticulos() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer c2hhMjU2Ojk1NjpjYTM2NzZlMTQ0YWM0MTE0Y2MzMWZlZGJjMzg0YmVlZDA2YTdjZjYwOTc0YzNhMWMzY2ZiNTI2MWVlODBlYTM3");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://dev.auakan.com/api/index.php/v1/content/articles", requestOptions)
      .then(response => response.json())
      .then(result => {
        const totalArticles = result.length;
        setTotalArticles(totalArticles); // Almacenar el valor en el estado
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      justo ahora {totalArticles} Productos son visibles
    </div>
  );
}

export default ContadorArticulos;
