import Categoria from "./Categoria"
import Contacto from   "./Contacto"

export default interface Servicio {

    id?: number
    estatus?: boolean
    nombre?: string
    descripcion?: string
    idGrupo?: number
    idDuenio?: number
    idsAsignacionDirecta?: number[]
    idsAsignacionReporte?: number[]
    idsServicios?: number[]
    dias?: number[]
    dia365?: boolean
    horario24?: boolean
    horaInicial?: number
    minutoInicial?: number
    horaFinal?: number
    minutoFinal?: number
    mantenimiento ?: string
    dia1?: number
    dia2?: number
    dia3?: number
    dia4?: number
    dia5?: number
    hora1?: number
    hora2?: number
    hora3?: number
    hora4?: number
    hora5?: number
    minuto1?: number
    minuto2?: number
    minuto3?: number
    minuto4?: number
    minuto5?: number
    disponibilidadHora?: number
    disponibilidadMinuto?: number
    tipoServicio?: number
    idProveedor?: number
    objetivos?: String
    funcionalidad?: String
    caracteristicas?: String
    procedimientos?: String
    alcances?: String
    idsRegion?: number[]
    idsLocalidad1?: number[]
    idsLocalidad2?: number[]
    categorias?: Categoria[]
    contactos?:  Contacto[]
    radioSLRSLA?: boolean
    radioDia?: boolean,
    hrOf?: number,
    minOf?: number,
    hrTo?: number,
    minTo?: number

}