import { BiCheck } from "react-icons/bi";

export const Presensi = [
    {
        module: true,
        moduleName: 'Absensi Online'
    }
]

export const PresensiSiswa = {
    name: 'Presensi Siswa',
    icon: <BiCheck />,
    parent: true,
    children: [
        {
            name: "Data Kartu Siswa",
            path: '/siswa/kartu_siswa',
            element: '',
        },
        {
            name: "Absensi Harian",
            path: '/siswa/absensi_harian',
            element: ''
        },
        {
            name: "Rekap Data Siswa",
            path: '/siswa/rekap_siswa',
            element: ''
        }
    ]
}

export const PresensiGuru = {
    name: 'Presensi Guru',
    icon: <BiCheck />,
    parent: true,
    children: [
        {
            name: "Data Kartu Guru",
            path: '/guru/kartu_guru',
            element: '',
        },
        {
            name: "Absensi Harian",
            path: '/guru/absensi_harian',
            element: ''
        },
        {
            name: "Rekap Data Guru",
            path: '/guru/rekap_guru',
            element: ''
        }
    ]
}