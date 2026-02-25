const request = require('supertest')
const app = require('../app')
const { calculateValue } = require('../lib/logic')

describe('Suite de Pruebas de Calidad de Software', () => {
  describe('Pruebas Unitarias - Lógica de Inventario', () => {
    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5)
      expect(result).toBe(50)
    })

    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5)
      expect(result).toBe(0)
    })

    test('Debe calcular correctamente con valores decimales (10.5 * 2.5 = 26.25)', () => {
      const result = calculateValue(10.5, 2.5)
      expect(result).toBe(26.25)
    })

    test('Debe retornar 0 cuando uno de los valores es cero', () => {
      const result = calculateValue(0, 100)
      expect(result).toBe(0)
      const resultOther = calculateValue(50, 0)
      expect(resultOther).toBe(0)
    })
  })

  describe('Pruebas de Integración - API Endpoints', () => {
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', 'OK')
    })

    test('GET /items - Debe validar la estructura del inventario', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      // Validamos que el primer objeto tenga las propiedades requeridas
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('stock')
    })

    test('GET /health - Debe retornar uptime como número positivo', async () => {
      const response = await request(app).get('/health')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('uptime')
      expect(typeof response.body.uptime).toBe('number')
      expect(response.body.uptime).toBeGreaterThan(0)
    })

    test('GET /items - Debe retornar exactamente 2 items con información correcta', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(2)
      expect(response.body[0]).toEqual({ id: 1, name: 'Laptop', stock: 10 })
      expect(response.body[1]).toEqual({ id: 2, name: 'Mouse', stock: 50 })
    })
  })
})
