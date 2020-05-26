// показать и скрыть подробности
let infoLabel = document.getElementById("info_label");
let expand = false;

// показать и скрыть подробности
function verocultar(){
  display = document.getElementById('infoid').style.display;
    if (expand)
    {
      expand = false;
      infoLabel.innerHTML = "Показать подробности";
      document.getElementById('infoid').style.display='none';
    }
    else{
      expand = true;
      infoLabel.innerHTML = "Скрыть подробности";
      document.getElementById('infoid').style.display='grid';
    }
  }
