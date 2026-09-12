// Base inicial de usuarios y persistencia en localStorage

export const INITIAL_USERS = [
  {
    id: "user-pec-1",
    name: "Rosa Elvira Huamán Tamani",
    dni: "47891234",
    email: "rosa.huaman@pronoei.edu.pe",
    role: "pec", // Promotora Educativa Comunitaria
    roleLabel: "Promotora PEC",
    ugel: "UGEL Maynas (Iquitos)",
    comunidad: "Comunidad Nativa Santa María de Nanay",
    pronoieName: "PRONOEI Los Pequeños del Nanay",
    phone: "965-812-345",
    completedModules: [1, 2, 3],
    portfolioSubmitted: true,
    portfolioScore: 18,
    portfolioStatus: "Aprobado",
    coordinator: "Lic. Ruth Elena Silvano",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-pec-2",
    name: "Maria Inés Curitima Yahuarcani",
    dni: "45123987",
    email: "maria.curitima@pronoei.edu.pe",
    role: "pec",
    roleLabel: "Promotora PEC",
    ugel: "UGEL Loreto - Nauta",
    comunidad: "Comunidad San Joaquín de Omaguas",
    pronoieName: "PRONOEI Gotitas de Amor",
    phone: "919-456-789",
    completedModules: [1, 2],
    portfolioSubmitted: true,
    portfolioScore: null,
    portfolioStatus: "En Revisión",
    coordinator: "Lic. Ruth Elena Silvano",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-pec-3",
    name: "Carmen Lidia Chota Macuyama",
    dni: "48231902",
    email: "carmen.chota@pronoei.edu.pe",
    role: "pec",
    roleLabel: "Promotora PEC",
    ugel: "UGEL Requena",
    comunidad: "Comunidad Flor de Punga",
    pronoieName: "PRONOEI Semillitas del Ucayali",
    phone: "981-234-567",
    completedModules: [1],
    portfolioSubmitted: false,
    portfolioScore: null,
    portfolioStatus: "Pendiente",
    coordinator: "Lic. Ruth Elena Silvano",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-pc-1",
    name: "Lic. Ruth Elena Silvano Pizango",
    dni: "09876543",
    email: "elena.silvano@drel.gob.pe",
    role: "pc", // Profesora Coordinadora
    roleLabel: "Docente Coordinadora (PC)",
    ugel: "UGEL Maynas & Loreto-Nauta",
    phone: "978-654-321",
    assignedPecsCount: 15,
    sector: "Circuito Fluvial Maynas - Nauta",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-admin-1",
    name: "Dr. Carlos Alberto Ramírez Vega",
    dni: "10293847",
    email: "admin@warmiclass.edu.pe",
    role: "admin", // Administrador
    roleLabel: "Administrador del Sistema",
    institution: "Universidad César Vallejo & DRE Loreto",
    phone: "991-882-773",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  }
];

export const STORAGE_KEY_USERS = "warmiclass_users_v1";
export const STORAGE_KEY_SESSION = "warmiclass_session_v1";

export function getStoredUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error reading users from storage", e);
  }
  return INITIAL_USERS;
}

export function saveStoredUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users to storage", e);
  }
}

export function getStoredSession() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SESSION);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error reading session", e);
  }
  // Por defecto, sesión demo activa como PEC
  return INITIAL_USERS[0];
}

export function saveStoredSession(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  } catch (e) {
    console.error("Error saving session", e);
  }
}
