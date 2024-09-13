export interface Cuestionario {
    id?: number
    idGrupo: number
    nombreCampo: string
    tipoDato: number
    mandatorio: boolean
    estatus: boolean
    listSelect?: OpcionSelect[]
    posicion: number
    tipoPregunta: 1 | 0
    modulo: 0 | 1 | 2 | 3 | 4 
}

export interface OpcionSelect {
    id?: number
    valor: string
    ponderacion: number
}