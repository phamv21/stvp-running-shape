export default function getStaticMap(url){
   return fetch(url).then(res => res.blob())
// return $.ajax({
//     url:url,
//     method: 'GET',
// })
};
