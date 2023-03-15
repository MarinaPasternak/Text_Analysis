document.addEventListener('DOMContentLoaded', () => {
    let options = document.getElementById("words");
    let textInput = window.opener.document.querySelector(".text-input");
    let textOutput = document.querySelector(".text");
    let tabel = document.getElementById("statistic");
    let searchData = document.getElementById("search-value");
    let searchingBtn = document.getElementById("finding");

    function getWords() {
        let text = (textInput.value).trim();
        let punctuationless = text.replace(/[.,"\/#!$%\^&\*;:+{}=\-_`~()0-9\n]/g," ");
        let finalString = punctuationless.replace(/ +/g, ' ').trim();
        let words =  finalString .split(" ");
        return words;
    }

    function howMuchTimesWordAppears(textArray) {
        const wordCounts = new Map()
        textArray.forEach(word => {
            const currentWordCount = wordCounts.get(word.toLowerCase()) || 0
            wordCounts.set(word.toLowerCase(), currentWordCount+1)
          })
          
          return  wordCounts
    }
    
    let lastResFind=""; 
    let copy_page = textInput.value; 
    
    function findOnPage() {
        let textToFind = searchData.value;
        
        if (textToFind == "") {
            alert("Вы ничего не ввели");
            return;
        }
        
        if (textOutput.innerHTML.indexOf(textToFind) == "-1")
        alert("Ничего не найдено, проверьте правильность ввода!");
        
        if (copy_page.length > 0) textOutput.innerHTML = copy_page;
        else copy_page=textOutput.innerHTML;

        textOutput.innerHTML = textOutput.innerHTML.replace(eval("/name="+lastResFind+"/gi")," ");
        textOutput.innerHTML = textOutput.innerHTML.replace(eval("/"+textToFind+"/gi"),"<span name="+textToFind+" style='background:yellow'>"+textToFind+"</span>");
        lastResFind = textToFind;
    }

    let arrayWords = getWords();
    let statistic = howMuchTimesWordAppears(arrayWords);

    const resultWords = [...statistic.keys()]
    const resultCount = [...statistic.values()]

    textOutput.innerHTML = textInput.value;

    for (let i = 0; i < resultWords.length; i++) {
        let option = document.createElement("option");
        let tr = document.createElement("tr");
        let tdWord = document.createElement("td");
        let tdCout = document.createElement("td");

        tdWord.innerHTML = resultWords[i];
        tdCout.innerHTML =  resultCount[i];
        tr.appendChild(tdWord);
        tr.appendChild(tdCout);
        tabel.appendChild(tr);

        option.innerHTML = resultWords[i];
        options.appendChild(option);
    }

    searchingBtn.addEventListener("click", findOnPage) 
})
