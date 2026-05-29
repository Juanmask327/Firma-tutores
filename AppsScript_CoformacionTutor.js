// ============================================================
//  SISTEMA DE COFORMACIÓN — APPS SCRIPT INDEPENDIENTE
//  3 plantillas → 5 documentos por estudiante
//  Solo firma del tutor — selección de documentos individual
// ============================================================

const CONFIG = {
  REGISTRO_ID:     '1pLxtHeXc8X25L3OfS4Rx3Qdw-mvrWVm-S5GI1ao__KY',
  CARPETA_RAIZ_ID: '14m6Bap0d6hry4eBVbpxxxpjWKJZckjt4',

  TEMPLATES: {
    acta:            '15k8B9fiGFQAyQSzy2edSoIlD7jCtXZG9tCGOAVjLDl4',
    planActividades: '1L78qqudK2U0JeWHkAFka0IhIllVivX-BwmqsgeDOHx0',
    evalTutor:       '1tRe49hsxqO7I5z-77sdfWwEJADNuj7kjW39UoZyko3s',
  },

  FIRMA_TUTOR: {
    actaInicio:      { row: 34, col: 6 }, // F34
    actaSeguimiento: { row: 34, col: 6 }, // F34
    actaCierre:      { row: 34, col: 6 }, // F34
    planActividades: { row: 73, col: 5 }, // E73
    evalTutor:       { row: 26, col: 2 }, // B26
  },

  URL_FIRMA: 'https://juanmask327.github.io/Firma-tutores/',
};

const COL = {
  CODIGO:         0,
  NOMBRE:         1,
  CORREO_EST:     2,
  CORREO_TUTOR:   3,
  ID_ACTA_INICIO: 4,
  ID_ACTA_SEG:    5,
  ID_ACTA_CIERRE: 6,
  ID_PLAN_ACT:    7,
  ID_EVAL_TUTOR:  8,
  ID_CARPETA:     9,
  FECHA:          10,
};

const KEY_TO_COL = {
  actaInicio:      COL.ID_ACTA_INICIO,
  actaSeguimiento: COL.ID_ACTA_SEG,
  actaCierre:      COL.ID_ACTA_CIERRE,
  planActividades: COL.ID_PLAN_ACT,
  evalTutor:       COL.ID_EVAL_TUTOR,
};


// ── doGet — MANEJA SETUP Y FIRMA ──────────────────────────────
function doGet(e) {
  try {
    const p = e.parameter;

    // ── Firma del tutor ──────────────────────────────────────
    if (p.action === 'firmarTutor') {
      if (!p.codigoActa)  return errorJSON('Falta codigoActa');
      if (!p.firmaBase64) return errorJSON('Falta firmaBase64');

      const documentos = p.documentos
        ? p.documentos.split(',').map(d => d.trim())
        : ['actaInicio','actaSeguimiento','actaCierre','planActividades','evalTutor'];

      return firmarTutor(
        p.codigoActa.trim().toUpperCase(),
        p.firmaBase64,
        documentos
      );
    }

    // ── Setup desde Make ─────────────────────────────────────
    const requeridos = ['nombre','documento','programa','semestre',
                        'correoEstudiante','razonSocial','nombreTutor',
                        'correoTutor','nombreProfesor','correoProfesor'];
    for (const campo of requeridos) {
      if (!p[campo]) return errorJSON('Falta parámetro: ' + campo);
    }

    const d = {
      nombre:           p.nombre,
      documento:        p.documento,
      programa:         p.programa,
      semestre:         p.semestre,
      correoEstudiante: p.correoEstudiante,
      razonSocial:      p.razonSocial,
      nombreTutor:      p.nombreTutor,
      correoTutor:      p.correoTutor,
      nombreProfesor:   p.nombreProfesor,
      correoProfesor:   p.correoProfesor,
    };

    const registroSS   = SpreadsheetApp.openById(CONFIG.REGISTRO_ID);
    const hojaRegistro = registroSS.getSheetByName('Registro de Actas');
    const codigo       = generarCodigo(hojaRegistro);

    PropertiesService.getScriptProperties()
      .setProperty('pendiente_' + codigo, JSON.stringify({ d, codigo }));

    ScriptApp.newTrigger('procesarEnSegundoPlano')
      .timeBased().after(2000).create();

    return okJSON({ ok: true, codigo, nombre: d.nombre });

  } catch (err) {
    return errorJSON(err.message);
  }
}


// ── PROCESO EN SEGUNDO PLANO ──────────────────────────────────
function procesarEnSegundoPlano() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'procesarEnSegundoPlano')
    .forEach(t => ScriptApp.deleteTrigger(t));

  const props  = PropertiesService.getScriptProperties();
  const claves = props.getKeys().filter(k => k.startsWith('pendiente_'));

  claves.forEach(clave => {
    try {
      const { d, codigo } = JSON.parse(props.getProperty(clave));

      const registroSS   = SpreadsheetApp.openById(CONFIG.REGISTRO_ID);
      const hojaRegistro = registroSS.getSheetByName('Registro de Actas');
      const carpeta      = DriveApp.getFolderById(CONFIG.CARPETA_RAIZ_ID)
                                   .createFolder(codigo + ' — ' + d.nombre);
      const ids          = crearDocumentos(carpeta, d, codigo);

      // Hacer cada documento accesible con el link
      const todosLosIds = [
        ids.actaInicio, ids.actaSeguimiento, ids.actaCierre,
        ids.planActividades, ids.evalTutor,
      ];

      todosLosIds.forEach(id => {
        try {
          DriveApp.getFileById(id).setSharing(
            DriveApp.Access.ANYONE_WITH_LINK,
            DriveApp.Permission.EDIT
          );
        } catch(e) {
          Logger.log('Advertencia setSharing ' + id + ': ' + e.message);
        }
      });

      const fecha = Utilities.formatDate(new Date(), 'America/Bogota', 'dd/MM/yyyy HH:mm');
      hojaRegistro.appendRow([
        codigo, d.nombre, d.correoEstudiante, d.correoTutor,
        ids.actaInicio, ids.actaSeguimiento, ids.actaCierre,
        ids.planActividades, ids.evalTutor, carpeta.getId(), fecha,
      ]);

      enviarCorreoEstudiante(d, codigo, ids);
      enviarCorreoTutor(d, codigo);

      props.deleteProperty(clave);
      Logger.log('✓ Procesado: ' + codigo);

    } catch(err) {
      Logger.log('✗ Error en ' + clave + ': ' + err.message);
    }
  });
}


// ── FIRMA DEL TUTOR ───────────────────────────────────────────
function firmarTutor(codigo, firmaBase64, documentos) {
  const datos = SpreadsheetApp
    .openById(CONFIG.REGISTRO_ID)
    .getSheetByName('Registro de Actas')
    .getDataRange().getValues();

  let fila = null;
  for (let i = 1; i < datos.length; i++) {
    if (String(datos[i][COL.CODIGO]).trim() === codigo) { fila = datos[i]; break; }
  }
  if (!fila) return errorJSON('Código no encontrado: ' + codigo);

  const base64limpio = firmaBase64.replace(/^data:image\/(png|jpeg);base64,/, '');
  const mimeType     = firmaBase64.startsWith('data:image/jpeg') ? 'image/jpeg' : 'image/png';
  const extension    = mimeType === 'image/jpeg' ? 'jpg' : 'png';

  const blob = Utilities.newBlob(
    Utilities.base64Decode(base64limpio),
    mimeType,
    'firma_tutor.' + extension
  );

  const errores  = [];
  const firmados = [];

  documentos.forEach(clave => {
    const colIdx = KEY_TO_COL[clave];
    if (colIdx === undefined) return;

    const sheetsId = fila[colIdx];
    if (!sheetsId) { errores.push(clave + ': ID no encontrado'); return; }

    try {
      const sh  = SpreadsheetApp.openById(sheetsId).getSheets()[0];
      const cfg = CONFIG.FIRMA_TUTOR[clave];
      sh.insertImage(blob, cfg.col, cfg.row);
      SpreadsheetApp.flush();
      firmados.push(clave);
    } catch (err) {
      errores.push(clave + ': ' + err.message);
    }
  });

  if (errores.length && !firmados.length) {
    return errorJSON('Errores: ' + errores.join(' | '));
  }

  return okJSON({
    mensaje:  'Firma insertada en: ' + firmados.join(', '),
    firmados: firmados,
    errores:  errores,
    codigo:   codigo,
  });
}


// ── CORREOS ───────────────────────────────────────────────────
const btnStyle = 'display:block;background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:12px 16px;margin-bottom:8px;color:#1F3864;text-decoration:none;font-weight:600';

function enviarCorreoEstudiante(d, codigo, ids) {
  const asunto = 'Tus documentos de coformación — ' + codigo;
  const cuerpo = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1F3864;padding:24px;border-radius:8px 8px 0 0">
        <h2 style="color:#fff;margin:0;font-size:20px">Coformación Empresarial</h2>
        <p style="color:#a8c4e0;margin:4px 0 0">Uniempresarial</p>
      </div>
      <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-radius:0 0 8px 8px">
        <p style="color:#374151">Hola <strong>${d.nombre}</strong>,</p>
        <p style="color:#374151">Tus documentos de coformación han sido generados:</p>
        <div style="margin:20px 0">
          <a href="${ssLink(ids.actaInicio)}"      style="${btnStyle}">📄 Acta de Inicio</a>
          <a href="${ssLink(ids.actaSeguimiento)}" style="${btnStyle}">📄 Acta de Seguimiento</a>
          <a href="${ssLink(ids.actaCierre)}"      style="${btnStyle}">📄 Acta de Cierre</a>
          <a href="${ssLink(ids.planActividades)}" style="${btnStyle}">📄 Plan de Actividades</a>
          <a href="${ssLink(ids.evalTutor)}"       style="${btnStyle}">📄 Evaluación del Tutor</a>
        </div>
        <div style="background:#EAF0FA;border-radius:6px;padding:14px 16px;margin:20px 0">
          <p style="margin:0;color:#1F3864;font-size:14px">
            📌 Código de acta: <strong style="font-size:18px">${codigo}</strong>
          </p>
        </div>
        <p style="color:#6b7280;font-size:13px">⚠️ Completa los documentos directamente en Google Sheets. No los descargues como Excel.</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
        <p style="color:#9ca3af;font-size:12px;margin:0">Uniempresarial — Coformación Empresarial</p>
      </div>
    </div>`;
  GmailApp.sendEmail(d.correoEstudiante, asunto, '', { htmlBody: cuerpo });
}

function enviarCorreoTutor(d, codigo) {
  const asunto = 'Solicitud de firma — Acta ' + codigo;
  const cuerpo = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1F3864;padding:24px;border-radius:8px 8px 0 0">
        <h2 style="color:#fff;margin:0;font-size:20px">Coformación Empresarial</h2>
        <p style="color:#a8c4e0;margin:4px 0 0">Uniempresarial</p>
      </div>
      <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-radius:0 0 8px 8px">
        <p style="color:#374151">Estimado/a tutor/a,</p>
        <p style="color:#374151">
          El estudiante <strong>${d.nombre}</strong> de <strong>${d.razonSocial}</strong>
          requiere tu firma en los documentos de coformación.
        </p>
        <div style="background:#EAF0FA;border-radius:6px;padding:14px 16px;margin:20px 0">
          <p style="margin:0 0 6px;color:#1F3864;font-size:14px">
            📌 Código del acta: <strong style="font-size:18px">${codigo}</strong>
          </p>
          <p style="margin:0;color:#6b7280;font-size:13px">Guarda este código — lo necesitarás para firmar.</p>
        </div>
        <div style="text-align:center;margin:24px 0">
          <a href="${CONFIG.URL_FIRMA}"
             style="background:#1F3864;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;display:inline-block">
            ✍️ Firmar documentos
          </a>
        </div>
        <p style="color:#6b7280;font-size:13px;text-align:center">
          Puedes elegir qué documentos firmar en cada sesión.
        </p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
        <p style="color:#9ca3af;font-size:12px;margin:0">Uniempresarial — Coformación Empresarial</p>
      </div>
    </div>`;
  GmailApp.sendEmail(d.correoTutor, asunto, '', { htmlBody: cuerpo });
}


// ── CREAR DOCUMENTOS ──────────────────────────────────────────
function crearDocumentos(carpeta, d, codigo) {
  const fecha = Utilities.formatDate(new Date(), 'America/Bogota', 'dd/MM/yyyy');
  const hora  = Utilities.formatDate(new Date(), 'America/Bogota', 'HH:mm');

  const docs = [
    { key: 'actaInicio',      tmpl: 'acta',            label: 'Acta de Inicio',       tipo: 'INICIAL',     asunto: 'REUNION INICIAL' },
    { key: 'actaSeguimiento', tmpl: 'acta',            label: 'Acta de Seguimiento',  tipo: 'SEGUIMIENTO', asunto: 'REUNION DE SEGUIMIENTO' },
    { key: 'actaCierre',      tmpl: 'acta',            label: 'Acta de Cierre',       tipo: 'CIERRE',      asunto: 'REUNION DE CIERRE' },
    { key: 'planActividades', tmpl: 'planActividades', label: 'Plan de Actividades',  tipo: '',            asunto: '' },
    { key: 'evalTutor',       tmpl: 'evalTutor',       label: 'Evaluación del Tutor', tipo: '',            asunto: '' },
  ];

  const ids = {};
  docs.forEach(({ key, tmpl, label, tipo, asunto }) => {
    const copia = DriveApp.getFileById(CONFIG.TEMPLATES[tmpl])
                          .makeCopy(codigo + ' — ' + label + ' — ' + d.nombre, carpeta);
    const sh = SpreadsheetApp.openById(copia.getId()).getSheets()[0];
    reemplazarPlaceholders(sh, d, fecha, hora, tipo, asunto);
    SpreadsheetApp.flush();
    ids[key] = copia.getId();
  });

  return ids;
}

function reemplazarPlaceholders(sh, d, fecha, hora, tipo, asunto) {
  [
    ['{{Nombre Estudiante}}',  d.nombre],
    ['{{Documento}}',          d.documento],
    ['{{Programa}}',           d.programa],
    ['{{Semestre}}',           d.semestre],
    ['{{Correo Estudiantil}}', d.correoEstudiante],
    ['{{Razon Social}}',       d.razonSocial],
    ['{{Nombre Tutor}}',       d.nombreTutor],
    ['{{Correo Tutor}}',       d.correoTutor],
    ['{{Nombre Profesor}}',    d.nombreProfesor],
    ['{{Correo Profesor}}',    d.correoProfesor],
    ['{{Fecha}}',              fecha],
    ['{{Hora}}',               hora],
    ['{{Tipo Reunion}}',       tipo],
    ['{{Asunto}}',             asunto],
  ].forEach(([ph, val]) =>
    sh.createTextFinder(ph).matchEntireCell(false).replaceAllWith(val)
  );
}


// ── UTILIDADES ────────────────────────────────────────────────
function generarCodigo(hoja) {
  const año    = new Date().getFullYear();
  const numero = String(Math.max(hoja.getLastRow(), 1)).padStart(3, '0');
  return 'ACT-' + año + '-' + numero;
}

function ssLink(id) {
  return 'https://docs.google.com/spreadsheets/d/' + id;
}

function okJSON(data) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, ...data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorJSON(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}


// ── TEST MANUAL ───────────────────────────────────────────────
function testSetup() {
  Logger.log(DriveApp.getFileById(CONFIG.TEMPLATES.acta).getName());
  Logger.log(DriveApp.getFileById(CONFIG.TEMPLATES.planActividades).getName());
  Logger.log(DriveApp.getFileById(CONFIG.TEMPLATES.evalTutor).getName());

  const d = {
    nombre: 'Juan Prueba', documento: '1234567890',
    programa: 'Ingeniería de Software', semestre: '6',
    correoEstudiante: 'jskolik@uniempresarial.edu.co',
    razonSocial: 'Empresa de Prueba S.A.S.',
    nombreTutor: 'Carlos Tutor', correoTutor: 'jskolik@uniempresarial.edu.co',
    nombreProfesor: 'María Profesora', correoProfesor: 'jskolik@uniempresarial.edu.co',
  };

  const hojaRegistro = SpreadsheetApp.openById(CONFIG.REGISTRO_ID)
                                     .getSheetByName('Registro de Actas');
  const codigo  = generarCodigo(hojaRegistro);
  const carpeta = DriveApp.getFolderById(CONFIG.CARPETA_RAIZ_ID)
                          .createFolder(codigo + ' — ' + d.nombre);
  const ids     = crearDocumentos(carpeta, d, codigo);

  // Hacer cada documento accesible con el link
  const todosLosIds = [
    ids.actaInicio, ids.actaSeguimiento, ids.actaCierre,
    ids.planActividades, ids.evalTutor,
  ];

  todosLosIds.forEach(id => {
    try {
      DriveApp.getFileById(id).setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.EDIT
      );
    } catch(e) {
      Logger.log('Advertencia setSharing ' + id + ': ' + e.message);
    }
  });

  const fecha = Utilities.formatDate(new Date(), 'America/Bogota', 'dd/MM/yyyy HH:mm');
  hojaRegistro.appendRow([
    codigo, d.nombre, d.correoEstudiante, d.correoTutor,
    ids.actaInicio, ids.actaSeguimiento, ids.actaCierre,
    ids.planActividades, ids.evalTutor, carpeta.getId(), fecha,
  ]);

  enviarCorreoEstudiante(d, codigo, ids);
  enviarCorreoTutor(d, codigo);

  Logger.log('✓ Código: ' + codigo);
  Logger.log(JSON.stringify(ids, null, 2));
}