const http = metodo => (url, parametros) =>
      new Promise((aceptar, rechazar) => {
          const xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() {
              if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                  aceptar(xmlHttp.responseText);
          };
          xmlHttp.open(metodo, url, true);
          xmlHttp.send(parametros);
      });

const httpGet = http("GET");

const httpPost = http("POST");

const httpPut = http("PUT");

const httpDelete = http("DELETE");

export {
    http,
    httpGet,
    httpPost,
    httpPut,
    httpDelete
};
