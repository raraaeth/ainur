/* =====================================================
   Finance Dashboard v1.0
   File : stats.css
===================================================== */

/* ===========================
   STATS GRID
=========================== */

.stats-grid{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(220px,1fr));

    gap:20px;

}

/* ===========================
   STATS CARD
=========================== */

.stats-card{

    background:var(--card);

    border:1px solid var(--border);

    border-radius:var(--radius-lg);

    padding:22px;

    box-shadow:var(--shadow-sm);

    transition:var(--transition);

}

.stats-card:hover{

    transform:translateY(-4px);

    box-shadow:var(--shadow-md);

}

.stats-card small{

    display:block;

    color:var(--text-secondary);

    margin-bottom:10px;

    font-size:.9rem;

}

.stats-card h3{

    font-size:1.5rem;

    font-weight:700;

    color:var(--text);

}
