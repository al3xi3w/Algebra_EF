/* Álgebra Lineal · EF — app estática (sin build). */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $('#app');
  const TEMAS = THEORY.map(t => ({ id: t.id, short: t.wk.replace('Semana ', 'S') }));
  const temaName = id => { const t = THEORY.find(x => x.id === id); return t ? t.wk : id; };
  const temaShort = id => (TEMAS.find(t => t.id === id) || { short: id }).short;
  const FMAP = Object.fromEntries(FORMULAS.map(f => [f.id, f]));

  // ---------- almacenamiento local (comodidad por usuario; la página funciona sin él)
  const store = {
    get(k, d) { try { const v = localStorage.getItem('alg-ef:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('alg-ef:' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
  };

  // ---------- macros \mat{..} y \col{..}
  function splitTop(s, sep) {
    const out = []; let depth = 0, cur = '';
    for (const ch of s) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
      if (ch === sep && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
    }
    out.push(cur); return out;
  }
  function expand(s) {
    const re = /\\(mat|col)\{/g; let m, out = '', last = 0;
    while ((m = re.exec(s))) {
      let i = m.index + m[0].length, depth = 1;
      while (i < s.length && depth) { if (s[i] === '{') depth++; else if (s[i] === '}') depth--; i++; }
      const body = expand(s.slice(m.index + m[0].length, i - 1));
      let tex;
      if (m[1] === 'col') tex = '\\begin{bmatrix}' + splitTop(body, ',').map(x => x.trim()).join('\\\\') + '\\end{bmatrix}';
      else tex = '\\begin{bmatrix}' + splitTop(body, ';').map(r => splitTop(r, ',').map(x => x.trim()).join('&')).join('\\\\') + '\\end{bmatrix}';
      out += s.slice(last, m.index) + tex; last = i; re.lastIndex = i;
    }
    return out + s.slice(last);
  }
  function math(el) {
    if (window.renderMathInElement) {
      renderMathInElement(el, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false,
      });
    }
  }
  function render(html) { app.innerHTML = expand(html); math(app); }

  // ---------- enlaces a fuentes
  const pdfHref = (pdf, p) => 'Clases/' + PDFS[pdf].file + (p ? '#page=' + p : '');
  const bancoHref = b => encodeURI(BANCOS[b].file);
  function srcLinks(src, fallbackPdf) {
    if (!src) return '';
    const pdf = src.pdf || fallbackPdf; let h = '';
    if (pdf && src.p) h += src.p.map(p => `<a class="src" target="_blank" rel="noopener" href="${pdfHref(pdf, p)}" title="Abrir la diapositiva">${temaShort(pdf)} pág. ${p}</a>`).join(' ');
    if (src.banco) h += ` <a class="src" target="_blank" rel="noopener" href="${bancoHref(src.banco)}" title="${BANCOS[src.banco].name}">${src.banco === 'ef' ? 'Banco EF' : 'Maratón'}${src.n ? ' ' + src.n : ''}</a>`;
    return h;
  }
  const fChips = fs => (fs || []).filter(id => FMAP[id]).map(id => `<a class="pill" href="#formulas/${id}" title="Ver fórmula">${FMAP[id].name}</a>`).join('');

  // ---------- índice inverso fórmula → ejercicios
  const USES = {};
  function addUse(fs, entry) { (fs || []).forEach(id => { (USES[id] = USES[id] || []).push(entry); }); }
  SOLVED.forEach(e => addUse(e.f, { href: '#resueltos/' + e.id, label: 'Resuelto: ' + e.title }));
  PRACTICE.forEach((e, i) => addUse(e.f, { href: '#practica/' + e.id, label: 'Práctica ' + (i + 1) }));
  EXAMS.forEach(s => s.items.forEach(it => addUse(it.f, { href: '#simulacro/' + s.id, label: s.title + ' · ítem ' + it.item })));

  function filterBar(cur, base, extra = '') {
    const opts = [{ id: 'all', short: 'Todos' }, ...TEMAS.filter(t => t.id !== 's15')];
    return `<div class="filters">${opts.map(t => `<button class="${cur === t.id ? 'on' : ''}" data-tema="${t.id}">${t.short === 'Todos' ? 'Todos' : t.short}</button>`).join('')}${extra}</div>`;
  }
  function bindFilter(cb) { $$('.filters [data-tema]').forEach(b => b.onclick = () => cb(b.dataset.tema)); }

  // ================= PÁGINAS
  function pageInicio() {
    const nErr = 6;
    render(`
      <h1>Álgebra Lineal — Examen Final</h1>
      <p class="lead">Teoría de S06 a S15, fórmulas con los ejercicios donde se usan, ${SOLVED.length} resueltos paso a paso, ${PRACTICE.length} ejercicios de práctica, ${VF.length} preguntas V/F y ${EXAMS.length} simulacros con tiempo.</p>
      <div class="card">
        <h2 style="margin-top:0">Qué entra en el examen final</h2>
        <p>Según el <a href="${bancoHref('ef')}" target="_blank" rel="noopener">banco de entrenamiento EF M1</a> (que sigue los logros del examen oficial), el examen tiene 5 ítems:</p>
        <div class="tablewrap"><table><tr><th>Ítem</th><th>Tema</th><th>Logro</th><th></th></tr>
        ${EXAM_MAP.map(e => `<tr><td><b>${e.item}</b></td><td>${e.tema}</td><td>${e.logro}</td><td><a href="#teoria/${e.sec}">teoría</a></td></tr>`).join('')}
        </table></div>
        <p style="margin-bottom:0">Los temas de S06–S07 (subespacios, LI, rango-nulidad) no son un ítem propio, pero se usan dentro de todos (núcleo, imagen, $m.g$, completar $U$ en la SVD).</p>
      </div>
      <h2>Por dónde empezar</h2>
      <div class="grid">
        <a class="tile" href="#teoria"><b>1 · Teoría</b><small>Resumen por semana con enlace a cada diapositiva.</small></a>
        <a class="tile" href="#formulas"><b>2 · Fórmulas</b><small>${FORMULAS.length} fórmulas y en qué ejercicios se usan.</small></a>
        <a class="tile" href="#resueltos"><b>3 · Resueltos</b><small>Paso a paso, revelando un paso a la vez.</small></a>
        <a class="tile" href="#practica"><b>4 · Práctica</b><small>Respuesta y solución ocultas; marca tu avance.</small></a>
        <a class="tile" href="#vf"><b>5 · Verdadero/Falso</b><small>Conceptos del banco maratón con justificación.</small></a>
        <a class="tile" href="#simulacro"><b>6 · Simulacro</b><small>5 ítems con tiempo y nota sobre 20.</small></a>
      </div>
      <h2>Erratas detectadas en el material</h2>
      <div class="box bad"><ul style="margin:0">
        <li>S11 pág. 24: el polinomio es $-(\\lambda-1)(\\lambda+2)(\\lambda-3)$, no $(\\lambda-2)$.</li>
        <li>S14 pág. 9: $\\tfrac1{\\sqrt{13}}\\mat{3,-2;2,-3}$ no es ortogonal (debe ser $\\mat{3,-2;2,3}$).</li>
        <li>S14 pág. 12: $\\tfrac1{13}(27,28)$ debe ser $\\tfrac1{13}(27,18)$.</li>
        <li>S14 págs. 42–44: $\\lambda=90$ (no 9), $AA^\\top$ tiene $-20$ (no $-40$), $\\Sigma$ es $3\\times2$ y los dos últimos vectores de $U$ necesitan Gram-Schmidt.</li>
        <li>Banco EF 3.2: $v_2\\propto(4,-13,17,-6)$, no $(4,17,-13,-6)$.</li>
        <li>Banco EF 7.1: el límite es $(250\\,000,\\ 750\\,000)$, no $(2\\cdot10^5,\\ 6\\cdot10^5)$.</li>
      </ul></div>
      <p style="color:var(--muted);font-size:.9rem">Todas las respuestas de esta web se comprobaron con cálculo simbólico. Los contenidos que no están en las diapositivas llevan la etiqueta <span class="pill warn">del banco…</span>.</p>`);
  }

  function pageTeoria(sec) {
    const t = THEORY.find(x => x.id === sec) || THEORY[0];
    render(`
      <div class="layout">
        <aside class="side"><div class="h">Semanas</div>${THEORY.map(x => `<a href="#teoria/${x.id}" class="${x.id === t.id ? 'on' : ''}">${x.wk}</a>`).join('')}
          <div class="h">Repaso</div><a href="${pdfHref('s15')}" target="_blank" rel="noopener">S15 · Repaso (PDF)</a></aside>
        <section>
          <span class="pill">${t.wk}</span>
          <h1>${t.title}</h1>
          <p class="lead">${t.intro}</p>
          <p><a class="src" target="_blank" rel="noopener" href="${pdfHref(t.id)}">Abrir PDF completo</a></p>
          ${t.blocks.map(b => `<div class="card blk"><h3><span>${b.h}</span><span>${b.src.map(p => `<a class="src" target="_blank" rel="noopener" href="${pdfHref(t.id, p)}">pág. ${p}</a>`).join(' ')}</span></h3>${b.html}</div>`).join('')}
          <h2>Para practicar este tema</h2>
          <div class="uses">${SOLVED.filter(e => e.tema === t.id).map(e => `<a href="#resueltos/${e.id}">Resuelto: ${e.title}</a>`).join('')}
          ${PRACTICE.map((e, i) => [e, i]).filter(([e]) => e.tema === t.id).map(([e, i]) => `<a href="#practica/${e.id}">Práctica ${i + 1}</a>`).join('')}</div>
        </section>
      </div>`);
    window.scrollTo(0, 0);
  }

  function pageFormulas(focus) {
    let tema = 'all';
    const draw = () => {
      const list = FORMULAS.filter(f => tema === 'all' || f.tema === tema);
      render(`
        <h1>Fórmulas</h1>
        <p class="lead">Cada fórmula con cuándo usarla y los ejercicios de esta web donde aparece.</p>
        ${filterBar(tema)}
        ${list.map(f => `<div class="card" id="${f.id}">
          <div class="ex head"><h3>${f.name}</h3><span><span class="pill">${temaShort(f.tema)}</span>${f.src ? `<a class="src" target="_blank" rel="noopener" href="${pdfHref(f.tema, f.src)}">pág. ${f.src}</a>` : ''}${f.banco ? ` <span class="pill warn">del banco ${f.banco === 'ef' ? 'EF' : 'maratón'}</span>` : ''}</span></div>
          ${f.tex}
          <p style="margin:.3em 0"><b>Cuándo:</b> ${f.cuando}</p>
          ${f.ojo ? `<div class="box warn" style="margin:.4em 0"><b>Ojo:</b> ${f.ojo}</div>` : ''}
          <div class="uses"><small style="color:var(--muted)">Se usa en:</small>${(USES[f.id] || []).map(u => `<a href="${u.href}">${u.label}</a>`).join('') || '<small>—</small>'}</div>
        </div>`).join('')}`);
      bindFilter(t => { tema = t; draw(); });
    };
    draw(); focusEl(focus);
  }

  function pageResueltos(focus) {
    let tema = 'all';
    const draw = () => {
      const list = SOLVED.filter(e => tema === 'all' || e.tema === tema);
      render(`
        <h1>Ejercicios resueltos</h1>
        <p class="lead">Intenta cada paso antes de revelarlo. “Paso siguiente” muestra uno a la vez.</p>
        ${filterBar(tema)}
        ${list.map(e => `<div class="card ex" id="${e.id}">
          <div class="head"><h3>${e.title}</h3><span><span class="pill">${temaShort(e.tema)}</span>${srcLinks(e.src, e.tema)}</span></div>
          <p>${e.enun}</p>
          <div class="row"><button class="pri sm" data-next="${e.id}">Paso siguiente</button><button class="sm" data-all="${e.id}">Ver todo</button><button class="sm" data-reset="${e.id}">Ocultar</button></div>
          <ol class="steps">${e.steps.map(s => `<li class="hidden">${s}</li>`).join('')}</ol>
          <div class="ans hidden"><b>Respuesta:</b> ${e.ans}</div>
          ${e.note ? `<div class="box bad hidden note"><b>Errata en el material:</b> ${e.note}</div>` : ''}
          <div class="uses" style="margin-top:10px">${fChips(e.f)}</div>
        </div>`).join('')}`);
      bindFilter(t => { tema = t; draw(); });
      $$('[data-next]').forEach(b => b.onclick = () => {
        const c = $('#' + b.dataset.next); const h = $$('.steps li.hidden', c);
        if (h.length) h[0].classList.remove('hidden');
        if (h.length <= 1) $$('.ans,.note', c).forEach(x => x.classList.remove('hidden'));
      });
      $$('[data-all]').forEach(b => b.onclick = () => $$('.hidden', $('#' + b.dataset.all)).forEach(x => x.classList.remove('hidden')));
      $$('[data-reset]').forEach(b => b.onclick = () => $$('.steps li,.ans,.note', $('#' + b.dataset.reset)).forEach(x => x.classList.add('hidden')));
    };
    draw(); focusEl(focus);
  }

  function pagePractica(focus) {
    let tema = 'all', dif = 0;
    const marks = store.get('marks', {});
    const draw = () => {
      const list = PRACTICE.map((e, i) => [e, i]).filter(([e]) => (tema === 'all' || e.tema === tema) && (!dif || e.dif === dif));
      const ok = PRACTICE.filter(e => marks[e.id] === 'ok').length, rep = PRACTICE.filter(e => marks[e.id] === 'rep').length;
      const difBtns = ` <span style="width:12px"></span>` + [[0, 'Toda dificultad'], [1, 'Básico'], [2, 'Medio'], [3, 'Tipo examen']].map(([d, l]) => `<button class="${dif === d ? 'on' : ''}" data-dif="${d}">${l}</button>`).join('');
      render(`
        <h1>Práctica</h1>
        <p class="lead">Resuelve en papel y luego compara. Marca cada uno para saber qué repasar.</p>
        <div class="card row" style="justify-content:space-between"><span><span class="pill ok">${ok} bien</span><span class="pill warn">${rep} por repasar</span><span class="pill">${PRACTICE.length - ok - rep} sin marcar</span></span>
          <button class="sm" id="onlyrep">Mostrar solo “repasar”</button></div>
        ${filterBar(tema, '', difBtns)}
        ${list.map(([e, i]) => `<div class="card ex ${marks[e.id] === 'ok' ? 'status-ok' : marks[e.id] === 'rep' ? 'status-rep' : ''}" id="${e.id}">
          <div class="head"><h3>Práctica ${i + 1}</h3><span><span class="pill">${temaShort(e.tema)}</span><span class="pill ${e.dif === 3 ? 'bad' : e.dif === 2 ? 'warn' : 'ok'}">${['', 'básico', 'medio', 'tipo examen'][e.dif]}</span>${srcLinks(e.src)}</span></div>
          <p>${e.enun}</p>
          <div class="row"><button class="sm pri" data-show="ans">Ver respuesta</button><button class="sm" data-show="sol">Ver solución</button></div>
          <div class="ans hidden" data-part="ans"><b>Respuesta:</b> ${e.resp}</div>
          <div class="box hidden" data-part="sol"><b>Solución:</b> ${e.sol}</div>
          <div class="mark"><small style="color:var(--muted)">¿Cómo te fue?</small>
            <button class="sm ${marks[e.id] === 'ok' ? 'on' : ''}" data-mark="ok">Lo hice bien</button>
            <button class="sm ${marks[e.id] === 'rep' ? 'on' : ''}" data-mark="rep">Repasar</button>
            <span class="uses" style="margin:0 0 0 auto">${fChips(e.f)}</span></div>
        </div>`).join('') || '<p>No hay ejercicios con ese filtro.</p>'}`);
      bindFilter(t => { tema = t; draw(); });
      $$('[data-dif]').forEach(b => b.onclick = () => { dif = +b.dataset.dif; draw(); });
      $$('[data-show]').forEach(b => b.onclick = () => $(`[data-part="${b.dataset.show}"]`, b.closest('.ex')).classList.toggle('hidden'));
      $$('[data-mark]').forEach(b => b.onclick = () => {
        const id = b.closest('.ex').id; marks[id] = marks[id] === b.dataset.mark ? undefined : b.dataset.mark;
        store.set('marks', marks); const y = window.scrollY; draw(); window.scrollTo(0, y);
      });
      $('#onlyrep').onclick = () => $$('.ex').forEach(c => { if (marks[c.id] !== 'rep') c.classList.toggle('hidden'); });
    };
    draw(); focusEl(focus);
  }

  function pageVF() {
    let tema = 'all', order = [], pos = 0, score = 0, answered = false, mode = 'quiz';
    const pool = () => VF.filter(v => tema === 'all' || v.tema === tema);
    const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const restart = () => { order = shuffle(pool()); pos = 0; score = 0; answered = false; draw(); };
    const draw = () => {
      const head = `<h1>Verdadero o Falso</h1><p class="lead">Afirmaciones del <a href="${bancoHref('mar')}" target="_blank" rel="noopener">banco maratón</a> (sección de conceptualización). En el examen se justifica cada respuesta.</p>
        ${filterBar(tema, '', ` <span style="width:12px"></span><button class="${mode === 'quiz' ? 'on' : ''}" data-mode="quiz">Modo quiz</button><button class="${mode === 'list' ? 'on' : ''}" data-mode="list">Ver todas</button>`)}`;
      if (mode === 'list') {
        render(head + pool().map(v => `<div class="card"><p class="vfq"><span class="pill">${temaShort(v.tema)}</span><span class="pill ${v.a ? 'ok' : 'bad'}">${v.a ? 'V' : 'F'}</span> ${v.q}</p><div class="box ${v.a ? 'ok' : 'bad'}">${v.why}</div><small style="color:var(--muted)">Maratón n.º ${v.n}</small></div>`).join(''));
      } else if (pos >= order.length) {
        const best = store.get('vfbest', 0); if (score > best) store.set('vfbest', score);
        render(head + `<div class="card"><p>Terminaste.</p><p class="score">${score} / ${order.length}</p><p>Mejor puntaje guardado: ${Math.max(best, score)}</p><button class="pri" id="again">Otra vez</button></div>`);
        $('#again').onclick = restart;
      } else {
        const v = order[pos];
        render(head + `<div class="card">
          <div class="row" style="justify-content:space-between"><span>Pregunta ${pos + 1} de ${order.length} · <span class="pill">${temaShort(v.tema)}</span></span><span>Aciertos: <b>${score}</b></span></div>
          <div class="progress"><div style="width:${100 * pos / order.length}%"></div></div>
          <p class="vfq">${v.q}</p>
          <div class="vfopts"><button data-a="1">Verdadero</button><button data-a="0">Falso</button></div>
          <div id="fb"></div></div>`);
        $$('[data-a]').forEach(b => b.onclick = () => {
          if (answered) return; answered = true;
          const ok = (b.dataset.a === '1') === v.a; if (ok) score++;
          b.classList.add('pri');
          const fb = $('#fb');
          fb.innerHTML = expand(`<div class="box ${ok ? 'ok' : 'bad'}"><b>${ok ? '¡Correcto!' : 'Incorrecto.'}</b> Es <b>${v.a ? 'verdadero' : 'falso'}</b>. ${v.why}</div><button class="pri" id="nx">Siguiente</button>`);
          math(fb);
          $('#nx').onclick = () => { pos++; answered = false; draw(); };
        });
      }
      bindFilter(t => { tema = t; restart(); });
      $$('[data-mode]').forEach(b => b.onclick = () => { mode = b.dataset.mode; draw(); });
    };
    restart();
  }

  let timerId = null;
  function pageSimulacro(id) {
    clearInterval(timerId);
    const hist = store.get('sims', {});
    if (!id) {
      render(`
        <h1>Simulacro</h1>
        <p class="lead">Mismo formato que el examen final: 5 ítems de 4 puntos. Resuelve en papel, al terminar ves la solución y te pones nota con la rúbrica.</p>
        <div class="grid">${EXAMS.map(s => `<a class="tile" href="#simulacro/${s.id}"><b>${s.title}</b><small>${s.items.map(i => i.title).join(' · ')}</small>${hist[s.id] != null ? `<br><span class="pill ok">última nota: ${hist[s.id]}/20</span>` : ''}</a>`).join('')}
        <a class="tile" href="#simulacro/mix"><b>Simulacro aleatorio</b><small>Un ítem de cada tipo, elegido al azar entre los 3 simulacros.</small></a></div>
        <div class="box warn" style="margin-top:16px">La duración real del examen no está en el material: elige el tiempo al empezar.</div>`);
      return;
    }
    let exam = EXAMS.find(s => s.id === id);
    if (id === 'mix') exam = { id: 'mix', title: 'Simulacro aleatorio', items: [0, 1, 2, 3, 4].map(k => EXAMS[Math.floor(Math.random() * EXAMS.length)].items[k]) };
    if (!exam) { location.hash = '#simulacro'; return; }
    render(`
      <h1>${exam.title}</h1>
      <div class="card row" style="justify-content:space-between">
        <span>Tiempo: <select id="mins"><option>60</option><option selected>90</option><option>110</option><option>120</option></select> min</span>
        <button class="pri" id="start">Empezar</button></div>
      <p class="lead">Al empezar aparecen los 5 ítems y corre el reloj.</p>`);
    $('#start').onclick = () => runExam(exam, +$('#mins').value);
  }
  function runExam(exam, mins) {
    let left = mins * 60, done = false;
    const scores = exam.items.map(() => null);
    render(`
      <div class="card row" style="justify-content:space-between;position:sticky;top:58px;z-index:5">
        <b>${exam.title}</b><span class="timer" id="tm"></span><button class="pri" id="fin">Terminar y corregir</button></div>
      ${exam.items.map((it, k) => `<div class="card ex" id="it${k}">
        <div class="head"><h3>Ítem ${it.item} · ${it.title}</h3><span class="pill">4 puntos</span></div>
        <p>${it.enun}</p>
        <div class="sol hidden"><ol class="steps">${it.sol.map(s => `<li>${s}</li>`).join('')}</ol>
          <div class="box"><b>Rúbrica:</b><ul style="margin:.3em 0">${it.rub.map(r => `<li>${r}</li>`).join('')}</ul></div>
          <div class="mark"><small>Tu puntaje:</small>${[0, 1, 2, 3, 4].map(p => `<button class="sm" data-k="${k}" data-p="${p}">${p}</button>`).join('')}
            ${[0.5, 1.5, 2.5, 3.5].map(p => `<button class="sm" data-k="${k}" data-p="${p}">${p}</button>`).join('')}</div>
          <div class="uses">${fChips(it.f)}</div></div>
      </div>`).join('')}
      <div class="card hidden" id="res"></div>`);
    const tm = $('#tm');
    const tick = () => {
      const m = Math.floor(left / 60), s = left % 60;
      tm.textContent = `${m}:${String(s).padStart(2, '0')}`; tm.classList.toggle('low', left < 300);
      if (left <= 0) finish(); left--;
    };
    const finish = () => {
      if (done) return; done = true; clearInterval(timerId);
      tm.textContent = 'Tiempo terminado'; $('#fin').disabled = true;
      $$('.sol').forEach(x => x.classList.remove('hidden'));
      $('#res').classList.remove('hidden'); upd(); window.scrollTo(0, 0);
    };
    const upd = () => {
      const tot = scores.reduce((a, b) => a + (b || 0), 0), all = scores.every(s => s != null);
      $('#res').innerHTML = `<p>Nota ${all ? 'final' : 'parcial'}:</p><p class="score">${tot} / 20</p>${all ? '' : '<small>Califica los 5 ítems con la rúbrica.</small>'} <a href="#simulacro">Volver a simulacros</a>`;
      if (all && exam.id !== 'mix') { const h = store.get('sims', {}); h[exam.id] = tot; store.set('sims', h); }
    };
    $$('[data-p]').forEach(b => b.onclick = () => {
      const k = +b.dataset.k; scores[k] = +b.dataset.p;
      $$(`[data-k="${k}"]`).forEach(x => x.classList.toggle('on', x === b)); upd();
    });
    $('#fin').onclick = finish;
    tick(); timerId = setInterval(tick, 1000);
  }

  function pageClases() {
    render(`
      <h1>Clases</h1>
      <p class="lead">Las diapositivas del curso (carpeta <code>Clases/</code>) y los bancos de ejercicios (<code>Ejercicios_Algebra/</code>).</p>
      <h2>Diapositivas</h2>
      <div class="grid pdfs">${Object.entries(PDFS).map(([id, p]) => `<a class="tile" target="_blank" rel="noopener" href="${pdfHref(id)}"><span><b>${p.name.split(' · ')[0]}</b><small>${p.name.split(' · ')[1]}</small></span><span class="pill">PDF</span></a>`).join('')}</div>
      <h2>Bancos de ejercicios</h2>
      <div class="grid pdfs">${Object.entries(BANCOS).map(([id, b]) => `<a class="tile" target="_blank" rel="noopener" href="${bancoHref(id)}"><span><b>${id === 'ef' ? 'Banco EF' : 'Maratón'}</b><small>${b.name}</small></span><span class="pill">PDF</span></a>`).join('')}</div>`);
  }

  function focusEl(id) {
    if (!id) { window.scrollTo(0, 0); return; }
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); el.classList.add('flash'); }
  }

  // ---------- router
  function route() {
    const [r, arg] = (location.hash.slice(1) || 'inicio').split('/');
    $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === r));
    if (r !== 'simulacro') clearInterval(timerId);
    ({ inicio: pageInicio, teoria: pageTeoria, formulas: pageFormulas, resueltos: pageResueltos, practica: pagePractica, vf: pageVF, simulacro: pageSimulacro, clases: pageClases }[r] || pageInicio)(arg);
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', route);
})();
