# ✍️ Sistema de Firma Digital para Tutores Empresariales
### Coformación Empresarial — Uniempresarial · FUSoft

[![Estado](https://img.shields.io/badge/Estado-En%20Producción-brightgreen)](https://juanmask327.github.io/Firma-tutores/)
[![Versión](https://img.shields.io/badge/Versión-1.0%20Preliminar-blue)](https://github.com/juanmask327/Firma-tutores)
[![Licencia](https://img.shields.io/badge/Costo%20de%20licencias-%240-success)](https://github.com/juanmask327/Firma-tutores)
[![Live Demo](https://img.shields.io/badge/Demo-Live-ff69b4)](https://juanmask327.github.io/Firma-tutores/)

---

## 🎯 ¿Qué problema resuelve?

En el modelo de coformación empresarial de Uniempresarial, cada estudiante gestiona **5 actas oficiales** que requieren la firma del tutor, el estudiante y el profesor acompañante. El proceso era completamente manual:

| Antes | Después |
|-------|---------|
| Crear 5 documentos individualmente | Generación automática desde un formulario |
| Diligenciar datos repetitivos en cada uno | Datos prellenados automáticamente |
| Enviar por correo y esperar disponibilidad | Notificación inmediata con links directos |
| Coordinar firma presencial o escaneada | Firma digital desde cualquier dispositivo |
| **2 a 5 días hábiles** para obtener la firma | **Menos de 2 minutos** para el tutor |

> **Versión preliminar:** este sistema automatiza exclusivamente la firma del tutor empresarial. Las firmas del estudiante y del profesor están previstas en la versión 2.0.

---

## 🚀 Demo en vivo

👉 **[Abrir página de firma del tutor](https://juanmask327.github.io/Firma-tutores/)**

El sistema está en producción real. La página es la misma que utilizan los tutores de FUSoft.

---

## 🏗️ Arquitectura del sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLUJO COMPLETO                           │
└─────────────────────────────────────────────────────────────────┘

  [Estudiante]
      │
      │  Llena el formulario con datos del estudiante,
      │  empresa, tutor y profesor
      ▼
  ┌──────────────┐
  │ Google Form  │
  └──────┬───────┘
         │  Nueva fila en Google Sheets de respuestas
         ▼
  ┌──────────────┐
  │     Make     │  Watch New Rows → HTTP GET al Apps Script
  └──────┬───────┘
         │  Llama con los 10 parámetros del formulario
         ▼
  ┌──────────────────────────────────────────────────────────┐
  │                    Google Apps Script                    │
  │                                                          │
  │  doGet() — responde en < 2 segundos                     │
  │  ├── Genera código ACT-YYYY-NNN                         │
  │  ├── Guarda datos en PropertiesService                  │
  │  └── Crea trigger de 2 segundos → OK a Make            │
  │                                                          │
  │  procesarEnSegundoPlano() — trabajo pesado              │
  │  ├── Crea carpeta en Drive por estudiante               │
  │  ├── Copia 3 plantillas → genera 5 documentos          │
  │  ├── Reemplaza 14 placeholders en cada documento       │
  │  ├── setSharing(ANYONE_WITH_LINK) en cada archivo      │
  │  ├── Registra en "Registro de Actas" (Google Sheets)   │
  │  ├── Envía correo al estudiante (5 links + código)     │
  │  └── Envía correo al tutor (código + link de firma)    │
  └──────────────────────────────────────────────────────────┘
         │
         │  [Tutor recibe correo con código ACT-YYYY-NNN]
         ▼
  ┌──────────────────────────────────────────────────────────┐
  │              GitHub Pages — Página de firma             │
  │                                                          │
  │  1. Ingresa código ACT-YYYY-NNN                        │
  │  2. Selecciona documentos a firmar (checkboxes)        │
  │  3. Dibuja firma (canvas táctil / mouse)               │
  │  4. Firma comprimida → JPEG 300×80px (~5KB)            │
  │  5. Envío vía GET con mode: no-cors                    │
  │  6. Firma guardada en localStorage para reutilización  │
  └──────────────────────────────────────────────────────────┘
         │
         │  GET ?action=firmarTutor&codigoActa=...&firmaBase64=...
         ▼
  ┌──────────────────────────────────────────────────────────┐
  │                    Google Apps Script                    │
  │                                                          │
  │  doGet(action=firmarTutor)                              │
  │  ├── Busca código en Registro de Actas                 │
  │  ├── Obtiene IDs de los 5 documentos                   │
  │  ├── Decodifica firma base64 → blob JPEG               │
  │  └── insertImage() en celda correcta de cada Sheets    │
  │       ├── Acta de Inicio      → F34                    │
  │       ├── Acta de Seguimiento → F34                    │
  │       ├── Acta de Cierre      → F34                    │
  │       ├── Plan de Actividades → E73                    │
  │       └── Evaluación del Tutor → B26                   │
  └──────────────────────────────────────────────────────────┘
         │
         ▼
  [Firma del tutor insertada en los 5 documentos ✅]
```

---

## 🛠️ Stack tecnológico

| Tecnología | Uso | Costo |
|------------|-----|-------|
| **Google Apps Script** | Backend principal, generación de docs, firma | Gratis |
| **Make (Integromat)** | Orquestación del flujo, trigger del formulario | Gratis |
| **Google Forms + Sheets** | Punto de entrada y registro de respuestas | Gratis |
| **Google Drive** | Almacenamiento de documentos y plantillas | Gratis |
| **Gmail** | Envío de correos HTML personalizados | Gratis |
| **GitHub Pages** | Hosting de la página de firma | Gratis |
| **HTML / CSS / JS** | Interfaz de firma (canvas, localStorage) | Gratis |

**Costo total de licencias: $0**

---

## 📁 Estructura del repositorio

```
Firma-tutores/
│
├── index.html                      # Página de firma del tutor (GitHub Pages)
│   ├── Canvas de firma táctil y mouse
│   ├── Selección de documentos por checkbox
│   ├── Validación de código ACT-YYYY-NNN
│   ├── Compresión de imagen (JPEG 300×80px)
│   └── Caché de firma en localStorage
│
├── AppsScript_CoformacionTutor.js  # Código del Apps Script
│   ├── doGet()                     # Setup desde Make + Firma desde GitHub Pages
│   ├── procesarEnSegundoPlano()    # Creación de documentos y correos
│   ├── firmarTutor()               # Inserción de firma en documentos
│   ├── crearDocumentos()           # Copia y llenado de plantillas
│   ├── reemplazarPlaceholders()    # Sustitución de 14 placeholders
│   ├── enviarCorreoEstudiante()    # Correo HTML con 5 links
│   ├── enviarCorreoTutor()         # Correo HTML con código y link de firma
│   └── testSetup()                 # Función de prueba y autorización
│
└── README.md                       # Este archivo
```

---

## ⚙️ Configuración del Apps Script

En el objeto `CONFIG` al inicio del archivo `.js`, configura tus propios IDs:

```javascript
const CONFIG = {
  REGISTRO_ID:     'ID_del_Spreadsheet_Registro_de_Actas',
  CARPETA_RAIZ_ID: 'ID_de_la_carpeta_raiz_en_Drive',

  TEMPLATES: {
    acta:            'ID_de_la_plantilla_Acta',
    planActividades: 'ID_de_la_plantilla_Plan_Actividades',
    evalTutor:       'ID_de_la_plantilla_Eval_Tutor',
  },

  FIRMA_TUTOR: {
    actaInicio:      { row: 34, col: 6 }, // F34
    actaSeguimiento: { row: 34, col: 6 }, // F34
    actaCierre:      { row: 34, col: 6 }, // F34
    planActividades: { row: 73, col: 5 }, // E73
    evalTutor:       { row: 26, col: 2 }, // B26
  },

  URL_FIRMA: 'https://TU_USUARIO.github.io/TU_REPO/',
};
```

---

## 🚧 Desafíos técnicos resueltos

### 1. Timeout de 40 segundos de Make
**Problema:** Crear 5 documentos, reemplazar placeholders y enviar correos tomaba 60-90 segundos. Make tiene un límite fijo de 40s que no es configurable.

**Solución:** Procesamiento asíncrono. El `doGet()` responde a Make en < 2 segundos guardando los datos en `PropertiesService` y creando un `trigger` de tiempo. La función `procesarEnSegundoPlano()` ejecuta el trabajo pesado sin restricción de tiempo.

```javascript
// doGet responde inmediatamente
PropertiesService.getScriptProperties()
  .setProperty('pendiente_' + codigo, JSON.stringify({ d, codigo }));
ScriptApp.newTrigger('procesarEnSegundoPlano').timeBased().after(2000).create();
return okJSON({ ok: true, codigo });
```

---

### 2. Error CORS 405 al enviar la firma
**Problema:** `doPost` no acepta peticiones cross-origin desde GitHub Pages. El servidor respondía con error 405.

**Solución:** Unificar todo en `doGet` y enviar la firma como parámetro GET con `mode: 'no-cors'`.

```javascript
// En el HTML — envío como GET
const params = new URLSearchParams({
  action: 'firmarTutor',
  codigoActa: codigo,
  documentos: docs.join(','),
  firmaBase64: firmaComprimida,
});
await fetch(APPS_SCRIPT_URL + '?' + params.toString(), {
  method: 'GET', mode: 'no-cors'
});
```

---

### 3. Imagen de firma excede límite de URL
**Problema:** Una firma PNG en base64 pesa 50-80KB. El límite de una URL es ~8KB.

**Solución:** Comprimir el canvas a 300×80px en JPEG calidad 0.4 antes de enviar, reduciendo el peso a ~5KB.

```javascript
function comprimirFirma() {
  const temp = document.createElement('canvas');
  temp.width = 300; temp.height = 80;
  const tCtx = temp.getContext('2d');
  tCtx.fillStyle = '#ffffff';
  tCtx.fillRect(0, 0, 300, 80);
  tCtx.drawImage(canvas, 0, 0, 300, 80);
  return temp.toDataURL('image/jpeg', 0.4); // ~5KB
}
```

---

### 4. Permisos de Drive entre cuentas
**Problema:** `carpeta.addEditor(correo)` falla con `Access denied: DriveApp` cuando la carpeta raíz pertenece a una cuenta diferente a la del script.

**Solución:** Usar `setSharing` en cada archivo individualmente en lugar de heredar permisos de la carpeta.

```javascript
DriveApp.getFileById(id).setSharing(
  DriveApp.Access.ANYONE_WITH_LINK,
  DriveApp.Permission.EDIT
);
```

---

### 5. Celdas combinadas en plantillas Google Sheets
**Problema:** Al crear las plantillas desde `.xlsx`, las celdas combinadas (merged cells) no permiten escritura directa con openpyxl — lanza `AttributeError: 'MergedCell' object attribute 'value' is read-only`.

**Solución:** Detectar el rango de la celda combinada y escribir en la celda maestra (top-left del merge).

```python
def set_cell(sh, row, col, value):
    cell = sh.cell(row=row, column=col)
    if isinstance(cell, MergedCell):
        for rng in sh.merged_cells.ranges:
            if cell.coordinate in rng:
                sh.cell(row=rng.min_row, column=rng.min_col).value = value
                return
    else:
        cell.value = value
```

---

## 📊 Registro de Actas

El sistema mantiene un Google Sheets con una fila por estudiante:

| Columna | Campo |
|---------|-------|
| A | Código (ACT-YYYY-NNN) |
| B | Nombre Estudiante |
| C | Correo Estudiante |
| D | Correo Tutor |
| E | ID Acta de Inicio |
| F | ID Acta de Seguimiento |
| G | ID Acta de Cierre |
| H | ID Plan de Actividades |
| I | ID Evaluación del Tutor |
| J | ID Carpeta Drive |
| K | Fecha Creación |

---

## 📈 Métricas

| Métrica | Valor |
|---------|-------|
| Tiempo de proceso (tutor) | < 2 minutos |
| Documentos por estudiante | 5 |
| Plantillas reutilizables | 3 |
| Placeholders por documento | 14 |
| Procesos paralelos soportados | ~20 simultáneos |
| Costo mensual de operación | $0 |

---

## 🗺️ Roadmap

| Versión | Estado | Descripción |
|---------|--------|-------------|
| **v1.0** | ✅ En producción | Firma digital del tutor empresarial |
| **v2.0** | 🔄 Planeado | Firma del estudiante y del profesor acompañante |
| **v2.1** | 🔄 Planeado | Exportación automática del acta completa en PDF |
| **v3.0** | 💡 Propuesto | Adopción como herramienta estándar para todas las empresas coformadoras de Uniempresarial |

---

## 👤 Autor

**Juan Manuel Benitez Skolik**
Estudiante de Ingeniería de Software — Uniempresarial
Coformación empresarial en FUSoft (Fábrica de Soluciones Tecnológicas)

Tutor empresarial: **Cesar Guerrero** — Director FUSoft
Profesora acompañante: **Kellyn Johanna Delgado Jaimes**

---

## 📄 Contexto académico

Este sistema fue desarrollado como **Plan de Mejora Nivel 3** en el marco del programa de coformación empresarial de Uniempresarial. Versión preliminar orientada exclusivamente a reducir los tiempos de gestión del tutor empresarial, con proyección de escalabilidad hacia las demás partes del proceso y hacia otras empresas coformadoras de la institución.
