const API = "http://localhost:8080/imobiliaria";

function salvarImobiliaria() {
  let nome = document.getElementById("nome").value;
  let site = document.getElementById("site").value;
  let creci = document.getElementById("creci").value;
  let rua = document.getElementById("rua").value;
  let bairro = document.getElementById("bairro").value;
  let numero = (document.getElementById("numero").value);
  let cidade = (document.getElementById("cidade").value);
  let estado = (document.getElementById("estado").value);


  const dataInfo = {
    nome: nome,
    site: site,
    creci: creci,
    endereco: rua,
    bairro: bairro,
    numero: numero,
    cidade: cidade,
    estado: estado
  };

  $.ajax({
    url: API,
    type: "post", // http method
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(dataInfo), // data to submit
    success: function (data, status, xhr) {
      alert("status: " + status + ", data: " + data);
    },
    error: function (jqXhr, textStatus, errorMessage) {
      alert("Error" + errorMessage);
    },
  });
}

async function buscarTodasImobiliarias() {
  try {
    let payload = await fetch(API);
    return payload.json();
  } catch {
    return console.log("Errinho");
  }
}

async function gerarListaImobiliarias() {
  let lista = await buscarTodasImobiliarias();
  let dados = "";
  for(imobiliaria of lista) {
    dados +=
    `
    <tr class="p-2 mb-1">
    <td class="p-2">${imobiliaria.nome}</td>
    <td class="p-2">${imobiliaria.endereco}</td>
    <td class="p-2">${imobiliaria.numero}</td>
    <td class="p-2">${imobiliaria.bairro}</td>
    <td class="p-2">${imobiliaria.cidade}</td>
    <td class="p-2">${imobiliaria.estado}</td>
    <td class="p-2">${imobiliaria.creci}</td>
    </tr>
    `
  }
  document.getElementById("tableContent").innerHTML = dados;
}

function resetaForm() {
  let rua = (document.getElementById("rua").value = "");
  let bairro = (document.getElementById("bairro").value = "");
  let numero = (document.getElementById("numero").value = "");
  let cidade = (gocument.getElementById("cidade").value = "");
  let estado = (document.getElementById("estado").value = "");
}
