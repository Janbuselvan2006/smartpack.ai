# PackSmart AI

Frontend prototype for an AI-powered food packaging recommendation flow.

Recommendations are generated from a local sample dataset and simple rules. They are **not scientifically validated**.

## Run

```bash
npm install
npm run dev
```

## Later: FastAPI

Swap `src/api/recommend.js` for HTTP calls to a Python backend. Context and form pages already keep food/storage input in one draft object.
