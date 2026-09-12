import React, { useState } from 'react';
import { getStoredUsers, saveStoredUsers } from '../data/mockUsers';

export default function DashboardAdmin({ user, onLogout, onNavigateLanding }) {
  const [users, setUsers] = useState(() => getStoredUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Nuevo usuario rápido
  const [newUserName, setNewUserName] = useState('');
  const [newUserDni, setNewUserDni] = useState('');
  const [newUserRole, setNewUserRole] = useState('pec');
  const [newUserUgel, setNewUserUgel] = useState('UGEL Maynas (Iquitos)');
  const [toastMsg, setToastMsg] = useState('');

  const ugels = [
    "UGEL Maynas (Iquitos)",
    "UGEL Loreto - Nauta",
    "UGEL Requena",
    "UGEL Alto Amazonas (Yurimaguas)",
    "UGEL Ucayali (Contamana)"
  ];

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.dni.includes(searchTerm);
    const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || newUserDni.trim().length !== 8) {
      alert("Por favor ingresa un nombre y un DNI de 8 dígitos válido.");
      return;
    }

    const created = {
      id: `user-${newUserRole}-${Date.now()}`,
      name: newUserName.trim(),
      dni: newUserDni.trim(),
      email: `${newUserName.trim().toLowerCase().replace(/\s+/g, '.')}@pronoei.edu.pe`,
      role: newUserRole,
      roleLabel: newUserRole === 'pec' ? 'Promotora PEC' : 'Docente Coordinadora (PC)',
      ugel: newUserUgel,
      comunidad: "Comunidad Loreto",
      phone: "912-345-678",
      completedModules: [1],
      portfolioStatus: "En curso",
      avatar: newUserRole === 'pec'
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    };

    const updated = [created, ...users];
    setUsers(updated);
    saveStoredUsers(updated);

    setShowAddModal(false);
    setNewUserName('');
    setNewUserDni('');
    setToastMsg(`¡Usuario ${created.name} registrado con éxito!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleExportCsv = () => {
    const headers = "ID,Nombre,DNI,Rol,UGEL,Estado_Portafolio\n";
    const rows = users.map(u => `"${u.id}","${u.name}","${u.dni}","${u.role}","${u.ugel}","${u.portfolioStatus || 'N/A'}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_PRONOEI_Loreto_2026_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-stone-100/60 flex flex-col">
      
      {/* Barra de Navegación Superior */}
      <nav className="sticky top-0 z-40 bg-white border-b border-stone-200 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateLanding}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Volver al Portal Público"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-700 to-red-900 border border-amber-400/40 p-1 flex items-center justify-center shadow-sm">
                <img
                  src="/logowarmi.png"
                  alt="Logo WarmiClass"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div className="leading-tight">
                <span className="font-black text-stone-900 text-sm sm:text-base font-['Poppins']">
                  WarmiClass <span className="text-purple-700">ADMIN</span>
                </span>
                <span className="block text-[10px] font-bold text-purple-800">
                  Panel de Gestión General (DRE Loreto & UCV)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-stone-900">{user.name}</span>
              <span className="text-[10px] text-stone-500">Administrador General</span>
            </div>

            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-purple-600"
            />

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-700 transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Cerrar Sesión"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 space-y-6 flex-1">
        
        {/* Toast */}
        {toastMsg && (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 animate-slide-down">
            <i className="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Encabezado y Estadísticas Clave */}
        <div className="bg-gradient-to-r from-purple-950 via-stone-900 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider">
                  Panel de Control Central
                </span>
                <h1 className="text-2xl sm:text-3xl font-black font-['Poppins'] leading-tight mt-2">
                  Gestión del Programa Formativo PRONOEI 2026
                </h1>
                <p className="text-stone-300 text-xs sm:text-sm mt-1">
                  Monitoreo de metas de cobertura institucional (1,200 PECs / 80 PCs) y emisión de certificaciones oficiales UCV.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Registrar Usuario</span>
                </button>

                <button
                  onClick={handleExportCsv}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-file-csv text-emerald-400"></i>
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-purple-200">Meta Promotoras</span>
                <p className="text-2xl font-black text-amber-400">1,200 PEC</p>
                <span className="text-[10px] text-stone-300">5 Sedes UGEL Loreto</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-purple-200">Docentes PC</span>
                <p className="text-2xl font-black text-emerald-400">80 PC</p>
                <span className="text-[10px] text-stone-300">100% Asignadas</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-purple-200">Carga Horaria</span>
                <p className="text-2xl font-black text-white">120 Horas</p>
                <span className="text-[10px] text-stone-300">5.0 Créditos Universitarios</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-purple-200">Presupuesto UCV</span>
                <p className="text-2xl font-black text-amber-300">S/ 114,800</p>
                <span className="text-[10px] text-stone-300">Totalmente Financiado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-['Poppins']">
                Directorio de Usuarios Registrados
              </h2>
              <p className="text-xs text-stone-500">
                Filtra y administra a las Promotoras Comunitarias, Profesoras Coordinadoras y Administradores.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-64">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o DNI..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-purple-600 bg-white"
              >
                <option value="all">Todos los roles</option>
                <option value="pec">Solo Promotoras (PEC)</option>
                <option value="pc">Solo Coordinadoras (PC)</option>
                <option value="admin">Solo Administradores</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
                  <th className="p-3">Usuario / Nombre</th>
                  <th className="p-3">D.N.I.</th>
                  <th className="p-3">Rol Asignado</th>
                  <th className="p-3">Jurisdicción UGEL</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <p className="font-bold text-stone-900 leading-tight">{u.name}</p>
                          <span className="text-[11px] text-stone-400">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 font-mono text-stone-800">{u.dni}</td>

                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        u.role === 'pec'
                          ? 'bg-emerald-100 text-emerald-800'
                          : u.role === 'pc'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {u.roleLabel}
                      </span>
                    </td>

                    <td className="p-3 text-stone-700">{u.ugel || "Sede Central Loreto"}</td>

                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Activo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Modal Registrar Usuario */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-lg w-full overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-['Poppins']">
                Registrar Nuevo Usuario al Campus
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Rol</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 bg-white font-medium"
                >
                  <option value="pec">Promotora Educativa Comunitaria (PEC)</option>
                  <option value="pc">Profesora Coordinadora (PC)</option>
                  <option value="admin">Administrador del Programa</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Nombres y Apellidos</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ej. Juana Pérez Tamani"
                  required
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">D.N.I. (8 dígitos)</label>
                <input
                  type="text"
                  value={newUserDni}
                  onChange={(e) => setNewUserDni(e.target.value)}
                  placeholder="45678912"
                  maxLength={8}
                  required
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Sede UGEL Loreto</label>
                <select
                  value={newUserUgel}
                  onChange={(e) => setNewUserUgel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 bg-white"
                >
                  {ugels.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
