const emojiIcon = document.querySelector('.emoji-icon');
const stickerIcon = document.querySelector('.sticker-icon');
const gifIcon = document.querySelector('.gif-icon');

const stickersContainer = document.querySelector('.stickers-container');
const allEmojis = document.querySelector('.all-emojis');
const searchEmojis = document.querySelector('.search-emojis');
const emojiSearchInp = document.querySelector('#emoji-search-inp');

const emojiApiKey = process.env.EMOJI_API_KEY;

function getData(callUrl){

    const options = {
        method: 'GET',
        url: callUrl,
    };

    const response = new Promise(function(resolve,reject){
        const data = axios.request(options); 
        if(Object.keys(data)===0){
            const err = new Error("Error!");
            reject(err);
        }
        else{
            resolve(data);
        }
    }) ;

    return response;
}

const response = getData('https://emoji-api.com/emojis?access_key=' + emojiApiKey);
// console.log(response);

function getStickers(isSearch,response){
    console.log(response);
    response
    .then((response)=>{
        if(isSearch){
            while(searchEmojis.firstChild){
                searchEmojis.removeChild(searchEmojis.firstChild);
            }
        }
        for(let i=0;i<response.data.length;i++){
            const newEmoji = document.createElement('span');
            newEmoji.classList.add('single-emoji');
            newEmoji.textContent=response.data[i].character;
            newEmoji.style.display = "inline-block";
            newEmoji.style.width = "20px";
            if(!isSearch){
                allEmojis.appendChild(newEmoji)
            }
            else{
                searchEmojis.style.display = 'block';
                searchEmojis.appendChild(newEmoji) ;
            }
        }
        stickersContainer.style.display = "block";
    })
    .catch((err)=>{
        console.log(err);
    });
}

emojiIcon.addEventListener('click',()=>{
    getStickers(false,response);
});

emojiSearchInp.addEventListener('input',()=>{
    const searchKey = emojiSearchInp.value;
    const searchResponse = getData('https://emoji-api.com/emojis?search=' + searchKey + '&access_key=' + emojiApiKey);
    console.log(searchResponse);
    getStickers(true,searchResponse);
})
