export default function getStaticMap(url){
   return fetch(url).then(res => {
      if(res.ok){
         return res.blob()   
      }else{
         return 'error'
      }
      
   })
// return $.ajax({
//     url:url,
//     method: 'GET',
// })
};
