const http = metodo => (url, parametros) =>
      new Promise((aceptar, rechazar) => {
          const xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() {
              if (xmlHttp.readyState == 4)
                  if (xmlHttp.status == 200)
                      aceptar(xmlHttp.responseText);
                  else
                      rechazar(xmlHttp.statusText);
          };
          xmlHttp.open(metodo, url, true);
          xmlHttp.setRequestHeader("Content-Type", "application/json")
          xmlHttp.send(JSON.stringify(parametros));
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
