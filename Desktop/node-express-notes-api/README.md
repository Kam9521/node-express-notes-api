# 🔐 API Notatek — Express.js

To jest prosty backendowy projekt REST API napisany w Node.js z użyciem frameworka **Express.js**.

### 📌 Funkcje:
- `GET /notes` — pobiera wszystkie notatki
- `POST /notes` — dodaje nową notatkę (w formacie JSON)
- `PUT /notes/:id` — edytuje istniejącą notatkę na podstawie ID
- `DELETE /notes/:id` — usuwa notatkę po ID

### 💾 Przykładowa notatka:
```json
{
  "id": 1,
  "title": "Pierwsza notatka",
  "content": "Uczę się Express.js!"
}
