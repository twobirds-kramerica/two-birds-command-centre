/**
 * Dashboard — project card rendering, filtering, stats
 * Loaded on index.html
 */
(function () {
  'use strict';

  const STATUS_ORDER = ['active','in-progress','planned','queued','pending','parked','deferred','complete','blocked'];

  // ── Badge HTML ──────────────────────────────────────────────────
  function badge(status) {
    const s = (status || 'unknown').toLowerCase().replace(/\s+/g, '-');
    const labels = {
      'active':         'Active',
      'in-progress':    'In Progress',
      'queued':         'Queued',
      'complete':       'Complete',
      'deferred':       'Deferred',
      'planned':        'Planned',
      'parked':         'Parked',
      'pending':        'Pending',
      'blocked':        'Blocked',
      'to-install':     'To Install',
      'active-interim': 'Active (Interim)'
    };
    const label = labels[s] || status;
    return `<span class="badge badge-${s}">${label}</span>`;
  }

  // ── Epic stats ──────────────────────────────────────────────────
  function epicStats(epics) {
    const total = epics.length;
    if (total === 0) return { total: 0, done: 0, active: 0, pct: 0 };
    const done   = epics.filter(e => e.status === 'complete').length;
    const active = epics.filter(e => ['active','in-progress'].includes(e.status)).length;
    const pct    = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, active, pct };
  }

  // ── Render a single project card ────────────────────────────────
  function renderCard(project) {
    const stats  = epicStats(project.epics || []);
    const links  = [];
    if (project.repo) links.push(`<a href="${project.repo}" class="project-link" target="_blank" rel="noopener">⎇ Repo</a>`);
    if (project.live) links.push(`<a href="${project.live}" class="project-link" target="_blank" rel="noopener">↗ Live</a>`);

    const epicRows = (project.epics || []).map(e =>
      `<div class="epic-row">
        <span class="epic-name" title="${esc(e.name)}">${esc(e.name)}</span>
        ${badge(e.status)}
      </div>`
    ).join('');

    const hasEpics = project.epics && project.epics.length > 0;

    return `
<div class="project-card" data-status="${project.status}" data-id="${project.id}">
  <div class="project-card-header">
    <span class="project-name">${esc(project.name)}</span>
    ${badge(project.status)}
  </div>
  <p class="project-desc">${esc(project.description)}</p>
  ${links.length ? `<div class="project-links">${links.join('')}</div>` : ''}
  ${hasEpics ? `
  <div class="epic-progress">
    <div class="epic-progress-bar">
      <div class="epic-progress-fill" style="width:${stats.pct}%"></div>
    </div>
    <span class="epic-meta">${stats.done}/${stats.total} epics complete · ${stats.active} active</span>
  </div>
  <button class="epics-toggle" aria-expanded="false">
    <span class="chevron">›</span> ${stats.total} epics
  </button>
  <div class="epics-list">${epicRows}</div>
  ` : '<span class="epic-meta" style="font-size:0.78rem;color:var(--text-2)">No epics yet</span>'}
</div>`;
  }

  // ── Stats bar ───────────────────────────────────────────────────
  function renderStats(projects) {
    const allEpics   = projects.flatMap(p => p.epics || []);
    const active     = projects.filter(p => ['active','in-progress'].includes(p.status)).length;
    const done       = allEpics.filter(e => e.status === 'complete').length;
    const inProgress = allEpics.filter(e => ['active','in-progress'].includes(e.status)).length;

    document.getElementById('stat-projects').textContent  = projects.length;
    document.getElementById('stat-epics').textContent     = allEpics.length;
    document.getElementById('stat-active').textContent    = active;
    document.getElementById('stat-done').textContent      = done;
    document.getElementById('stat-live').textContent      = inProgress;
  }

  // ── Filter ──────────────────────────────────────────────────────
  let allProjects   = [];
  let currentFilter = 'all';
  let currentSearch = '';

  function applyView() {
    let list = allProjects;

    // Filter by status
    if (currentFilter !== 'all') {
      if (currentFilter === 'active') {
        list = list.filter(p => ['active','in-progress'].includes(p.status));
      } else {
        list = list.filter(p => p.status === currentFilter);
      }
    }

    // Filter by search
    if (currentSearch) {
      list = Search.query(currentSearch);
      if (currentFilter !== 'all') {
        if (currentFilter === 'active') {
          list = list.filter(p => ['active','in-progress'].includes(p.status));
        } else {
          list = list.filter(p => p.status === currentFilter);
        }
      }
    }

    renderGrid(list);
  }

  function renderGrid(projects) {
    const grid = document.getElementById('project-grid');
    if (!grid) return;
    if (projects.length === 0) {
      grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div>No projects match this filter.</div>';
      return;
    }
    // Sort by STATUS_ORDER
    projects = [...projects].sort((a, b) => {
      return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
    });
    grid.innerHTML = projects.map(renderCard).join('');
    wireToggles(grid);
  }

  // ── Epic expand/collapse ────────────────────────────────────────
  function wireToggles(container) {
    container.querySelectorAll('.epics-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const list = btn.nextElementSibling;
        const open = list.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
      });
    });
  }

  // ── Boot ────────────────────────────────────────────────────────
  async function init() {
    let data;
    try {
      const res = await fetch('data/projects.json');
      data = await res.json();
    } catch (e) {
      document.getElementById('project-grid').innerHTML =
        '<div class="empty-state"><div class="empty-icon">⚠️</div>Could not load projects.json</div>';
      return;
    }

    allProjects = data.projects || [];
    const infra = data.infrastructure || [];

    renderStats(allProjects);

    // Initialise search
    Search.init(allProjects, [
      { name: 'name',        weight: 4 },
      { name: 'description', weight: 2 },
      { name: 'id',          weight: 1 },
      { name: 'epics.name',  weight: 2 },
      { name: 'status',      weight: 1 }
    ]);

    // Initial render
    applyView();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyView();
      });
    });

    // Search input
    const searchEl = document.getElementById('search-input');
    if (searchEl) {
      searchEl.addEventListener('input', () => {
        currentSearch = searchEl.value.trim();
        applyView();
      });
    }

    // Infrastructure
    renderInfra(infra);
  }

  // ── Infrastructure ──────────────────────────────────────────────
  function renderInfra(items) {
    const grid = document.getElementById('infra-grid');
    if (!grid || !items.length) return;
    grid.innerHTML = items.map(item => `
      <div class="infra-card">
        <div>
          <div class="infra-name">${esc(item.name)}</div>
          <div class="infra-note">${esc(item.note || '')}</div>
        </div>
        ${badge(item.status)}
      </div>`).join('');
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
