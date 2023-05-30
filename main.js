// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}




//generate event listener
generateEl.addEventListener('click',()=>{
    const length = lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;



    resultEl.innerText=generatePassword(hasLower, hasSymbol, hasNumber, hasUpper, length);
    //console.log(hasLower, hasSymbol, hasNumber, hasUpper);
})

//copy password to clipboard
clipboardEl.addEventListener('click',()=>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if(!password)
       return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
})

//generate password function
function generatePassword(lower,upper,number,symbol,length){

    //1.initialize password variable
    //2. filter out unchecked types
    //3. loop over length , call generator function
    //4. add final password to pw var and return

    let generatedPassword='';

    const typesCount = lower+upper+number+symbol;
    //console.log('typescount: ',typesCount);
    const typesArr = [{lower},{upper},{number},{symbol}].filter(
        item=>Object.values(item)[0]
        );
    //console.log('typesArr: ', typesArr);
    if(typesCount === 0){

        return '';
    }

    for(let i=0;i<length;i+=typesCount)
    {
      typesArr.forEach(type=>{
        const funcName = Object.keys(type)[0];

       // console.log('funcName: ',funcName);

        generatedPassword += randomFunc[funcName]();
      })
    }


   const finalPassword =  generatedPassword.slice(0,length);
   return finalPassword;
}



//generate functions

function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random()*26)+97);
}


function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}


function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
  }


  function getRandomSymbol(){
    const symbols='!@#$%^&*()[]=<>/,.';
    return symbols[Math.floor(Math.random()*symbols.length)];
  }

//console.log(getRandomSymbol())
