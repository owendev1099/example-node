# fast-api-dev

Este proyecto es una API sencilla basada en Express que expone un endpoint de salud (`/health`).

## Pipeline de pruebas de carga con k6

Se ha añadido un script de carga (`script.js`) que hace peticiones al endpoint de salud. El pipeline se ejecuta automáticamente mediante GitHub Actions cada vez que se realiza un push a la rama `master`.

### Archivos relevantes

- `script.js` – script de k6 con un escenario básico de ramp-up y checks.
- `.github/workflows/k6-performance.yml` – workflow de GitHub Actions que lanza la prueba en **k6 Cloud** usando el action oficial.

### Pre‑requisitos para ejecución local

1. Instalar [k6](https://k6.io/docs/getting-started/installation) en la máquina.
2. Levantar la API (`npm start` o `node ./bin/www`).
3. Ejecutar `npm run k6` para correr la prueba localmente.

### Variables de entorno / secretos

- `K6_API` – token de acceso para ejecutar pruebas en k6 Cloud. Debe configurarse como secret del repositorio en GitHub.

### Visualización de resultados

Las ejecuciones en k6 Cloud envían métricas automáticamente a Grafana, donde se pueden visualizar dashboards preconstruidos.

---

¡Listo! Con estos cambios el proyecto ya está equipado con un pipeline automatizado de pruebas de carga y la integración con GitHub Actions y Grafana.