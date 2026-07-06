# 📊 Artefactos SCRUM — Automatización de Firma Digital del Tutor

**Proyecto:** Automatización de Firma Digital del Tutor Empresarial  
**Organización:** FabricaUE2026 / AUTOMATIZACION DE FIRMAS  
**Institución:** Uniempresarial — FUSoft  
**Metodología:** Scrum  
**Total work items:** 68  

---

## 📑 Contenido por Sprint

- [Sprint 1](#sprint-1) — Semanas 1-2 — Diagnóstico y planificación (5 items)
- [Sprint 2](#sprint-2) — Semanas 3-6 — Infraestructura base (Make, Forms, Google Sheets) (13 items)
- [Sprint 3](#sprint-3) — Semanas 7-10 — Sistema de firma (Apps Script, GitHub Pages) (34 items)
- [Sprint 4](#sprint-4) — Semanas 11-12 — Pruebas funcionales y corrección de errores (9 items)
- [Sprint 5](#sprint-5) — Semanas 13-14 — Evaluación, documentación y cierre (7 items)

---

## 📅 Sprint 1
*Semanas 1-2 — Diagnóstico y planificación*

> 🟣 1 Epic · 🔵 4 Feature

### 🟣 #71 — Automatizacion de firmas

| Campo | Valor |
|-------|-------|
| **Tipo** | Epic |
| **Estado** | 🔄 In Progress |
| **Sprint** | Sprint 1 |

**📝 Descripción:**

Desarrollo e implementación de un sistema automatizado que permite la captura, almacenamiento y procesamiento de firmas digitales para el Acta de Coformación Empresarial de Uniempresarial, eliminando el proceso manual de firmas físicas y envío de documentos.

**✔ Criterios de aceptación:**

- Los 3 participantes (estudiante, tutor, profesor) pueden firmar digitalmente desde cualquier dispositivo
- El sistema genera automáticamente el PDF del acta con datos y firmas insertadas
- El PDF llega por correo a los 3 participantes al completarse las firmas

---

#### 🔵 #72 — Automatización del flujo de registro y notificación.

| Campo | Valor |
|-------|-------|
| **Tipo** | Feature |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 1 |

**📝 Descripción:**

Configuración del escenario en Make que detecta nuevas respuestas del Google Forms y envía automáticamente el correo de notificación con el enlace de firma y el código de acta a los 3 participantes.

**✔ Criterios de aceptación:**

- Make detecta nuevas filas en el Google Sheet de respuestas en tiempo real
- El correo incluye el código de acta (número de fila) y el enlace a la página de firma
- El correo llega correctamente a estudiante, tutor y profesor con sus correos del Forms

---

#### 🔵 #73 — Backend de procesamiento de firmas y generación de PDF.

| Campo | Valor |
|-------|-------|
| **Tipo** | Feature |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 1 |

**📝 Descripción:**

Desarrollo del Google Apps Script que recibe las firmas desde la página web, las almacena en Google Drive, registra el progreso en la hoja de control, y al completarse las 3 firmas genera automáticamente el PDF del acta con todos los datos y firmas insertadas, enviándolo por correo.

**✔ Criterios de aceptación:**

- Las firmas se guardan como PNG en la carpeta de Drive correcta
- La hoja Control de Firmas refleja el estado de cada firma en tiempo real
- Al completarse las 3 firmas del mismo código de acta, el PDF se genera y llega por correo a los 3 participantes

---

#### 🔵 #74 — Corrección de impedimento.

| Campo | Valor |
|-------|-------|
| **Tipo** | Feature |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 1 |

**📝 Descripción:**

Proponer una solución efectiva para que el tutor y el profesor puedan llevar el proceso del estudiante de manera efectiva para proceder a la firma cuando estos lo autoricen

---

#### 🔵 #76 — Página web de captura de firma digital.

| Campo | Valor |
|-------|-------|
| **Tipo** | Feature |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 1 |

**📝 Descripción:**

Desarrollo e implementación de la página web hospedada en GitHub Pages que permite a cada participante seleccionar su rol, ingresar el código de acta y dibujar su firma digital, compatible con cualquier dispositivo.

**✔ Criterios de aceptación:**

- La página funciona correctamente en computadores, tablets y celulares
- El canvas de firma acepta entrada de mouse, touch e lápiz digital
- La firma se envía correctamente al Apps Script al completar el proceso

---

## 📅 Sprint 2
*Semanas 3-6 — Infraestructura base (Make, Forms, Google Sheets)*

> 📋 5 Product Backlog Item · 🔧 8 Task

##### 📋 #77 — Desarrollo del formulario de identificación.

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Implementar el paso 1 de la página web donde el firmante selecciona su rol (estudiante, tutor o profesor), ingresa su nombre, correo y el código de acta recibido por correo.

**✔ Criterios de aceptación:**

- El selector de rol tiene las opciones: Estudiante en coformación, Tutor de empresa, Profesor acompañante
- Todos los campos son obligatorios antes de avanzar al paso 2
- El formulario valida que el código de acta sea un número

---

##### 📋 #101 — Creación de estructura de carpetas

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Como desarrollador, quiero poder llevar el registro de cada estudiante de forma individual mediante una carpeta publica en drive con el proposito de tener un mejor flujo de trabajo y organización en el sistema

---

##### 📋 #102 — Implementación de modulo http (make a request)

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Como automatizador, quiero poder crear un modulo http (make a request) que cree la carpeta del estudiante automaticamente, cree el spreedsheat desde una plantilla, lo diligencie con los datos correspondientes al formulario y comparta el link de acceso a la carpeta y a la hoja de calculo por medio del correo al tutor, profesor y estudiante para llevar acabo el seguimiento correspondiente

---

##### 📋 #179 — Configuración del módulo Gmail en Make

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Configurar el módulo Gmail (módulo 53) en Make para enviar el correo HTML de notificación a los 3 participantes con el enlace de firma y el código de acta.

**✔ Criterios de aceptación:**

- El correo se envía a estudiante (columna F), tutor (columna M) y profesor (columna P) del Sheet
- El Body type está configurado como HTML para que{{1.__ROW_NUMBER__}}se renderice correctamente
- El correo incluye el enlacehttps://juanmask327.github.io/FirmaDigital/y el código de acta visible

---

##### 📋 #180 — Configuración del escenario Make — Watch New Rows

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Configurar el módulo Google Sheets en Make para monitorear el Sheet de respuestas del Forms y activar el escenario al detectar una nueva fila.

**✔ Criterios de aceptación:**

- El escenario se activa automáticamente con cada nueva respuesta del Forms
- El módulo lee correctamente las columnas del Sheet de respuestas
- El campo{{1.__ROW_NUMBER__}}está disponible como código de acta para los módulos siguientes

---

##### 🔧 #181 — Redactar correo

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Redactar el cuerpo del correo HTML incluyendo{{1.__ROW_NUMBER__}}como código de acta

---

##### 🔧 #182 — Verificación de correo

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Ejecutar prueba end-to-end y verificar que el correo llega con código y enlace correctos

---

##### 🔧 #183 — Renderizar el codigo del acta

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Establecer Body type = HTML en el módulo Gmail 53 (si se deja en "Collection of contents" el código de acta no se renderiza)

---

##### 🔧 #184 — Configurar destinatarios

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Configurar destinatarios con columnas F, M y P del Sheet de respuestas

---

##### 🔧 #185 — Conexiones de google

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Conectar cuenta de Google en Make con permisos de lectura sobre el Sheet de respuestas ID1LCeHTSezd-mjHrgWobAD9IqTtPToOzvHr09Ts2R07Hk

---

##### 🔧 #186 — Configuración google sheets

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Configurar módulo Google Sheets — Watch New Rows apuntando al Sheet de respuestas

---

##### 🔧 #187 — Retornar numero de fila

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Verificar que{{1.__ROW_NUMBER__}}retorna el número de fila correcto en una prueba manual

---

##### 🔧 #188 — Configuración google sheets

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 2 |

**📝 Descripción:**

Configurar módulo Google Sheets — Watch New Rows apuntando al Sheet de respuestas

---

## 📅 Sprint 3
*Semanas 7-10 — Sistema de firma (Apps Script, GitHub Pages)*

> 📋 8 Product Backlog Item · 🔧 26 Task

##### 📋 #78 — Envío de firma al Apps Script.

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar el mecanismo de envío de datos desde la página web al Google Apps Script mediante formulario HTML oculto con target iframe, resolviendo la restricción CORS de Apps Script.

**✔ Criterios de aceptación:**

- La firma en base64 y los datos del firmante llegan correctamente al Apps Script
- No se producen errores CORS en el navegador
- Se muestra pantalla de confirmación al usuario tras enviar

---

##### 📋 #79 — Implementación del canvas de firma universal.

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Desarrollar el canvas de firma digital compatible con todos los dispositivos mediante la implementación de tres capas de eventos: Mouse Events, Touch Events y Pointer Events API.

**✔ Criterios de aceptación:**

- El canvas dibuja correctamente con mouse en computadores de escritorio
- El canvas dibuja correctamente con touch en iOS Safari y Android Chrome
- El canvas dibuja correctamente con lápiz digital en dispositivos Samsung y Surface
- El canvas se inicializa correctamente después de hacerse visible en el DOM

---

##### 📋 #80 — Publicación en GitHub Pages

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Publicar la página web en GitHub Pages para que sea accesible públicamente desde cualquier dispositivo sin necesidad de servidor propio.

**✔ Criterios de aceptación:**

- La página está disponible enhttps://juanmask327.github.io/FirmaDigital/
- El repositorio no contiene README.md que interfiera con la página principal
- La URL del Apps Script en el index.html apunta a la versión activa de implementación

---

##### 📋 #103 — Guardado del archivo con firmas correspondientes

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Como usuario, quiero que cuando se digiten las 3 firmas correspondientes, se envie una copia en pdf al correo de cada vinculante al proceso de coformación del estudiante con el contenido modificado por el estudiante con el proosito de enviar la acta diligenciada a coformación

---

##### 📋 #108 — Implementación del endpoint doPost

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Desarrollar la funcióndoPost(e)que actúa como punto de entrada del Apps Script, recibe los datos de la firma desde la página web, guarda el PNG en Drive y coordina el flujo completo.

**✔ Criterios de aceptación:**

- El script acepta datos tanto ene.parameter.data(formulario HTML) como ene.postData.contents(JSON directo)
- La imagen de firma se decodifica de base64 y se guarda como PNG en la carpeta1Dkg3kbVYET0qkVgpGZ-q6kxIUiiJotok
- El archivo se nombra con el formatofirma_{codigoActa}_{rol}.png

---

##### 📋 #109 — Registro y control de firmas.

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar las funcionesregistrarFirma()yverificarCompletitud()que mantienen el estado de las firmas en la hoja de control y detectan cuándo las 3 firmas de un acta están completas.

**✔ Criterios de aceptación:**

- Cada firma queda registrada en la hoja "Control de Firmas" con código de acta, rol, nombre, correo, File ID y timestamp
- Si la firma ya existe para ese código y rol, se actualiza en lugar de duplicar
- La columna "Completado" cambia a "SI" cuando las 3 firmas (estudiante, tutor, profesor) del mismo código están presentes

---

##### 📋 #110 — Generación del acta con datos y firmas

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar la funcióngenerarPDF()que copia la plantilla del acta, llena los datos del estudiante desde el Sheet de respuestas e inserta las imágenes de firma en las celdas correspondientes de las 6 hojas del documento.

**✔ Criterios de aceptación:**

- La plantilla se copia correctamente a la carpeta de salida con nombreActa de Coformacion - {nombreEstudiante}
- Los datos del Forms se llenan en las celdas correctas del Acta de Inicio
- Las firmas se insertan en las celdas correctas de las 6 hojas: Acta de Inicio, Acta de Seguimiento, Acta de Cierre, Plan de actividades, Evaluación del tutor y Evaluación del profesor

---

##### 📋 #111 — Exportación del PDF y envío por correo

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar las funcionesexportarPDF()yenviarCorreo()que exportan el Sheets completo como PDF usando la API de Google y lo envían por correo a los 3 participantes.

**✔ Criterios de aceptación:**

- El PDF incluye todas las hojas del Sheets en formato A4 vertical
- El PDF se adjunta y envía correctamente a los correos de estudiante, tutor y profesor
- El correo tiene asunto y cuerpo HTML con el nombre del estudiante

---

##### 🔧 #81 — Activa github pages

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Activar GitHub Pages desde rama main/master en la configuración del repositorio

---

##### 🔧 #82 — Repositorio

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Crear repositorioFirmaDigitalen la cuentajuanmask327de GitHub

---

##### 🔧 #83 — Subida del index

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Subirindex.htmlcomo archivo principal en la raíz del repositorio

---

##### 🔧 #84 — URL valida

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Verificar que la URL pública carga correctamente

---

##### 🔧 #85 — initCanvas() y setTimeout

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

ImplementarinitCanvas()consetTimeout(initCanvas, 60)para garantizar que el contenedor tenga dimensiones medibles antes de calcular el tamaño del canvas

---

##### 🔧 #86 — Limpiar firma

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Agregar botón de limpiar firma

---

##### 🔧 #87 — Mouse Events

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar Mouse Events (mousedown, mousemove, mouseup) para escritorio

---

##### 🔧 #88 — Pointer Events

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar Pointer Events API para lápices digitales y dispositivos Samsung

---

##### 🔧 #89 — Touch Events

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar Touch Events conpassive:falseycapture:truepara iOS y Android

---

##### 🔧 #90 — Cargar como JSON

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Serializar payload como JSON en campodatadel formulario:{rol, nombre, correo, codigoActa, firma, timestamp}

---

##### 🔧 #91 — Confirmación de exito

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar pantalla de confirmación de éxito (paso 3)

---

##### 🔧 #92 — Constante del script

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Definir constanteAPPS_SCRIPT_URLal inicio del script para facilitar actualización

---

##### 🔧 #93 — iframe

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Agregar<iframe name="hidden_iframe" style="display:none">en el HTML

---

##### 🔧 #94 — metodo POST en html

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar formulario HTML oculto conmethod=POST,action=APPS_SCRIPT_URLytarget=hidden_iframe

---

##### 🔧 #98 — Crear HTML

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Crear estructura HTML del formulario con campos: rol, nombre, correo, código de acta

---

##### 🔧 #99 — CSS compatible con dispositivos

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ⬜ To Do |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Aplicar estilos CSS responsivos para móvil y escritorio

---

##### 🔧 #100 — Validaciones de campos obligatorios

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar validación de campos obligatorios antes de mostrar el canvas

---

##### 🔧 #104 — Envio de PDF diligenciado

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Modificación de AppScript para que envie las actas en formato PDF a cada uno de los actores para que estos rectifiquen la información

// ─────────────────────────────────────────────────────────────// Verifica si las 3 firmas están → genera PDF// ─────────────────────────────────────────────────────────────functionverificarCompletitud(codigoActa) {constss=SpreadsheetApp.openById(SHEET_CONTROL_ID);constsheet=ss.getSheetByName(NOMBRE_HOJA_CONTROL);if(!sheet)return;
constdata=sheet.getDataRange().getValues();constfirmasActa= {};
for(leti=1;i<data.length;i++) {if(data[i][0] ==codigoActa&&data[i][4]) {firmasActa[data[i][1]] =data[i][4];}}
if(!["estudiante","tutor","profesor"].every(r=>firmasActa[r]))return;
for(leti=1;i<data.length;i++) {if(data[i][0] ==codigoActa)sheet.getRange(i+1,7).setValue("SI");}
generarPDF(codigoActa,firmasActa);}
// ─────────────────────────────────────────────────────────────// Obtiene ID del Sheets del estudiante desde Registro de Actas// ─────────────────────────────────────────────────────────────functionobtenerSheetsIdEstudiante(codigoActa) {constss=SpreadsheetApp.openById(SHEET_CONTROL_ID);constsheet=ss.getSheetByName(NOMBRE_HOJA_REGISTRO);if(!sheet)returnnull;constdata=sheet.getDataRange().getValues();for(leti=1;i<data.length;i++) {if(data[i][0] ==codigoActa)returndata[i][3];}returnnull;}
// ─────────────────────────────────────────────────────────────// Genera PDF usando el Sheets ya llenado por el estudiante// ─────────────────────────────────────────────────────────────functiongenerarPDF(codigoActa,firmasActa) {constssResp=SpreadsheetApp.openById(SHEET_RESPUESTAS_ID);constfila=ssResp.getSheets()[0].getRange(codigoActa,1,1,26).getValues()[0];
constdatos= {nombreEstudiante:fila[1],documento:fila[2],programa:fila[3],semestre:fila[4],correoEstudiante:fila[5],razonSocial:fila[8],nombreTutor:fila[16],correoTutor:fila[11],nombreProfesor:fila[13],correoProfesor:fila[14],};
letidSheets=obtenerSheetsIdEstudiante(codigoActa);
if(!idSheets) {Logger.log("No se encontró ID Sheets para acta "+codigoActa+". Usando plantilla.");constcopia=DriveApp.getFileById(PLANTILLA_ID).makeCopy(`Acta de Coformacion -${datos.nombreEstudiante}`,DriveApp.getFolderById(CARPETA_FIRMAS_ID));idSheets=copia.getId();}
constss=SpreadsheetApp.openById(idSheets);
insertarFirma(ss.getSheetByName("Acta de Inicio"),firmasActa["estudiante"],30,5);insertarFirma(ss.getSheetByName("Acta de Inicio"),firmasActa["tutor"],31,5);insertarFirma(ss.getSheetByName("Acta de Inicio"),firmasActa["profesor"],32,5);
insertarFirma(ss.getSheetByName("Acta de Seguimiento"),firmasActa["estudiante"],30,5);insertarFirma(ss.getSheetByName("Acta de Seguimiento"),firmasActa["tutor"],31,5);insertarFirma(ss.getSheetByName("Acta de Seguimiento"),firmasActa["profesor"],32,5);
insertarFirma(ss.getSheetByName("Acta de Cierre"),firmasActa["estudiante"],30,5);insertarFirma(ss.getSheetByName("Acta de Cierre"),firmasActa["tutor"],31,5);insertarFirma(ss.getSheetByName("Acta de Cierre"),firmasActa["profesor"],32,5);
insertarFirma(ss.getSheetByName("Plan de actividades"),firmasActa["estudiante"],53,1);insertarFirma(ss.getSheetByName("Plan de actividades"),firmasActa["tutor"],53,4);insertarFirma(ss.getSheetByName("Plan de actividades"),firmasActa["profesor"],53,7);
insertarFirma(ss.getSheetByName("Evaluación del tutor"),firmasActa["tutor"],26,2);insertarFirma(ss.getSheetByName("Evaluación del tutor"),firmasActa["estudiante"],26,5);
insertarFirma(ss.getSheetByName("Evaluación del profesor"),firmasActa["profesor"],27,2);insertarFirma(ss.getSheetByName("Evaluación del profesor"),firmasActa["estudiante"],27,5);
SpreadsheetApp.flush();Utilities.sleep(3000);
constpdfBlob=exportarPDF(idSheets,datos.nombreEstudiante);enviarCorreo(datos,pdfBlob);}
// ─────────────────────────────────────────────────────────────// Inserta imagen de firma en celda específica// ─────────────────────────────────────────────────────────────functioninsertarFirma(sheet,fileId,fila,columna) {if(!sheet|| !fileId)return;try{constblob=DriveApp.getFileById(fileId).getBlob().setContentType("image/png");constcell=sheet.getRange(fila,columna);constimagen=sheet.insertImage(blob,columna,fila);imagen.setWidth(150);imagen.setHeight(60);imagen.setAnchorCell(cell);imagen.setAnchorCellXOffset(Math.max(0,cell.getWidth()  /2-75));imagen.setAnchorCellYOffset(Math.max(0,cell.getHeight() /2-30));}catch(err) {Logger.log("Error insertando firma fila "+fila+": "+err.message);}}
// ─────────────────────────────────────────────────────────────// Exporta el Sheets como PDF// ─────────────────────────────────────────────────────────────functionexportarPDF(spreadsheetId,nombreEstudiante) {consturl=`https://docs.google.com/spreadsheets/d/${spreadsheetId}/export`+`?format=pdf&size=A4&portrait=true&fitw=true`+`&sheetnames=false&printtitle=false&pagenumbers=false`+`&gridlines=false&fzr=false`;
constresponse=UrlFetchApp.fetch(url, {headers: {Authorization:"Bearer "+ScriptApp.getOAuthToken() }});returnresponse.getBlob().setName(`Acta de Coformacion -${nombreEstudiante}.pdf`);}
// ─────────────────────────────────────────────────────────────// Envía el PDF por correo// ─────────────────────────────────────────────────────────────functionenviarCorreo(datos,pdfBlob) {constdestinatarios= [datos.correoEstudiante,datos.correoTutor,datos.correoProfesor].filter(Boolean).join(",");
GmailApp.sendEmail(destinatarios,`Acta de Coformación Firmada —${datos.nombreEstudiante}`,"",{htmlBody:`<p>Estimados,</p><p>Adjunto encontrarán el <strong>Acta de Coformación</strong> de<strong>${datos.nombreEstudiante}</strong> con las firmas de todos los participantes.</p><p>Este documento fue generado automáticamente al completarse el proceso de firma.</p><br><p>Dirección de Coformación Empresarial<br>Uniempresarial</p>`,attachments: [pdfBlob]});Logger.log("PDF enviado a: "+destinatarios);}

---

##### 🔧 #105 — Modificación de AppScript

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Modificar el AppScript de modo que permita la creación de las carpetas, diligenciamiento automatico de la plantilla y obtención del vinculo para compartir via gmail (carpeta y spreadsheet):

// ─────────────────────────────────────────────────────────────// doGet — Make llama aquí para crear la carpeta del estudiante// ─────────────────────────────────────────────────────────────functiondoGet(e) {if(!e|| !e.parameter|| !e.parameter.action) {returnContentService.createTextOutput("✅ Script de firmas v5 activo").setMimeType(ContentService.MimeType.TEXT);}
if(e.parameter.action==="setup") {try{constresultado=crearEstructuraEstudiante(e.parameter.codigoActa,e.parameter.nombreEstudiante,e.parameter.correoEstudiante,e.parameter.correoTutor,e.parameter.correoProfesor);returnContentService.createTextOutput(JSON.stringify(resultado)).setMimeType(ContentService.MimeType.JSON);}catch(err) {returnContentService.createTextOutput(JSON.stringify({status:"error",message:err.message})).setMimeType(ContentService.MimeType.JSON);}}
returnContentService.createTextOutput(JSON.stringify({status:"error",message:"Acción no reconocida"})).setMimeType(ContentService.MimeType.JSON);}
// ─────────────────────────────────────────────────────────────// Crea carpeta, copia plantilla, llena datos y comparte// ─────────────────────────────────────────────────────────────functioncrearEstructuraEstudiante(codigoActa,nombreEstudiante,correoEstudiante,correoTutor,correoProfesor) {
// 1. Crear carpeta del estudianteconstcarpetaFase=DriveApp.getFolderById(CARPETA_FASE_ID);constcarpetaEstudiante=carpetaFase.createFolder(nombreEstudiante);constidCarpeta=carpetaEstudiante.getId();
// 2. Copiar la plantilla dentro de la carpetaconstarchivoCopia=DriveApp.getFileById(PLANTILLA_ID).makeCopy(`Acta de Coformación -${nombreEstudiante}`,carpetaEstudiante);constidSheets=archivoCopia.getId();
// 3. Llenar datos usando buscar y reemplazar en todas las hojastry{constssResp=SpreadsheetApp.openById(SHEET_RESPUESTAS_ID);constfila=ssResp.getSheets()[0].getRange(Number(codigoActa),1,1,26).getValues()[0];
constd= {nombreEstudiante:fila[1]  ||"",// Bdocumento:fila[2]  ||"",// Cprograma:fila[3]  ||"",// Dsemestre:fila[4]  ||"",// EcorreoEstudiante:fila[5]  ||"",// FrazonSocial:fila[8]  ||"",// InombreTutor:fila[16] ||"",// Q ← Nombre del tutor empresarialcorreoTutor:fila[11] ||"",// L ← Correo del tutornombreProfesor:fila[13] ||"",// N ← Nombre del profesorcorreoProfesor:fila[14] ||"",// O ← Correo del profesor};
constss=SpreadsheetApp.openById(idSheets);
ss.getSheets().forEach(hoja=> {constrango=hoja.getDataRange();rango.createTextFinder("{{Nombre Estudiante}}").replaceAllWith(d.nombreEstudiante);rango.createTextFinder("{{Documento}}").replaceAllWith(d.documento);rango.createTextFinder("{{Programa}}").replaceAllWith(d.programa);rango.createTextFinder("{{Semestre}}").replaceAllWith(d.semestre);rango.createTextFinder("{{Correo Estudiantil}}").replaceAllWith(d.correoEstudiante);rango.createTextFinder("{{Razon Social}}").replaceAllWith(d.razonSocial);rango.createTextFinder("{{Nombre Tutor}}").replaceAllWith(d.nombreTutor);rango.createTextFinder("{{Correo Tutor}}").replaceAllWith(d.correoTutor);rango.createTextFinder("{{Nombre Profesor}}").replaceAllWith(d.nombreProfesor);rango.createTextFinder("{{Correo Profesor}}").replaceAllWith(d.correoProfesor);});
SpreadsheetApp.flush();
}catch(err) {Logger.log("Error llenando datos: "+err.message);}
// 4. Compartir carpeta — en try-catch para no bloquear el returntry{if(correoEstudiante&&correoEstudiante.includes("@")) {carpetaEstudiante.addEditor(correoEstudiante);}

---

##### 🔧 #106 — Actualización de URL

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Actualizar la URL por la siguiente:
https://script.google.com/macros/s/AKfycbzkTnKussLkuVx-jLm34fkHlrCCObGFxZppq56oVBVplLYbxT7RjkLwwC6eRqcrrmzx-g/exec?action=setup&codigoActa={{1.__ROW_NUMBER__}}&nombreEstudiante={{1.`1`}}&correoEstudiante={{1.`5`}}&correoTutor={{1.`11`}}&correoProfesor={{1.`14`}}

---

##### 🔧 #107 — Modificación del script para la estructura

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Complementar el script de AppsScript para la correcta automatización de la creación de las carpetas

---

##### 🔧 #189 — CSS compatible con dispositivos

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Aplicar estilos CSS responsivos para móvil y escritorio

---

##### 🔧 #190 — Lectura dual de datos

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar lectura dual de datos:e.parameter.datacon fallback ae.postData.contents

---

##### 🔧 #191 — Guardado en la nube

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Guardar archivo en Drive conDriveApp.getFolderById(CARPETA_FIRMAS_ID).createFile(blob)

---

##### 🔧 #192 — Permisos de script

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Configurar implementación como Aplicación web con acceso "Cualquier persona" (sin restricción de Google)

---

##### 🔧 #193 — Autocomplementar de celdas

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 3 |

**📝 Descripción:**

Implementar llenado de celdas en Acta de Inicio: A6, C6, D6, H6, A9, D9, G9, E15, E16, E17

---

## 📅 Sprint 4
*Semanas 11-12 — Pruebas funcionales y corrección de errores*

> 📋 3 Product Backlog Item · 🐛 4 Bug · 🔧 2 Task

##### 📋 #527 — PBI Sprint4.1 · Prueba de flujo completo con datos reales

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

Verificar que el flujo completo funciona de extremo a extremo con datos reales: formulario → Make → Apps Script → Drive → correo → GitHub Pages → firma insertada en los 6 documentos (Plan de Mejora, Acta de Inicio, Acta de Seguimiento, Acta de Cierre, Evaluación del Profesor, Evaluación del Tutor).

**✔ Criterios de aceptación:**

- Los 6 documentos se generan con datos correctamente prellenados.
- El estudiante recibe el correo con los 6 links en menos de 7 minutos.
- El tutor recibe el correo con el código ACT y el link de firma.
- La firma del tutor se inserta en la celda correcta de cada documento.
- El Registro de Actas se actualiza con los IDs de los 6 documentos.

---

##### 📋 #528 — PBI Sprint4.2 · Validación de firma digital en los 6 documentos

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

Confirmar que la firma digital del tutor se inserta correctamente en la celda correspondiente de cada uno de los 6 documentos de coformación.

**✔ Criterios de aceptación:**

- Firma visible en Plan de Mejora.
- Firma visible en Acta de Inicio (F34).
- Firma visible en Acta de Seguimiento (F34).
- Firma visible en Acta de Cierre (F34).
- Firma visible en Evaluación del Profesor.
- Firma visible en Evaluación del Tutor (B26).
- Firma guardada en caché carga automáticamente en la siguiente sesión.

---

##### 📋 #529 — PBI Sprint4.3 · Corrección de errores detectados en pruebas

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

Documentar y resolver los errores encontrados durante las pruebas funcionales: error CORS 405 al enviar firma, timeout de 40s en Make, permisos de Drive entre cuentas, imagen de firma excede límite de URL.

**✔ Criterios de aceptación:**

- Error CORS 405 resuelto: firma enviada correctamente vía GET.
- Timeout de Make resuelto: doGet responde en menos de 2 segundos.
- Permisos de Drive resueltos: documentos accesibles con el link.
- Tamaño de firma resuelto: imagen comprimida a menos de 8KB.

---

##### 🐛 #530 — BUG · Error CORS 405 al enviar firma desde GitHub Pages

| Campo | Valor |
|-------|-------|
| **Tipo** | Bug |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

**Pasos para reproducir:**
GitHub Pages enviaba la firma via POST al Apps Script y recibía error 405 Method Not Allowed.

**Causa raíz:**
Google Apps Script no acepta POST desde dominios externos sin CORS headers.

**Solución aplicada:**
Unificar todo en doGet. Enviar firma como parámetro GET con mode: no-cors. Comprimir imagen a JPEG 300x80px (~5KB) para cumplir límite de URL.

---

##### 🐛 #531 — BUG · Timeout de 40 segundos en Make al crear documentos

| Campo | Valor |
|-------|-------|
| **Tipo** | Bug |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

**Pasos para reproducir:**
Make devolvía error timeout of 40000ms exceeded al llamar al Apps Script. Crear 6 documentos tomaba 60-90 segundos.

**Causa raíz:**
Make tiene límite fijo de 40 segundos en el módulo HTTP no configurable.

**Solución aplicada:**
Procesamiento asíncrono: doGet responde en menos de 2 segundos guardando datos en PropertiesService y creando trigger time-based. procesarEnSegundoPlano() ejecuta el trabajo sin restricción de tiempo.

---

##### 🐛 #532 — BUG · Access denied al compartir documentos entre cuentas de Drive

| Campo | Valor |
|-------|-------|
| **Tipo** | Bug |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

**Pasos para reproducir:**
carpeta.addEditor(correo) lanzaba Access denied: DriveApp porque la carpeta raíz pertenece a una cuenta diferente a la del script.

**Causa raíz:**
addEditor/addViewer falla cuando el archivo pertenece a otra cuenta de Google.

**Solución aplicada:**
Usar setSharing(ANYONE_WITH_LINK, EDIT) en cada archivo individualmente. No depender de herencia de permisos de carpeta entre cuentas.

---

##### 🐛 #533 — BUG · Imagen de firma excede límite de URL en petición GET

| Campo | Valor |
|-------|-------|
| **Tipo** | Bug |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

**Pasos para reproducir:**
La firma PNG en base64 pesaba 50-80KB. El límite de una URL es ~8KB, causando que la petición GET fallara.

**Causa raíz:**
Canvas toDataURL image/png genera imágenes demasiado pesadas para transmitir por URL.

**Solución aplicada:**
Comprimir el canvas a 300x80px en JPEG calidad 0.4 antes de enviar. Resultado: imagen de ~5KB, dentro del límite de URL.

---

##### 🔧 #534 — Task · Ejecutar prueba end-to-end con datos de estudiante real

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

1) Llenar el Google Form con datos reales. 2) Verificar ejecución en Make (status 200, ok:true). 3) Confirmar creación de carpeta y 6 documentos en Drive. 4) Verificar llegada de correos al estudiante y al tutor. 5) Abrir GitHub Pages, ingresar código ACT, firmar y enviar. 6) Confirmar que la firma aparece en los 6 documentos.

---

##### 🔧 #535 — Task · Verificar inserción de firma en celdas correctas

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 4 |

**📝 Descripción:**

Abrir cada uno de los 6 documentos tras la firma y verificar que la imagen aparece en la celda correcta: Acta de Inicio F34, Acta de Seguimiento F34, Acta de Cierre F34, Plan de Mejora, Evaluación del Profesor, Evaluación del Tutor B26.

---

## 📅 Sprint 5
*Semanas 13-14 — Evaluación, documentación y cierre*

> 📋 1 Product Backlog Item · 🔧 6 Task

##### 📋 #112 — Documentación técnica completa.

| Campo | Valor |
|-------|-------|
| **Tipo** | Product Backlog Item |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 5 |

**📝 Descripción:**

Redacción del documento técnico en formato Word que cubre arquitectura, configuración de cada componente, errores resueltos, guía de mantenimiento, historial de versiones y análisis de capacidad del sistema.

**✔ Criterios de aceptación:**

- El documento cubre los 13 componentes del sistema documentados
- Incluye todos los IDs de producción, URLs activas y mapeos de celdas
- Incluye tabla de los 12 errores encontrados con sus causas y soluciones
- Incluye checklist de verificación para puesta en producción
- Incluye análisis de capacidad con límites de cuenta gratuita vs Google Workspace

---

##### 🔧 #194 — Arquitectura y flujo

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 5 |

**📝 Descripción:**

Documentar arquitectura y flujo completo del sistema (secciones 1 y 2)

---

##### 🔧 #195 — Configuracion de Make, github pages y apps script

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 5 |

**📝 Descripción:**

Documentar configuración de Make, GitHub Pages y Apps Script (secciones 3, 4 y 5)

---

##### 🔧 #196 — Plantilla, hoja de control y mapeo de celdas

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 5 |

**📝 Descripción:**

Documentar plantilla, hoja de control y mapeos de celdas (secciones 6 y 7)

---

##### 🔧 #197 — Errores encontrados y aspectos no considerados

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 5 |

**📝 Descripción:**

Documentar errores encontrados y aspectos no considerados inicialmente (secciones 8 y 9)

---

##### 🔧 #198 — Mantemiento e historial de versiones

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 5 |

**📝 Descripción:**

Documentar guía de mantenimiento e historial de versiones (secciones 10 y 11)

---

##### 🔧 #199 — checklist y capacidad

| Campo | Valor |
|-------|-------|
| **Tipo** | Task |
| **Estado** | ✅ Done |
| **Sprint** | Sprint 5 |

**📝 Descripción:**

Documentar checklist de verificación y análisis de capacidad (secciones 12 y 13)

---

## 📌 Leyenda de tipos

| Icono | Tipo | Descripción |
|-------|------|-------------|
| 🟣 | Epic | Objetivo de alto nivel que agrupa múltiples features |
| 🔵 | Feature | Funcionalidad de negocio que agrupa PBIs |
| 📋 | Product Backlog Item | Historia de usuario o requerimiento específico |
| 🔧 | Task | Tarea técnica derivada de un PBI |
| 🐛 | Bug | Error detectado y resuelto durante el desarrollo |

---

*Fuente: Azure DevOps — dev.azure.com/FabricaUE2026/AUTOMATIZACION DE FIRMAS*  
*Generado automáticamente desde la API de Azure DevOps*