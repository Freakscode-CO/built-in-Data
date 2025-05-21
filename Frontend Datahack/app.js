// Configuración de los gráficos
document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de flujo de visitantes
    const visitorsCtx = document.getElementById('visitorsChart').getContext('2d');
    new Chart(visitorsCtx, {
        type: 'line',
        data: {
            labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
            datasets: [{
                label: 'Visitantes',
                data: [65, 120, 180, 250, 200, 150, 220, 280, 200],
                borderColor: '#27AE60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Gráfico de distribución por área
    const areaCtx = document.getElementById('areaChart').getContext('2d');
    new Chart(areaCtx, {
        type: 'doughnut',
        data: {
            labels: ['Biblioteca', 'Aulas', 'Laboratorios', 'Áreas Comunes', 'Oficinas'],
            datasets: [{
                data: [30, 25, 15, 20, 10],
                backgroundColor: [
                    '#2C3E50',
                    '#27AE60',
                    '#E67E22',
                    '#3498DB',
                    '#9B59B6'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Inicializar la navegación
    initializeNavigation();
    
    // Inicializar eventos
    initializeEvents();
    
    // Inicializar actualizaciones en tiempo real
    initializeRealTimeUpdates();
});

// Manejo de la navegación
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remover clase active de todos los enlaces
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        // Agregar clase active al enlace clickeado
        this.parentElement.classList.add('active');

        // Ocultar todas las vistas y limpiar contenido dinámico
        document.querySelectorAll('.view-section').forEach(section => {
            section.style.display = 'none';
            // Limpiar cualquier contenido dinámico que pudiera haberse agregado
            if (section.id !== 'inicio') {
                const dynamicContent = section.querySelector('.visitors-view-custom');
                if (dynamicContent) {
                    dynamicContent.remove();
                }
            }
        });

        // Mostrar la vista correspondiente
        const targetId = this.getAttribute('href').substring(1);
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.style.display = 'block';
            
            // Si es la vista de registro, asegurarse de que tenga la clase correcta y recrear el contenido
            if (targetId === 'registro') {
                targetView.className = 'view-section';
                // Recrear el contenido de la vista de registro
                const registroContent = `
                    <div class="visitors-view-custom">
                        <div class="visitors-header-custom">
                            <div class="visitors-title-box">
                                <span>REGISTRO DE VISITANTES</span>
                            </div>
                            <div class="search-bar-custom">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="Buscar visitante..." class="visitor-search-custom">
                            </div>
                        </div>
                        <div class="visitors-main-content">
                            <div class="visitors-list-card">
                                <div class="visitor-card">
                                    <div class="visitor-main-info">
                                        <div class="visitor-name">Persona A</div>
                                        <button class="add-btn"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="visitor-extra-info" style="display:none;">
                                        <div class="visitor-field"><b>Nombre:</b> <span class="visitor-nombre">Persona A</span></div>
                                        <div class="visitor-field"><b>Cédula:</b> <span class="visitor-cedula">12345678</span></div>
                                        <div class="visitor-field">
                                            <b>Motivo:</b> <button class="motivo-visita-btn">Seleccionar motivo</button>
                                            <span class="motivo-seleccionado"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="visitor-card">
                                    <div class="visitor-main-info">
                                        <div class="visitor-name">Persona B</div>
                                        <button class="add-btn"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="visitor-extra-info" style="display:none;">
                                        <div class="visitor-field"><b>Nombre:</b> <span class="visitor-nombre">Persona B</span></div>
                                        <div class="visitor-field"><b>Cédula:</b> <span class="visitor-cedula">87654321</span></div>
                                        <div class="visitor-field">
                                            <b>Motivo:</b> <button class="motivo-visita-btn">Seleccionar motivo</button>
                                            <span class="motivo-seleccionado"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="visitor-card">
                                    <div class="visitor-main-info">
                                        <div class="visitor-name">Persona C</div>
                                        <button class="add-btn"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="visitor-extra-info" style="display:none;">
                                        <div class="visitor-field"><b>Nombre:</b> <span class="visitor-nombre">Persona C</span></div>
                                        <div class="visitor-field"><b>Cédula:</b> <span class="visitor-cedula">56789012</span></div>
                                        <div class="visitor-field">
                                            <b>Motivo:</b> <button class="motivo-visita-btn">Seleccionar motivo</button>
                                            <span class="motivo-seleccionado"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="visitors-summary-card">
                                <div class="summary-title">Visitantes en la instalación:</div>
                                <div class="summary-number">50</div>
                                <div class="summary-lugares">
                                    <div class="lugares-title">Lugar más concurrido por los visitantes</div>
                                    <div class="lugar-option active"><span class="radio"></span> Auditorio</div>
                                    <div class="lugar-option"><span class="radio"></span> Porteria peatonal</div>
                                    <div class="lugar-option"><span class="radio"></span> Cafeteria bloque 27</div>
                                </div>
                            </div>
                        </div>
                        <div class="visitors-footer">
                            <button class="add-visitor-btn"><i class="fas fa-user-plus"></i> Agregar visitante</button>
                        </div>
                    </div>
                `;
                targetView.innerHTML = registroContent;
                
                // Reinicializar los eventos para la vista de registro
                initializeRegistroEvents();
            }
        }

        // Actualizar el título de la página según la vista
        updatePageTitle(targetId);
    });
});

// Función para actualizar el título de la página
function updatePageTitle(viewId) {
    const titles = {
        'inicio': 'Panel de Control',
        'camaras': 'Cámaras de Seguridad',
        'ingreso-salida': 'Control de Ingreso/Salida',
        'registro': 'Registro de Visitantes',
        'estadisticas': 'Estadísticas',
        'advertencias': 'Advertencias'
    };

    const title = titles[viewId] || 'SafePass - Control de Accesos';
    document.title = title;
}

// Función para manejar la navegación inicial
function initializeNavigation() {
    // Obtener la vista actual de la URL o usar 'inicio' por defecto
    const currentView = window.location.hash.substring(1) || 'inicio';
    
    // Activar el enlace correspondiente
    const activeLink = document.querySelector(`.nav-links a[href="#${currentView}"]`);
    if (activeLink) {
        activeLink.click();
    }
}

// Función para inicializar eventos
function initializeEvents() {
    // Eventos para el modal de registro de visitantes
    const addVisitorBtn = document.querySelector('.add-visitor-btn');
    const visitorModal = document.getElementById('visitorModal');
    const visitorForm = document.getElementById('visitorForm');
    const visitReason = document.getElementById('visitReason');
    const otherReason = document.getElementById('otherReason');

    if (addVisitorBtn) {
        addVisitorBtn.addEventListener('click', () => {
            visitorModal.style.display = 'flex';
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === visitorModal) {
            visitorModal.style.display = 'none';
        }
    });

    // Mostrar/ocultar campo de otro motivo
    if (visitReason) {
        visitReason.addEventListener('change', (e) => {
            otherReason.style.display = e.target.value === 'otro' ? 'block' : 'none';
        });
    }

    // Manejar envío del formulario
    if (visitorForm) {
        visitorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí iría la lógica para guardar el visitante
            alert('Registro exitoso');
            visitorModal.style.display = 'none';
            visitorForm.reset();
        });
    }

    // Eventos para las cámaras
    document.querySelectorAll('.camera-box').forEach(camera => {
        camera.addEventListener('click', () => {
            const cameraId = camera.dataset.cameraId;
            showCameraDetail(cameraId);
        });
    });

    // Eventos para los filtros de cámaras
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterCameras(btn.textContent.toLowerCase());
        });
    });

    // Eventos para los filtros de estadísticas
    document.querySelectorAll('.stats-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.stats-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateStats(btn.dataset.period);
        });
    });

    // Evento para la búsqueda de visitantes
    const visitorSearch = document.querySelector('.visitor-search');
    if (visitorSearch) {
        visitorSearch.addEventListener('input', (e) => {
            searchVisitors(e.target.value);
        });
    }

    // Inicializar eventos del modal
    initializeModalEvents();

    // Hacer que el botón .add-visitor-btn dentro de .visitors-footer abra el modal visitorModal
    const footerAddVisitorBtn = document.querySelector('.visitors-footer .add-visitor-btn');
    if (footerAddVisitorBtn && visitorModal) {
        footerAddVisitorBtn.addEventListener('click', () => {
            visitorModal.style.display = 'flex';
        });
    }

    // --- Expansión y cierre de visitor-card con add-btn ---
    document.querySelectorAll('.visitors-list-card .add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.visitor-card');
            const isExpanded = card.classList.contains('expanded');
            // Cierra todas las tarjetas
            document.querySelectorAll('.visitor-card.expanded').forEach(c => {
                c.classList.remove('expanded');
                c.querySelector('.visitor-extra-info').style.display = 'none';
            });
            // Si no estaba expandida, expande; si ya estaba, la deja cerrada
            if (!isExpanded) {
                card.classList.add('expanded');
                card.querySelector('.visitor-extra-info').style.display = 'block';
            }
        });
    });

    // --- Modal de motivo de visita con confirmación y motivo personalizado ---
    const motivoModal = document.getElementById('motivoModal');
    let motivoTarget = null;
    let motivoSeleccionado = '';

    // Mostrar modal y resetear selección
    function openMotivoModal(targetBtn) {
        motivoTarget = targetBtn;
        motivoSeleccionado = '';
        motivoModal.style.display = 'flex';
        document.querySelectorAll('.motivo-option-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.motivo-other-box').style.display = 'none';
        document.querySelector('.motivo-other-input').value = '';
    }

    document.querySelectorAll('.motivo-visita-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openMotivoModal(this);
        });
    });

    document.querySelectorAll('.motivo-option-btn').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.motivo-option-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            motivoSeleccionado = this.getAttribute('data-value');
            if (motivoSeleccionado === 'Otro') {
                document.querySelector('.motivo-other-box').style.display = 'block';
            } else {
                document.querySelector('.motivo-other-box').style.display = 'none';
            }
        });
    });

    document.querySelector('.confirm-motivo-btn').addEventListener('click', function() {
        let motivoFinal = motivoSeleccionado;
        if (motivoSeleccionado === 'Otro') {
            const custom = document.querySelector('.motivo-other-input').value.trim();
            if (custom.length > 0) {
                motivoFinal = custom;
            } else {
                document.querySelector('.motivo-other-input').focus();
                return;
            }
        }
        if (motivoTarget) {
            const span = motivoTarget.parentElement.querySelector('.motivo-seleccionado');
            span.textContent = motivoFinal;
            motivoModal.style.display = 'none';
        }
    });

    document.querySelector('.close-motivo-modal').addEventListener('click', function() {
        motivoModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    motivoModal.addEventListener('click', function(e) {
        if (e.target === motivoModal) {
            motivoModal.style.display = 'none';
        }
    });
}

// Función para inicializar eventos específicos de la vista de registro
function initializeRegistroEvents() {
    // Reinicializar eventos de los botones add-btn
    document.querySelectorAll('.visitors-list-card .add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.visitor-card');
            const isExpanded = card.classList.contains('expanded');
            // Cierra todas las tarjetas
            document.querySelectorAll('.visitor-card.expanded').forEach(c => {
                c.classList.remove('expanded');
                c.querySelector('.visitor-extra-info').style.display = 'none';
            });
            // Si no estaba expandida, expande; si ya estaba, la deja cerrada
            if (!isExpanded) {
                card.classList.add('expanded');
                card.querySelector('.visitor-extra-info').style.display = 'block';
            }
        });
    });

    // Reinicializar eventos de los botones de motivo de visita
    document.querySelectorAll('.motivo-visita-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const motivoModal = document.getElementById('motivoModal');
            motivoModal.style.display = 'flex';
            window.motivoTarget = this; // Guardar referencia al botón actual
        });
    });

    // Reinicializar el botón de agregar visitante
    const footerAddVisitorBtn = document.querySelector('.visitors-footer .add-visitor-btn');
    if (footerAddVisitorBtn) {
        const visitorModal = document.getElementById('visitorModal');
        footerAddVisitorBtn.addEventListener('click', () => {
            if (visitorModal) {
                visitorModal.style.display = 'flex';
            }
        });
    }
}

// Función para mostrar detalles de la cámara
function showCameraDetail(cameraId) {
    // Aquí iría la lógica para mostrar el modal con los detalles de la cámara
    const cameraData = {
        name: 'Cámara ' + cameraId,
        totalPeople: Math.floor(Math.random() * 50),
        visitors: Math.floor(Math.random() * 20),
        alerts: Math.floor(Math.random() * 5)
    };

    // Crear y mostrar el modal de detalles
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${cameraData.name}</h2>
            <div class="camera-stats">
                <div class="stat-item">
                    <span class="stat-label">Total de personas</span>
                    <span class="stat-value">${cameraData.totalPeople}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Visitantes</span>
                    <span class="stat-value">${cameraData.visitors}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Alertas activas</span>
                    <span class="stat-value warning">${cameraData.alerts}</span>
                </div>
            </div>
            <button class="close-btn">Cerrar</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Cerrar modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
}

// Función para filtrar cámaras
function filterCameras(filter) {
    const cameras = document.querySelectorAll('.camera-box');
    cameras.forEach(camera => {
        switch(filter) {
            case 'todas':
                camera.style.display = 'block';
                break;
            case 'concurridas':
                camera.style.display = camera.classList.contains('crowded') ? 'block' : 'none';
                break;
            case 'con alertas':
                // Aquí iría la lógica para mostrar solo cámaras con alertas
                break;
        }
    });
}

// Función para buscar visitantes
function searchVisitors(query) {
    // Aquí iría la lógica para buscar visitantes
    console.log('Buscando visitante:', query);
}

// Función para actualizar estadísticas
function updateStats(period) {
    // Simular actualización de datos
    const stats = {
        today: {
            totalEntries: 245,
            totalExits: 198,
            visitors: 47,
            entriesTrend: '+12%',
            exitsTrend: '-5%',
            visitorsTrend: '+8%'
        },
        month: {
            totalEntries: 5245,
            totalExits: 4898,
            visitors: 347,
            entriesTrend: '+15%',
            exitsTrend: '+10%',
            visitorsTrend: '+12%'
        }
    };
    
    const data = stats[period];
    
    // Actualizar valores
    document.querySelector('.total-entries .summary-value').textContent = data.totalEntries;
    document.querySelector('.total-exits .summary-value').textContent = data.totalExits;
    document.querySelector('.total-visitors .summary-value').textContent = data.visitors;
    
    // Actualizar tendencias
    document.querySelector('.entries-trend').textContent = data.entriesTrend;
    document.querySelector('.exits-trend').textContent = data.exitsTrend;
    document.querySelector('.visitors-trend').textContent = data.visitorsTrend;
    
    // Actualizar barras de progreso
    updateProgressBars();
}

function updateProgressBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        const percentage = Math.random() * 100;
        bar.style.width = `${percentage}%`;
    });
}

// Función para inicializar actualizaciones en tiempo real
function initializeRealTimeUpdates() {
    // Actualizar contador de personas cada 5 segundos
    setInterval(() => {
        const totalPeople = document.querySelector('.big-number');
        if (totalPeople) {
            const currentValue = parseInt(totalPeople.textContent.replace(/,/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 10) - 5;
            totalPeople.textContent = Math.max(0, newValue).toLocaleString();
        }
    }, 5000);

    // Actualizar feeds de cámaras cada 10 segundos
    /* setInterval(() => {
        document.querySelectorAll('.camera-preview img').forEach(img => {
            const timestamp = new Date().getTime();
            img.src = `https://via.placeholder.com/300x200?t=${timestamp}`;
        });
    }, 10000); */

    // Actualizar estadísticas de porterías cada 15 segundos
    setInterval(() => {
        document.querySelectorAll('.gate-stats').forEach(gate => {
            const entry = gate.querySelector('.entry');
            const exit = gate.querySelector('.exit');
            
            if (entry && exit) {
                const currentEntry = parseInt(entry.textContent);
                const currentExit = parseInt(exit.textContent);
                
                entry.textContent = Math.max(0, currentEntry + Math.floor(Math.random() * 5) - 2);
                exit.textContent = Math.max(0, currentExit + Math.floor(Math.random() * 5) - 2);
            }
        });
    }, 15000);
}

// Manejo de búsqueda
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', function(e) {
    // Aquí se implementaría la lógica de búsqueda
    console.log('Buscando:', e.target.value);
});

// Manejo del botón de nuevo visitante
const addVisitorBtn = document.querySelector('.add-visitor-btn');
if (addVisitorBtn) {
    addVisitorBtn.addEventListener('click', function() {
        // Aquí se implementaría la lógica para agregar un nuevo visitante
        alert('#EN DESARROLO (AGREGAR VISITANTE)');
    });
}

// Simulación de actualización de cámaras
/* function updateCameraFeeds() {
    document.querySelectorAll('.camera-feed img').forEach(img => {
        // Aquí se implementaría la lógica para actualizar las imágenes de las cámaras
        // Por ahora solo simulamos un cambio de imagen
        const timestamp = new Date().getTime();
        img.src = `https://via.placeholder.com/200x150?t=${timestamp}`;
    });
} */

function updateTime() {
    const timeElement = document.querySelector('.actual-time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
}

setInterval(updateTime, 100);

// Actualizar feeds de cámaras cada 10 segundos
setInterval(updateCameraFeeds, 10000);

// Funciones para la vista de estadísticas
function initializeStats() {
    const dateSelector = document.querySelector('.date-selector');
    const todayBtn = dateSelector.querySelector('.today-btn');
    const monthBtn = dateSelector.querySelector('.month-btn');
    
    // Inicializar gráficos
    initializeCharts();
    
    // Event listeners para los botones de fecha
    todayBtn.addEventListener('click', () => {
        todayBtn.classList.add('active');
        monthBtn.classList.remove('active');
        updateStats('today');
    });
    
    monthBtn.addEventListener('click', () => {
        monthBtn.classList.add('active');
        todayBtn.classList.remove('active');
        updateStats('month');
    });
    
    // Actualizar estadísticas cada 5 minutos
    setInterval(() => {
        const activePeriod = document.querySelector('.date-selector .active').dataset.period;
        updateStats(activePeriod);
    }, 300000);
}

function initializeCharts() {
    // Gráfico de flujo de personas
    const flowChart = new Chart(document.getElementById('flowChart'), {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Entradas',
                data: [65, 59, 80, 81, 56, 55, 40, 45],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Salidas',
                data: [28, 48, 40, 19, 86, 27, 90, 35],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Gráfico de distribución por área
    const areaChart = new Chart(document.getElementById('areaChart'), {
        type: 'doughnut',
        data: {
            labels: ['Área A', 'Área B', 'Área C', 'Área D'],
            datasets: [{
                data: [30, 25, 20, 25],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Gráfico de horas pico
    const peakChart = new Chart(document.getElementById('peakChart'), {
        type: 'bar',
        data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
            datasets: [{
                label: 'Personas',
                data: [120, 150, 180, 90, 160],
                backgroundColor: 'rgb(75, 192, 192)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Gráfico de tipos de visitantes
    const visitorsChart = new Chart(document.getElementById('visitorsChart'), {
        type: 'pie',
        data: {
            labels: ['Empleados', 'Proveedores', 'Visitantes', 'Contratistas'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Inicializar estadísticas cuando se carga la vista
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Inicializar estadísticas si estamos en la vista de estadísticas
    if (document.querySelector('.stats-view')) {
        initializeStats();
    }
});

// Inicializar eventos del modal
function initializeModalEvents() {
    const modal = document.querySelector('.modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Cerrar modal al hacer clic en el botón de cancelar
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            // Limpiar el formulario si existe
            const form = modal.querySelector('form');
            if (form) form.reset();
        });
    }

    // Cerrar modal al hacer clic en el botón de cerrar
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// --- Notificaciones Mejoradas ---
const notificationsIcon = document.querySelector('.notifications');
const notificationsPanel = document.querySelector('.notifications-panel');
const closeNotificationsBtn = document.querySelector('.close-notifications');
const markAllReadBtn = document.querySelector('.mark-all-read');
const notificationBadge = document.querySelector('.notification-badge');

let notificationsOpen = false;

if (notificationsIcon && notificationsPanel) {
    notificationsIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsOpen = !notificationsOpen;
        notificationsPanel.style.display = notificationsOpen ? 'flex' : 'none';
    });
}

if (closeNotificationsBtn) {
    closeNotificationsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsOpen = false;
        notificationsPanel.style.display = 'none';
    });
}

// Cerrar panel al hacer clic fuera
window.addEventListener('click', (e) => {
    if (notificationsPanel && notificationsOpen) {
        if (!notificationsPanel.contains(e.target) && !notificationsIcon.contains(e.target)) {
            notificationsOpen = false;
            notificationsPanel.style.display = 'none';
        }
    }
});

// Prevenir cierre al interactuar dentro del panel
if (notificationsPanel) {
    notificationsPanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Marcar todas como leídas
if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
        document.querySelectorAll('.notification-item').forEach(item => item.classList.remove('unread'));
        if (notificationBadge) notificationBadge.style.display = 'none';
    });
}

// Función para actualizar el contador de personas
function updatePeopleCounter() {
    const counterElement = document.querySelector('.counter-number');
    const trendElement = document.querySelector('.counter-trend');
    
    // Simular actualización en tiempo real (en producción esto vendría de una API)
    setInterval(() => {
        const currentCount = parseInt(counterElement.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 10) - 5; // Cambio aleatorio entre -5 y +5
        const newCount = Math.max(0, currentCount + change);
        
        counterElement.textContent = newCount.toLocaleString();
        
        // Actualizar tendencia
        if (change > 0) {
            trendElement.className = 'counter-trend up';
            trendElement.innerHTML = `<i class="fas fa-arrow-up"></i><span>${change}% desde ayer</span>`;
        } else if (change < 0) {
            trendElement.className = 'counter-trend down';
            trendElement.innerHTML = `<i class="fas fa-arrow-down"></i><span>${Math.abs(change)}% desde ayer</span>`;
        }
    }, 5000); // Actualizar cada 5 segundos
}

// Función para manejar las acciones de los botones en la tabla de advertencias
function handleWarningActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('title');
            const row = this.closest('tr');
            const personName = row.querySelector('img').alt;
            
            if (action === 'Ver detalles') {
                showPersonDetails(personName, row);
            } else if (action === 'Registrar persona') {
                showRegistrationModal(personName);
            }
        });
    });
}

// Función para mostrar detalles de la persona
function showPersonDetails(personName, row) {
    const location = row.querySelector('td:nth-child(3)').textContent;
    const time = row.querySelector('td:nth-child(2)').textContent;
    
    // Crear y mostrar modal con detalles
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Detalles de ${personName}</h2>
            <div class="person-details">
                <img src="${row.querySelector('img').src}" alt="${personName}" class="detail-image">
                <div class="detail-info">
                    <p><strong>Hora de detección:</strong> ${time}</p>
                    <p><strong>Ubicación actual:</strong> ${location}</p>
                    <p><strong>Estado:</strong> En seguimiento</p>
                    <p><strong>Última actualización:</strong> ${new Date().toLocaleTimeString()}</p>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="submit-btn" onclick="this.closest('.modal').remove()">Cerrar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Función para mostrar modal de registro
function showRegistrationModal(personName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Registrar ${personName}</h2>
            <form id="quickRegistrationForm">
                <div class="form-group">
                    <label>Nombre completo</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Número de cédula</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Motivo de visita</label>
                    <select required>
                        <option value="">Seleccionar motivo</option>
                        <option value="evento">Evento</option>
                        <option value="familiar">Familiar</option>
                        <option value="reunion">Reunión</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div class="modal-buttons">
                    <button type="submit" class="submit-btn">Registrar</button>
                    <button type="button" class="cancel-btn" onclick="this.closest('.modal').remove()">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Inicializar la vista de advertencias
function initWarningsView() {
    updatePeopleCounter();
    handleWarningActions();
}

// Agregar al evento de cambio de vista
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Ocultar todas las vistas
            document.querySelectorAll('.view-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Mostrar la vista seleccionada
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.style.display = 'block';
                
                // Inicializar la vista de advertencias si es la seleccionada
                if (targetId === 'advertencias') {
                    initWarningsView();
                }
            }
        });
    });
});

