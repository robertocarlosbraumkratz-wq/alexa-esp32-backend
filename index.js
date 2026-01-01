const express = require("express");
const app = express();
app.use(express.json());

let devices = {};

app.post("/alexa", (req, res) => {
  const directive = req.body.directive;

  // DISCOVERY
  if (directive.header.namespace === "Alexa.Discovery") {
    return res.json({
      event: {
        header: {
          namespace: "Alexa.Discovery",
          name: "Discover.Response",
          payloadVersion: "3",
          messageId: "1"
        },
        payload: {
          endpoints: [
            { endpointId: "filtro_direito", friendlyName: "Filtro direito" },
            { endpointId: "filtro_esquerdo", friendlyName: "Filtro esquerdo" },
            { endpointId: "filtro_interno", friendlyName: "Filtro interno" },
            { endpointId: "iluminacao_dia", friendlyName: "Iluminação Dia" },
            { endpointId: "iluminacao_noite", friendlyName: "Iluminação Noite" },
            { endpointId: "iluminacao_amarela", friendlyName: "Iluminação amarela" },
            { endpointId: "iluminacao_led", friendlyName: "Iluminacao led" },
            { endpointId: "aquecedor", friendlyName: "Aquecedor" },
            { endpointId: "oxigenador", friendlyName: "Oxigenador" },
            { endpointId: "alimentador", friendlyName: "Alimentador" },
            { endpointId: "fonte12v", friendlyName: "Fonte 12 v" },
            { endpointId: "filtro_externo", friendlyName: "Filtro externo" },
            { endpointId: "filtro_uv4", friendlyName: "Filtro uv 4" }
          ]
        }
      }
    });
  }

  // ON / OFF
  const endpointId = directive.endpoint.endpointId;
  const action = directive.header.name === "TurnOn" ? "ON" : "OFF";

  devices[endpointId] = action;

  res.json({
    event: {
      header: {
        namespace: "Alexa",
        name: "Response",
        payloadVersion: "3",
        messageId: "1"
      },
      endpoint: directive.endpoint,
      payload: {}
    }
  });
});

app.get("/status", (req, res) => {
  res.json(devices);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend Alexa online"));
