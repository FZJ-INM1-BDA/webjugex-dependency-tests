const { expect } = require('chai')
const request = require('request')

const PMAP_SERVICE_URL = process.env.PMAP_SERVICE_URL || 'http://pmap-pmap-service.apps-dev.hbp.eu'

const body = {
  "threshold": 0.2,
  "mode": false,
  "id": 1574076322244,
  "area1": {
    "name": "Area hOc1 (V1, 17, CalcS) - left hemisphere",
    "PMapURL": `${PMAP_SERVICE_URL}/multimerge_v2`,
    "body": {
      "areas": [
        {
          "name": "Area-hOc1",
          "hemisphere": "left"
        }
      ],
      "threshold": 0.2
    }
  },
  "area2": {
    "name": "Area hOc2 (V2, 18) - left hemisphere",
    "PMapURL": `${PMAP_SERVICE_URL}/multimerge_v2`,
    "body": {
      "areas": [
        {
          "name": "Area-hOc2",
          "hemisphere": "left"
        }
      ],
      "threshold": 0.2
    }
  },
  "simpleMode": true,
  "singleProbeMode": false,
  "ignoreCustomProbe": false,
  "nPermutations": 1000,
  "selectedGenes": [
    "MAOA",
    "TAC1"
  ]
}

const WEBJUGEX_URL = process.env.WEBJUGEX_URL || 'https://webjugex-backend-staging.apps.hbp.eu'

describe(`webjugex @ ${WEBJUGEX_URL}`, () => {

  console.log(`testing webjugex endpoint using pmap service url: ${PMAP_SERVICE_URL}`)
  
  it('GET / returns list of genes', done => {
    request({
      url: `${WEBJUGEX_URL}`,
      method: 'GET'
    }, (err, resp, body) => {
      expect(err).to.be.equal(null)
      expect(resp.statusCode).to.be.equal(200)
      done()
    })
  })

  it('POST /jugex_v2 does analysis ', done => {
    request({
      url: `${WEBJUGEX_URL}/jugex_v2`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }, (err, resp, body) => {
      expect(err).to.be.equal(null)
      expect(resp.statusCode).to.equal(200)
      done()
    })
  })
})