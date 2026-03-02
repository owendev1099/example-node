import http from 'k6/http'
import { check, sleep } from 'k6'

// simple healthcheck scenario hitting /health endpoint
export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 }
  ]
}

export default function () {
  const res = http.get('http://localhost:3000/health')
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body has status OKK': (r) => r.json().status === 'OK'
  })
  sleep(1)
}
