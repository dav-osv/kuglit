export interface NuevaSolicitud {
    id?: number
    idNotificador?: number
    idGrupo?: any
    idServicio?: any
    idCategoria?: any
    idSubcategoria?: any
    descripcion?: string
    tipo?: number
    idUsuario?: number
    urgencia?: number
    impacto?: number
    idTecnico?: number
    tipoSol?: number

    estatus?: number

    adjuntos?: any[]
    celulcar?: any[]
    activosAfectados?: number[]

    [pripiedad: string]: any
}

export interface Usuario {
    
}