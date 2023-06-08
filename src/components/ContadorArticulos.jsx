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

    fetch("https://dev.auakan.com/api/index.php/v1/content/articles", requestOptions)
      .then(response => response.json())
      .then(result => {
        const articleIds = result.map(article => article.id); // Obtener los IDs de los artículos
        const totalArticles = articleIds.length; // Obtener el total de IDs
        setTotalArticles(totalArticles); // Almacenar el valor en el estado
        guardarJSON(result); // Guardar los datos en un archivo JSON local
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  function guardarJSON(data) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'articles.json';
    link.click();
  }

  return (
    <div>
      Justo ahora {totalArticles} productos son visibles en Auakan
    </div>
  );
}

export default ContadorArticulos;
