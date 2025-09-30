Try running the frontend (Windows PowerShell):

```powershell
cd frontend; npm install; npm run dev
```

If your backend uses a different port, run:

```powershell
$env:API_BASE = 'http://localhost:3000'; cd frontend; npm run dev
```
