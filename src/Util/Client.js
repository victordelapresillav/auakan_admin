const API = 'https://auakanapi.000webhostapp.com/api.php?request=getAnuncios';
export function fetchData() {
    return fetch(API).then(result => result.json());

}