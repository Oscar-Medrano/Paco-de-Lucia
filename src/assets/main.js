const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCGZ_DExdB_EqjgcT3EmccNw&part=snippet%2Cid&order=date&maxResults=7';
const content = null || document.getElementById('contend')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5f0b0a10b0mshbfb06f968bf1fd5p1ba9ecjsnd2d6de095e99',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi,options);
    const data = response.json();
    return data;
}

//funcion anonima que se llama a si misma 
(async () =>{
//Dentro de try{} estará el llamado de la API y el template de html para interpretar 
//los datos a iterar por cada objeto, en este caso, cuando analizamos la salida de la API en rapidapi, hay una jerarquía de los datos,
// están los 9 “items” del 0 al 8 para la posición de cada vídeo, luego el “snippet” de cada item, luego “thumbnails” 
//y éste a su vez los tamaños de la imagen
// (nos interesa con la más alta resolución “high”), también nos interesa mostrar la descripción “description” y nombre “title” de cada vídeo:
    try{
        const videos = await fetchData(url);
        //template para iterar por cada uno de los videos el html con ``(comillas francesas)
        let view = `
            ${videos.items.map(video => 
            `<a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            </a>`).slice(0,9).join('')}
        `;
        content.innerHTML = view; //nos retorna la info en html.
    }
    catch{

}
})();