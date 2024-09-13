import Subcategoria from "./Subcategoria"

export default interface Categoria {
    id?: number
	nombre?: string
	grupo?: number
	estatus?: boolean
	politica?: boolean
	idsAgentes?: number[]
    descripcion?: string
	subcategorias?: Subcategoria[]
	idServicio?: number
}