import { BiNote } from "react-icons/bi"

export const Kesiswaan = [
    {
        module: true,
        moduleName: 'Kesiswaan'
    }
]

export const LaporanSiswa = {
    name: 'Laporan Siswa',
    icon: <BiNote />,
    parent: true,
    children: [
        {
            name: "Data Prestasi",
            path: '/laporan/data_prestasi',
            element: '',
        },
        {
            name: "Data Pelanggaran",
            path: '/laporan/data_pelanggaran',
            element: ''
        }
    ]
}