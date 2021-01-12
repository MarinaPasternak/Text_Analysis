document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById("mainForm");
    let newWin = null;

    form.addEventListener('submit', function(event){
        newWin = window.open("statistic.html", "Statistic");
        event.preventDefault();
    });

})