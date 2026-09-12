# WarmiClass PRONOEI 2026

Plataforma Web y Campus Virtual de Fortalecimiento Pedagógico Comunitario para las Promotoras Educativas Comunitarias (PEC) y Docentes Coordinadoras de los PRONOEI (Región Loreto). Impulsado por la **Universidad César Vallejo (UCV Virtual)** y la **Dirección Regional de Educación de Loreto (DRE Loreto)**.

---

## 🚀 Tecnologías

- **React 18** (Vite 5)
- **Tailwind CSS 3** con diseño responsivo, paleta cromática institucional y animaciones fluidas
- **Canvas Confetti** para celebraciones y retroalimentación interactiva
- **FontAwesome 6** y tipografías oficiales de Google Fonts (**Poppins** y **Roboto**)

---

## 📁 Estructura del Proyecto

```text
Demo_nueva/
├── public/                 # Recursos estáticos (imágenes, logos, expediente oficial)
├── src/
│   ├── assets/             # Assets adicionales
│   ├── components/         # Componentes modulares (Intro, Header, Footer, Auth, Dashboards, Modales)
│   ├── data/               # Información de módulos, cronogramas, presupuesto y galería
│   ├── pages/              # Vistas principales (Inicio, Objetivos, Módulos, Galería, Zoom, Expediente)
│   ├── App.jsx             # Enrutamiento de estado y orquestador principal
│   ├── main.jsx            # Punto de entrada React
│   └── index.css           # Directivas Tailwind y estilos de diseño
├── index.html              # Plantilla HTML con SEO y metadatos
├── vercel.json             # Configuración de despliegue para Vercel (SPA Rewrites)
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Tokens de diseño y fuentes
├── package.json            # Dependencias y scripts
└── .gitignore              # Archivos y carpetas excluidos de Git
```

---

## 💻 Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue en Vercel

Este proyecto está optimizado y listo para desplegar en [Vercel](https://vercel.com):

1. Sube este repositorio a tu cuenta de **GitHub**.
2. Entra en **Vercel** y haz clic en **"Add New Project"**.
3. Selecciona tu repositorio de GitHub.
4. Vercel detectará automáticamente **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Haz clic en **Deploy**. ¡Listo en segundos!
